import { Contract } from "src/modules/shared/Common/CR-version/interfaces/contract-model";

export class MergeContractModel implements Contract{

   Id?:string;
   ProductMainFamilyId?: string;
   ProductSubFamilyId?: string;
   ProductId?: string;
   ContactDetailsIds ?:string[];
   ModonProducts?:string[];
   hasIL? : boolean;
   ILId?:string;
   CRId?:string;
   CRVersionId?:string;
   ILVersionId?:string;
   IsDeleted?:boolean;
}
