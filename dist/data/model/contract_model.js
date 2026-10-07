import mongoose, { Schema, Types } from "mongoose";
import { ScopeSchema } from "./scope_model.js";
const PdfSchema = new Schema({
    name: { type: String, required: true },
    buffer: { type: Buffer, required: true },
    mime_type: { type: String, default: 'application/pdf' }
}, { _id: true, timestamps: true });
export const ContractDetailSchema = new Schema({
    number_contract: { type: String, required: true },
    name_client_a: { type: String, required: true },
    name_business_owner_b: { type: String, required: true },
    name_enterprise_a: { type: String, required: true },
    name_enterprise_b: { type: String, required: true },
    business_register_number_a: { type: String, required: true },
    business_register_number_b: { type: String, required: true },
    name_product: { type: String },
    type_weight: { type: String },
    type_product: { type: String },
    pickup_location: { type: String },
    delivery_location: { type: String },
    method_contract: { type: String },
    method_delivery: { type: String },
    method_payment: { type: String },
}, { _id: true, timestamps: true });
export const ContractSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    contract_code: { type: String },
    step_contract: { type: Number },
    scope: { type: ScopeSchema, default: null },
    contract_details: { type: ContractDetailSchema, default: null },
    contract_pdf: { type: PdfSchema, default: null },
    is_success: { type: Boolean, default: false }
}, { _id: true, timestamps: true });
//# sourceMappingURL=contract_model.js.map