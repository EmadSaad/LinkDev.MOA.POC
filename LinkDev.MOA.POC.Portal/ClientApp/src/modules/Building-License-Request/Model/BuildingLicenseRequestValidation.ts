import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";

export class BuildingLicenseRequestValidation {
    IsValid:boolean;
    IsContractHasApprovedGeneralPlansIssued:boolean;
    IsContractHasApprovedGeneralSafetyIssued:boolean;
    Documents: DocumentSettingModel[];
}
