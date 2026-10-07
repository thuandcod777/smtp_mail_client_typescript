import mongoose, { Types } from 'mongoose';
export interface IOtp {
    user_id: Types.ObjectId;
    otp: string;
}
export declare const OtpSchema: mongoose.Schema<IOtp, mongoose.Model<IOtp, any, any, any, any, any, IOtp>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IOtp, mongoose.Document<unknown, {}, IOtp, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IOtp & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user_id?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IOtp, mongoose.Document<unknown, {}, IOtp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IOtp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    otp?: mongoose.SchemaDefinitionProperty<string, IOtp, mongoose.Document<unknown, {}, IOtp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IOtp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IOtp>;
//# sourceMappingURL=otp_model.d.ts.map