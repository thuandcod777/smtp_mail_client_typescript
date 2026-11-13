import mongoose, { Types } from "mongoose";
export type OTPAction = 'Register' | 'Login' | 'ResetPassword';
export interface IAuthAudit {
    email: string;
    ip_address: string;
    user_agent: string;
    action: OTPAction;
}
export declare const AuthAuditSchema: mongoose.Schema<IAuthAudit, mongoose.Model<IAuthAudit, any, any, any, any, any, IAuthAudit>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IAuthAudit, mongoose.Document<unknown, {}, IAuthAudit, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IAuthAudit & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    email?: mongoose.SchemaDefinitionProperty<string, IAuthAudit, mongoose.Document<unknown, {}, IAuthAudit, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthAudit & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    ip_address?: mongoose.SchemaDefinitionProperty<string, IAuthAudit, mongoose.Document<unknown, {}, IAuthAudit, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthAudit & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    user_agent?: mongoose.SchemaDefinitionProperty<string, IAuthAudit, mongoose.Document<unknown, {}, IAuthAudit, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthAudit & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    action?: mongoose.SchemaDefinitionProperty<OTPAction, IAuthAudit, mongoose.Document<unknown, {}, IAuthAudit, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthAudit & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IAuthAudit>;
export interface IAuthSession {
    user_id: Types.ObjectId;
    refresh_token: string;
    access_token: string;
    is_active: boolean;
    is_block: boolean;
}
export declare const AuthSchema: mongoose.Schema<IAuthSession, mongoose.Model<IAuthSession, any, any, any, any, any, IAuthSession>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    user_id?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    refresh_token?: mongoose.SchemaDefinitionProperty<string, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    access_token?: mongoose.SchemaDefinitionProperty<string, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    is_active?: mongoose.SchemaDefinitionProperty<boolean, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    is_block?: mongoose.SchemaDefinitionProperty<boolean, IAuthSession, mongoose.Document<unknown, {}, IAuthSession, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IAuthSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IAuthSession>;
export interface IUser {
    name: string;
    email: string;
    name_company: string;
    number_phone: string;
    types: string;
    roles: string;
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: true;
    timestamps: true;
}, {
    email: string;
    types: string;
    roles: string;
    name?: string | null;
    name_company?: string | null;
    number_phone?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    email: string;
    types: string;
    roles: string;
    name?: string | null;
    name_company?: string | null;
    number_phone?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "_id" | "timestamps"> & {
    _id: true;
    timestamps: true;
}> & Omit<{
    email: string;
    types: string;
    roles: string;
    name?: string | null;
    name_company?: string | null;
    number_phone?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    email: string;
    types: string;
    roles: string;
    name?: string | null;
    name_company?: string | null;
    number_phone?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=auth_model.d.ts.map