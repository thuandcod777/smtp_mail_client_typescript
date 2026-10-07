import mongoose, { Schema, Types } from "mongoose";

export type OTPAction = 'Register' | 'Login' | 'ResetPassword';

export interface IAuthAudit {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;
}

export const AuthAuditSchema = new Schema<IAuthAudit>({
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


export interface IAuthSession {
    user_id: Types.ObjectId;
    refresh_token: string;
    access_token: string;
    is_active: boolean;
    is_block: boolean;
}

export const AuthSchema = new Schema<IAuthSession>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    refresh_token: { type: String, trim: true },
    access_token: { type: String, trim: true },
    is_active: { type: Boolean },
    is_block: { type: Boolean, required: true },
}, { _id: true, timestamps: true });


export interface IUser {
    name: string;
    email: string;
    name_company: string;
    number_phone: string;
    types: string;
    roles: string;
}

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
