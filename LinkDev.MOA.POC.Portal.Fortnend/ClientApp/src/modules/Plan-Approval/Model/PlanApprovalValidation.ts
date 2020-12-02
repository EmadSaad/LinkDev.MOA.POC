import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";

export class PlanApprovalValidation {
    IsValid:boolean;
    IsContractHasGeneralPlanDocument:boolean;
    IsContractHasSaftyPlanDocument:boolean;
    IsContractHasPreviousDocument:boolean;
    IsContractHasCadastralDocument:boolean;
    PlanTypeScopOfWork:string;
    IndustrialCity:string;
    Documents: DocumentSettingModel[];
}
