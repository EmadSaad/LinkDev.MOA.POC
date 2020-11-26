import { Contract } from "src/modules/shared/Common/CR-version/interfaces/contract-model";
import { OldCRContract } from "src/modules/shared/Common/old-cr-and-contract/interfaces/contractId-CRId-model";
import { MergeContractModel } from "./merge-contract-model";


export class MergeRequestModel implements OldCRContract,Contract{

    Id?: string;
    ContractId?: string;
    ProductMainFamilyId?: string;
    ProductSubFamilyId?: string;
    ProductId?: string;
    OwnerShipCR?: string;
    OwnerShipIL?: string;
    PartnersPercentage?: string;
    MergeReasons?: string;
    ContactDetails?: string[];
    Products?: number[];
    hasIL?: boolean;
    CRId?: string;
    ILId?: string;
    NewCRId: string;
    CRVersionId?: string;
    ILVersionId?: string;
    MergeContracts?:MergeContractModel[];
   ModonProducts?:string[];

}
