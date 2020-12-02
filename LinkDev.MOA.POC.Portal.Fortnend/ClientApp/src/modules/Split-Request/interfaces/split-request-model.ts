import { OldCRContract } from "src/modules/shared/Common/old-cr-and-contract/interfaces/contractId-CRId-model";
import { SplitContractModel } from "./split-contrat-model";

export class SplitRequestModel implements OldCRContract{

   Id?:string;
   ApplicantId?:string;
   ContractId?:string;
   SplitReasons?:string;
   CRId?: string;
   SplitContracts?:SplitContractModel[];

}