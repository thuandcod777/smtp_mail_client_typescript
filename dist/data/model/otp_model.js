import mongoose, { Types, Schema } from 'mongoose';
export const OtpSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    otp: { type: String, trim: true, required: true },
}, { _id: true, timestamps: true });
//# sourceMappingURL=otp_model.js.map