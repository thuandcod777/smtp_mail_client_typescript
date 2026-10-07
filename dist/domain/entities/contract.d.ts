import { ContractDetails, type IContractDetailsJSON } from "./contract-details.js";
import { ContractPdf, type IContractPdfJSON } from "./contract-pdf.js";
import Scope, { type IScopeJSON } from "./scope.js";
export interface IContractJSON {
    user_id: string;
    contract_code: string;
    step_contract: number;
    contract_details: IContractDetailsJSON | null;
    scope: IScopeJSON | null;
    contract_pdf: IContractPdfJSON | null;
    is_success: boolean;
}
export declare class Contract {
    user_id: string;
    contract_code: string;
    step_contract: number;
    contract_details: ContractDetails | null;
    scope: Scope | null;
    contract_pdf: ContractPdf | null;
    is_success: boolean;
    constructor({ user_id, contract_code, step_contract, contract_details, scope, contract_pdf, is_success }: {
        user_id: string;
        contract_code: string;
        step_contract: number;
        contract_details: ContractDetails | null;
        scope: Scope | null;
        contract_pdf: ContractPdf | null;
        is_success: boolean;
    });
    static fromJson(json: IContractJSON): Contract;
}
//# sourceMappingURL=contract.d.ts.map