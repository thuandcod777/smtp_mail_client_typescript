import mongoose, { Types } from "mongoose";
import { type IScopeCollection } from "./scope_model.js";
export interface IPdfData {
    name: string;
    buffer: Buffer;
    mime_type: string;
}
export interface IContractDetail {
    number_contract: string;
    name_client_a: string;
    name_business_owner_b: string;
    name_enterprise_a: string;
    name_enterprise_b: string;
    business_register_number_a: string;
    business_register_number_b: string;
    name_product: string;
    type_weight: string;
    type_product: string;
    pickup_location: string;
    delivery_location: string;
    method_contract: string;
    method_delivery: string;
    method_payment: string;
}
export declare const ContractDetailSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: true;
    timestamps: true;
}, {
    number_contract: string;
    name_client_a: string;
    name_business_owner_b: string;
    name_enterprise_a: string;
    name_enterprise_b: string;
    business_register_number_a: string;
    business_register_number_b: string;
    name_product?: string | null;
    type_weight?: string | null;
    type_product?: string | null;
    pickup_location?: string | null;
    delivery_location?: string | null;
    method_contract?: string | null;
    method_delivery?: string | null;
    method_payment?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    number_contract: string;
    name_client_a: string;
    name_business_owner_b: string;
    name_enterprise_a: string;
    name_enterprise_b: string;
    business_register_number_a: string;
    business_register_number_b: string;
    name_product?: string | null;
    type_weight?: string | null;
    type_product?: string | null;
    pickup_location?: string | null;
    delivery_location?: string | null;
    method_contract?: string | null;
    method_delivery?: string | null;
    method_payment?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "_id" | "timestamps"> & {
    _id: true;
    timestamps: true;
}> & Omit<{
    number_contract: string;
    name_client_a: string;
    name_business_owner_b: string;
    name_enterprise_a: string;
    name_enterprise_b: string;
    business_register_number_a: string;
    business_register_number_b: string;
    name_product?: string | null;
    type_weight?: string | null;
    type_product?: string | null;
    pickup_location?: string | null;
    delivery_location?: string | null;
    method_contract?: string | null;
    method_delivery?: string | null;
    method_payment?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    number_contract: string;
    name_client_a: string;
    name_business_owner_b: string;
    name_enterprise_a: string;
    name_enterprise_b: string;
    business_register_number_a: string;
    business_register_number_b: string;
    name_product?: string | null;
    type_weight?: string | null;
    type_product?: string | null;
    pickup_location?: string | null;
    delivery_location?: string | null;
    method_contract?: string | null;
    method_delivery?: string | null;
    method_payment?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface IContract {
    user_id: Types.ObjectId;
    contract_code: string;
    step_contract: number;
    scope: IScopeCollection;
    contract_details: IContractDetail;
    contract_pdf: IPdfData;
    is_success: boolean;
}
export declare const ContractSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: true;
    timestamps: true;
}, {
    user_id: Types.ObjectId;
    is_success: boolean;
    contract_details?: ({
        number_contract: string;
        name_client_a: string;
        name_business_owner_b: string;
        name_enterprise_a: string;
        name_enterprise_b: string;
        business_register_number_a: string;
        business_register_number_b: string;
        name_product?: string | null;
        type_weight?: string | null;
        type_product?: string | null;
        pickup_location?: string | null;
        delivery_location?: string | null;
        method_contract?: string | null;
        method_delivery?: string | null;
        method_payment?: string | null;
    } & mongoose.DefaultTimestampProps) | null;
    scope?: IScopeCollection | null;
    contract_pdf?: IPdfData | null;
    contract_code?: string | null;
    step_contract?: number | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    user_id: Types.ObjectId;
    is_success: boolean;
    contract_details?: ({
        number_contract: string;
        name_client_a: string;
        name_business_owner_b: string;
        name_enterprise_a: string;
        name_enterprise_b: string;
        business_register_number_a: string;
        business_register_number_b: string;
        name_product?: string | null;
        type_weight?: string | null;
        type_product?: string | null;
        pickup_location?: string | null;
        delivery_location?: string | null;
        method_contract?: string | null;
        method_delivery?: string | null;
        method_payment?: string | null;
    } & mongoose.DefaultTimestampProps) | null;
    scope?: IScopeCollection | null;
    contract_pdf?: IPdfData | null;
    contract_code?: string | null;
    step_contract?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "_id" | "timestamps"> & {
    _id: true;
    timestamps: true;
}> & Omit<{
    user_id: Types.ObjectId;
    is_success: boolean;
    contract_details?: ({
        number_contract: string;
        name_client_a: string;
        name_business_owner_b: string;
        name_enterprise_a: string;
        name_enterprise_b: string;
        business_register_number_a: string;
        business_register_number_b: string;
        name_product?: string | null;
        type_weight?: string | null;
        type_product?: string | null;
        pickup_location?: string | null;
        delivery_location?: string | null;
        method_contract?: string | null;
        method_delivery?: string | null;
        method_payment?: string | null;
    } & mongoose.DefaultTimestampProps) | null;
    scope?: IScopeCollection | null;
    contract_pdf?: IPdfData | null;
    contract_code?: string | null;
    step_contract?: number | null;
} & mongoose.DefaultTimestampProps & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    user_id: Types.ObjectId;
    is_success: boolean;
    contract_details?: {
        number_contract: string;
        name_client_a: string;
        name_business_owner_b: string;
        name_enterprise_a: string;
        name_enterprise_b: string;
        business_register_number_a: string;
        business_register_number_b: string;
        name_product?: string | null;
        type_weight?: string | null;
        type_product?: string | null;
        pickup_location?: string | null;
        delivery_location?: string | null;
        method_contract?: string | null;
        method_delivery?: string | null;
        method_payment?: string | null;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } | null;
    scope?: {
        scopes: {
            is_scope: boolean;
            address: string;
            location: {
                type: "Point";
                coordinates: [number, number];
            };
        }[];
        is_success: boolean;
        is_verify_scope: boolean;
    } | null;
    contract_pdf?: {
        name: string;
        buffer: mongoose.mongo.Binary;
        mime_type: string;
    } | null;
    contract_code?: string | null;
    step_contract?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=contract_model.d.ts.map