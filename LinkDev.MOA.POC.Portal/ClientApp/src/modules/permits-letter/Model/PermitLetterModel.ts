import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
export class PermitLetterModel
 {
     Id?:string;
     OldPermitId?:string;
     RequesterId?:string;
     CRId?:string;
     PermitTypeId?:string;
     ContractNumberId?:string;
     RequestType?:string;
     RequestedPermitDuration?:number;
     RequestedPermitDurationInDays?:number;
     IncludedWork?:number[];
     RquireFireFight:boolean;
     IsSubmitted:boolean;
     PermitReason:string;
     PermitDefaultDuration:number;
     Contacts: string[];
}
