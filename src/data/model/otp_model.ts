import mongoose, { Types, Schema } from 'mongoose'

export interface IOtp {
    user_id: Types.ObjectId;
    otp: string;
}

export const OtpSchema = new Schema<IOtp>({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    otp: { type: String, trim: true, required: true },
}, { _id: true, timestamps: true });


