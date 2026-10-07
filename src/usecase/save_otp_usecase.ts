import type { IMailerService } from "../domain/services/imailer_service.js";
import type IOtpRepository from "../domain/services/iotp_repository.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
import type { IUserInputDTO } from "../domain/dtos/user-input.dto.js";
import { generateRandomString } from "../shared/utils/crypto_util.js";
import type ITokenService from "../domain/services/itoken_service.js";
import type IRedisService from "../domain/services/iredis_repository.js";
import { TransactionFailure } from "../domain/error/transaction-failure.js";
import { ResponseDto } from "../domain/dtos/response.js";
import { v4 as uuidv4 } from 'uuid';

export default class SaveOtpUsecase {

    constructor(private authRepository: IAuthRepository, private otpRepository: IOtpRepository, private mailerService: IMailerService, private tokenService: ITokenService, private redisService: IRedisService) { }

    public async execute(userData: IUserInputDTO): Promise<ResponseDto> {

        let otp = '';
        const uuid: string = uuidv4();

        if (userData.roles === 'cooperative') {
            otp = generateRandomString(12);
        } else if (userData.roles === 'client') {
            otp = generateRandomString(6);

        }

        console.log('[SaveOtpUsecase] OTP generated', { role: userData.roles, otpLength: otp.length, email: userData.email });

        const session = await this.authRepository.startSession();
        session.startTransaction();

        try {
            console.log('[SaveOtpUsecase] Transaction started');

            const isUserChecked = await this.authRepository.checkUser(userData.email, session);

            console.log('[SaveOtpUsecase] Check user exists', isUserChecked);

            // Kiểm tra thành công và đảm bảo có dữ liệu người dùng
            if (isUserChecked.success && isUserChecked.userData) {
                if (userData.roles === 'client') {
                    console.log('[SaveOtpUsecase] Checking existing user session');
                    const isSessionChecked = await this.authRepository.checkUserSession(isUserChecked.userData._id!.toString(), session);

                    console.log(` ${isSessionChecked.data!.is_active}`);

                    if (isSessionChecked.data!.is_active == true) {
                        throw new TransactionFailure(ResponseDto.failure("Trạng thái phiên đang hoạt động"));
                    }

                    if (!isSessionChecked.success || !isSessionChecked.data) {
                        console.log('[SaveOtpUsecase] Generating access token for client');
                        const accessToken = this.tokenService.generateAccessToken(uuid);
                        console.log('[SaveOtpUsecase] Access token generated');

                        console.log('[SaveOtpUsecase] Updating session with new access token');
                        const isSessionUpdated = await this.authRepository.updateSession(isUserChecked.userData._id!.toString(), null, accessToken.toString(), false, false, session);
                        console.log('[SaveOtpUsecase] Update session result', isSessionUpdated);

                        const thirtyMinuteToSeconds = 30 * 60;

                        console.log('[SaveOtpUsecase] Saving access token to Redis');
                        const isSaveAccessToken = await this.redisService.saveAccessToken(isUserChecked.userData._id!, accessToken.toString(), true, thirtyMinuteToSeconds);
                        console.log('[SaveOtpUsecase] Save access token result', isSaveAccessToken);

                        const isOtpNotUsed = await this.otpRepository.deleteOtpNotUsed(isUserChecked.userData._id!.toString().toString(), session);

                        if (!isOtpNotUsed.success) {
                            console.log('[SaveOtpUsecase] Saving OTP on server');
                            const isOtpSaved = await this.otpRepository.saveOtp(isUserChecked.userData._id!.toString(), otp, session);
                            console.log('[SaveOtpUsecase] Save OTP result', isOtpSaved);
                        } else {
                            console.log('[SaveOtpUsecase] Saving OTP on server');
                            const isOtpSaved = await this.otpRepository.saveOtp(isUserChecked.userData._id!.toString(), otp, session);
                            console.log('[SaveOtpUsecase] Save OTP result', isOtpSaved);
                        }

                        await this.mailerService.sendEmail(userData.email, otp);

                        await session.commitTransaction();

                        return ResponseDto.success("Gửi mã OTP thành công.");
                    }

                    console.log('[SaveOtpUsecase] Checking access token in Redis');
                    const isAccessToken = await this.redisService.getAccessToken(isUserChecked.userData._id!.toString(), isSessionChecked.data!.access_token);
                    console.log('[SaveOtpUsecase] Redis access token result', isAccessToken);

                    if (!isAccessToken) {
                        console.log('[SaveOtpUsecase] Deleting old session');
                        const isSessionDeleted = await this.authRepository.deleteOldSession(isSessionChecked.data!._id!.toString(), session);
                        await this.redisService.deleteAccessToken(isUserChecked.userData._id!.toString(), isSessionChecked.data!.access_token);
                        console.log('[SaveOtpUsecase] Delete old session result', isSessionDeleted);

                        if (!isSessionDeleted.success) {
                            throw new TransactionFailure(ResponseDto.failure('Xóa phiên tài khoản cũ thất bại.'))
                        }

                        console.log('[SaveOtpUsecase] Saving OTP on server');
                        const isOtpSaved = await this.otpRepository.saveOtp(isUserChecked.userData._id!.toString(), otp, session);
                        console.log('[SaveOtpUsecase] Save OTP result', isOtpSaved);

                        if (!isOtpSaved.success) {
                            throw new TransactionFailure(ResponseDto.failure(isOtpSaved.message))
                        }

                        console.log('[SaveOtpUsecase] Generating access token');
                        const accessToken = this.tokenService.generateAccessToken(uuid);

                        console.log('[SaveOtpUsecase] Updating session with new access token');
                        const isSessionUpdated = await this.authRepository.updateSession(isUserChecked.userData._id!.toString(), null, accessToken.toString(), false, false, session);
                        console.log('[SaveOtpUsecase] Update session result', isSessionUpdated);

                        if (!isSessionUpdated.success) {

                            throw new TransactionFailure(ResponseDto.failure('Cập nhật thông tin phiên đăng ký nhà hợp tác thất bại.'));
                        }

                        const thirtyMinuteToSeconds = 30 * 60;

                        console.log('[SaveOtpUsecase] Saving access token to Redis');
                        const isSaveAccessToken = await this.redisService.saveAccessToken(isUserChecked.userData._id!, accessToken.toString(), true, thirtyMinuteToSeconds);
                        console.log('[SaveOtpUsecase] Save access token result', isSaveAccessToken);

                        if (!isSaveAccessToken) {
                            throw new TransactionFailure(ResponseDto.failure('Hệ thống lưu trữ Token tạm thời gặp sự cố'));
                        }

                        await this.mailerService.sendEmail(userData.email, otp);

                        await session.commitTransaction();

                        return ResponseDto.success("Gửi mã OTP thành công.");

                    }

                    console.log('[SaveOtpUsecase] Saving OTP on server');
                    const isOtpSaved = await this.otpRepository.saveOtp(isUserChecked.userData._id!.toString(), otp, session);
                    console.log('[SaveOtpUsecase] Save OTP result', isOtpSaved);

                    if (!isOtpSaved.success) {
                        throw new TransactionFailure(ResponseDto.failure(isOtpSaved.message));
                    }

                    await this.mailerService.sendEmail(userData.email, otp);

                    await session.commitTransaction();

                    return ResponseDto.success("Gửi mã OTP thành công.");


                } else {
                    throw new TransactionFailure(ResponseDto.failure('Tài khoản email đã được đăng ký'));
                }
            }

            console.log('[SaveOtpUsecase] Creating user because account does not exist');
            const isUserCreated = await this.authRepository.registerUser(userData, session);
            console.log('[SaveOtpUsecase] Register user result', isUserCreated);

            if (!isUserCreated.success) {
                throw new TransactionFailure(ResponseDto.failure(isUserCreated.message));
            }
            console.log('[SaveOtpUsecase] User created');

            console.log('[SaveOtpUsecase] Saving OTP on server');
            const isOtpSaved = await this.otpRepository.saveOtp(isUserCreated.userData!._id!.toString(), otp, session);
            console.log('[SaveOtpUsecase] Save OTP result', isOtpSaved);

            if (!isOtpSaved.success) {
                throw new TransactionFailure(ResponseDto.failure(isOtpSaved.message));
            }
            console.log('[SaveOtpUsecase] OTP saved');


            console.log(`[SaveOtpUsecase] Processing role: ${userData.roles}`);

            switch (userData.roles) {
                case 'cooperative': {
                    console.log('[SaveOtpUsecase] Generating refresh token for cooperative');
                    const refreshToken = this.tokenService.generateRefreshToken(uuid);

                    console.log('[SaveOtpUsecase] Updating session with refresh token');
                    const isSessionUpdated = await this.authRepository.updateSession(isUserCreated.userData!._id!.toString(), refreshToken.toString(), null, false, false, session)
                    console.log('[SaveOtpUsecase] Update session result', isSessionUpdated);

                    if (!isSessionUpdated.success) {
                        throw new TransactionFailure(ResponseDto.failure('Cập nhật thông tin phiên đăng ký nhà hợp tác thất bại.'));
                    }

                    const tenDaysToSeconds = 10 * 24 * 60 * 60;

                    console.log('[SaveOtpUsecase] Saving refresh token to Redis');
                    const isSaveRefreshToken = await this.redisService.saveRefreshToken(isUserCreated.userData?._id!, refreshToken.toString(), tenDaysToSeconds);
                    console.log('[SaveOtpUsecase] Save refresh token result', isSaveRefreshToken);

                    if (!isSaveRefreshToken) {
                        throw new TransactionFailure(ResponseDto.failure('Hệ thống lưu trữ Token tạm thời gặp sự cố'));
                    }

                    break;
                }
                case 'client': {
                    console.log('[SaveOtpUsecase] Generating access token for client');
                    const accessToken = this.tokenService.generateAccessToken(uuid);
                    console.log('[SaveOtpUsecase] Access token generated');

                    console.log('[SaveOtpUsecase] Updating session with client access token');
                    const isSessionUpdated = await this.authRepository.updateSession(isUserCreated.userData!._id!.toString(), null, accessToken.toString(), false, false, session);

                    if (!isSessionUpdated) {
                        throw new TransactionFailure(ResponseDto.failure('Cập nhật thông tin phiên đăng ký nhà hợp tác thất bại.'));
                    }
                    console.log('[SaveOtpUsecase] Session updated');

                    const thirtyMinuteToSeconds = 30 * 60;

                    console.log('[SaveOtpUsecase] Saving access token to Redis');
                    const isSaveAccessToken = await this.redisService.saveAccessToken(isUserCreated.userData!._id!, accessToken.toString(), true, thirtyMinuteToSeconds);

                    if (!isSaveAccessToken) {
                        throw new TransactionFailure(ResponseDto.failure('Hệ thống lưu trữ Token tạm thời gặp sự cố'));
                    }
                    console.log('[SaveOtpUsecase] Access token saved');

                    break;
                }

                default:
                    throw new TransactionFailure(ResponseDto.failure('Vai trò tài khoản không được hệ thống hỗ trợ.'));
            }


            console.log('[SaveOtpUsecase] Sending OTP email');
            await this.mailerService.sendEmail(userData.email, otp);
            console.log('[SaveOtpUsecase] OTP email sent');
            await session.commitTransaction();

            return ResponseDto.success("Gửi mã OTP thành công.");

        } catch (error) {
            await session.abortTransaction();
            if (error instanceof TransactionFailure) {
                return error.response;
            }
            console.error("Lỗi:", error);
            return ResponseDto.failure("Đã có lỗi xảy ra hệ thống. Vui lòng thử lại sau.");
        } finally {
            await session.endSession();
        }


    }




}