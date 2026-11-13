import type IOtpRepository from "../domain/services/iotp_repository.js";
import { ResponseDto } from "../domain/dtos/response.js";
import type { IOtpInputDto } from "../domain/dtos/otp-input.dto.js";
import type IRedisService from "../domain/services/iredis_repository.js";
import type IAuthRepository from "../domain/services/iauth_repository.js";
import { TransactionFailure } from "../domain/error/transaction-failure.js";


export default class VerifyOtpUsecase {
    constructor(private authRepository: IAuthRepository, private otpRepository: IOtpRepository, private redisService: IRedisService) { }

    public async execute(data: IOtpInputDto): Promise<ResponseDto> {

        let token: string = "";

        console.log('[VerifyOtpUsecase] Start verify OTP flow', { email: data.email, roles: data.is_role });
        const isUserBlocked = await this.redisService.isBlocked(data.email);
        console.log('[VerifyOtpUsecase] Check user block status', { email: data.email, isUserBlocked });

        if (isUserBlocked) {
            console.warn('[VerifyOtpUsecase] User is temporarily blocked');
            return ResponseDto.failure("Tài khoản bị khóa tạm thời. Vui lòng thử lại sau 15 phút.");
        }

        const session = await this.authRepository.startSession();
        console.log('[VerifyOtpUsecase] Database session started');
        session.startTransaction();

        try {

            console.log('[VerifyOtpUsecase] Checking user account');
            const isUserChecked = await this.authRepository.checkUser(data.email, session);
            console.log('[VerifyOtpUsecase] User check result', isUserChecked);

            if (!isUserChecked.success || !isUserChecked.userData) {
                console.error('[VerifyOtpUsecase] User check failed');
                throw new TransactionFailure(ResponseDto.failure(isUserChecked.message));
            }

            console.log('[VerifyOtpUsecase] Transaction started');
            const isOtpChecked = await this.otpRepository.verifyOtp(data.otp, session);
            console.log('[VerifyOtpUsecase] Verify OTP result', isOtpChecked);

            if (!isOtpChecked.success) {
                console.warn('[VerifyOtpUsecase] OTP verification failed, recording failure');
                await this.redisService.recordFailure(data.email);
                throw new TransactionFailure(ResponseDto.failure(isOtpChecked.message));
            }

            console.log('[VerifyOtpUsecase] Checking user session');
            const isSessionChecked = await this.authRepository.checkUserSession(isUserChecked.userData._id!.toString(), session);
            console.log('[VerifyOtpUsecase] Session check result', isSessionChecked);

            /*  const decoded = jwt.verify(isSessionChecked.data!.access_token!, 'com.project.app');
             console.log(`Convert JWT ${JSON.stringify(decoded)}`) */

            if (!isSessionChecked.success || !isSessionChecked.data) {
                console.error('[VerifyOtpUsecase] Session check failed or missing');
                throw new TransactionFailure(ResponseDto.failure(isSessionChecked.message || "Phiên đăng nhập chưa được tạo."));
            }

            console.log('[VerifyOtpUsecase] Session status', { isBlock: isSessionChecked.data.is_block, isActive: isSessionChecked.data.is_active });

            if (isSessionChecked.data.is_block == true) {
                console.warn('[VerifyOtpUsecase] Session is blocked');
                throw new TransactionFailure(ResponseDto.failure("Phiên đăng nhập đã bị khóa."));
            }

            if (isSessionChecked.data.is_active == true) {
                await session.abortTransaction();
                console.warn('[VerifyOtpUsecase] Session is already active');
                throw new TransactionFailure(ResponseDto.failure("Phiên đăng nhập đang hoạt động."));
            }

            if (data.is_role === 'cooperative') {
                token = isSessionChecked.data.refresh_token;

                console.log('[VerifyOtpUsecase] Handling cooperative role');
                const refreshToken = await this.redisService.getRefreshToken(isUserChecked.userData._id!.toString(), token);
                console.log('[VerifyOtpUsecase] Refresh token lookup result', { found: !!refreshToken });

                if (!refreshToken) {
                    console.warn('[VerifyOtpUsecase] Refresh token expired or missing');
                    throw new TransactionFailure(ResponseDto.failure("Phiên đăng nhập nhà đối tác đã hết hạn"));
                }

                const isStatusSessionUpdated = await this.authRepository.updateStatusSession(isSessionChecked.data._id!.toString(), session);

                if (!isStatusSessionUpdated.success) {
                    throw new TransactionFailure(ResponseDto.failure(isStatusSessionUpdated.message));
                }


            } else if (data.is_role === 'client') {
                token = isSessionChecked.data.access_token;

                console.log('[VerifyOtpUsecase] Handling client role');
                const accessToken = await this.redisService.getAccessToken(isUserChecked.userData._id!.toString(), token);
                console.log('[VerifyOtpUsecase] Access token lookup result', { found: !!accessToken });


                if (!accessToken) {
                    console.warn('[VerifyOtpUsecase] Access token expired or missing');
                    throw new TransactionFailure(ResponseDto.failure("Phiên đăng nhập khách hàng đã hết hạn"));
                }

                console.log('[VerifyOtpUsecase] Deleting OTP record');
                const isOtpDeleted = await this.otpRepository.deleteOtp(isOtpChecked.id, session);
                console.log('[VerifyOtpUsecase] Delete OTP result', isOtpDeleted);

                if (!isOtpDeleted.success) {
                    throw new TransactionFailure(ResponseDto.failure(isOtpDeleted.message));
                }

                const isStatusSessionUpdated = await this.authRepository.updateStatusSession(isSessionChecked.data._id!.toString(), session);

                if (!isStatusSessionUpdated.success) {
                    throw new TransactionFailure(ResponseDto.failure(isStatusSessionUpdated.message));
                }
            }

            await session.commitTransaction();
            console.log('[VerifyOtpUsecase] Transaction completed successfully');
            return ResponseDto.success(isOtpChecked.message, token);

        } catch (transactionError: any) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            } console.error('[VerifyOtpUsecase] Transaction flow failed', transactionError);
            if (transactionError instanceof TransactionFailure) {
                return transactionError.response;
            }
            const errorMessage = transactionError?.message || "Đã có lỗi xảy ra hệ thống. Vui lòng thử lại sau.";
            return ResponseDto.failure(errorMessage);
        } finally {
            console.log('[VerifyOtpUsecase] Ending session');
            await session.endSession();
        }
    }
}