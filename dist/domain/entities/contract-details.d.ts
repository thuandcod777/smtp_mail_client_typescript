export interface IContractDetailsJSON {
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
export declare class ContractDetails {
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
    constructor({ number_contract, name_client_a, name_business_owner_b, name_enterprise_a, name_enterprise_b, business_register_number_a, business_register_number_b, name_product, type_weight, type_product, pickup_location, delivery_location, method_contract, method_delivery, method_payment }: {
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
    });
    static fromJson(json: ContractDetails): ContractDetails;
}
//# sourceMappingURL=contract-details.d.ts.map