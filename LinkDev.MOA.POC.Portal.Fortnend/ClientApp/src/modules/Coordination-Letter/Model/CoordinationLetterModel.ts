
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
export class CoordinationLetterModel
 {
     Id?:string;
     SpecifyDestination?:string;
     RequesterId?:string;
     CRId?:string;
     ContractNumberId?:string;
     DestinationId?:string;
     Regarding?:string;
     ManagerComment?:string;
      
}
