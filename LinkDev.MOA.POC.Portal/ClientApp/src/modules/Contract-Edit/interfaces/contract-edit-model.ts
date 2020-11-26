import { Contract } from "src/modules/shared/Common/CR-version/interfaces/contract-model";
import { OldCRContract } from "src/modules/shared/Common/old-cr-and-contract/interfaces/contractId-CRId-model";

export class ContractEditModel implements OldCRContract , Contract {
    Id?: string;
    ContractId?: string;
    ProductMainFamilyId?: string;
    ProductSubFamilyId?: string;
    ProductId?: string;
    OwnerShipCR?: string;
    OwnerShipIL?: string;
    HasLoan?: boolean;
    PartnersPercentage?: string;
    EditType?: string[];
    EditReason?: string;
    EditCR?: boolean;
    HasFinalIL?: boolean;
    ContactDetails?: string [];
    Products?: number[];
    hasIL?: boolean;
    CRId?: string;
    ILId?: string;
    NewCRId?: string;
    NewILId?: string;
    CRVersionId?: string;
    ILVersionId?: string;
}
