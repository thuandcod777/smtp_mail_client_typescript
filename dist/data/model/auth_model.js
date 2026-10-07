import mongoose, { Schema, Types } from "mongoose";
export const AuthAuditSchema = new Schema({
    email: { type: String, trim: true, required: true },
    ip_address: { type: String, trim: true, required: true },
    user_agent: { type: String, trim: true, required: true },
    action: {
        type: String,
        enum: ['Register', 'Login', 'ResetPassword'],
        default: 'Login',
        required: true
    }
}, { _id: true, timestamps: true });
export const AuthSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    refresh_token: { type: String, trim: true },
    access_token: { type: String, trim: true },
    is_active: { type: Boolean },
    is_block: { type: Boolean, required: true },
}, { _id: true, timestamps: true });
export const UserSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name_company: {
        type: String, default: null
    },
    number_phone: { type: String, default: null },
    types: { type: String, required: true },
    roles: { type: String, required: true },
}, { _id: true, timestamps: true });
//# sourceMappingURL=auth_model.js.map