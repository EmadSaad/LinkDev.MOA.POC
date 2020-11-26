import { Contract } from "src/modules/shared/Common/CR-version/interfaces/contract-model";

export class SplitContractModel implements Contract{

   Id?:string;
   ProductId ?:string;
   ProductMainFamilyId ?:string;
   ProductSubFamilyId ?:string;
   ContactDetailsIds ?:string[];
   ModonProducts?:string[];
   hasIL? : boolean;
   ILId?:string;
   CRId?:string;
   CRVersionId?:string;
   ILVersionId?:string;
   IsDeleted?:boolean;
}