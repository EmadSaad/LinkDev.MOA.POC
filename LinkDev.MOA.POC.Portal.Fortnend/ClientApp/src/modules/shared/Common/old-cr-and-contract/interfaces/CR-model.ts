import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { CRActivity } from "./CR-activity-model";
import { CROwnerModel } from "./CR-owner-model";


export class CRDetailsModel {
   
   AccountName?:string; // CRNumber + " - " + CRName;
   CRType?:string;
   CRNumber?:string;
   CRName?:string;
   IssueDate ?:string;
   ExpiryDate?:string;
   IssuanceCity ?:string;
   CRActivities?: CRActivity[];
   CROwners ?:CROwnerModel[]; 

}