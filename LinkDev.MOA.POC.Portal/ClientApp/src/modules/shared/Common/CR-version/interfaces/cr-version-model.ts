import { CRActivity } from "../../old-cr-and-contract/interfaces/CR-activity-model";
import { CROwnerModel } from "../../old-cr-and-contract/interfaces/CR-owner-model";

export class CRVersion {

    Id?:string; 
    Name?:string;
    CRActivity ?:string;
    CRType?:string;
    IssuanceCity?:string;
    IssueDate ?:string;
    ExpiryDate?:string;
    CRName?:string;
    CRId?:string;
    //MainCRName?:string;
    Owners?:CROwnerModel[];
    Activities?:CRActivity[];

}