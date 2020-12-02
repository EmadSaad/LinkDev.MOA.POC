import { ILActivity } from "../../old-cr-and-contract/interfaces/IL-activity-model";
import { ILProduct } from "../../old-cr-and-contract/interfaces/IL-product-model";

export interface ILVersion {
    Id?:string;
    Name?:string;
    ILNumber?:string;
    ILProducts?:string;
    ILSource?:string;
    ILStatus?:string;
    ILType?:string;
    IssueDate?:string;
    ExpiryDate?:string;
    Nationality?:string;
    OwnerName?:string;
    InvestmentType?:string;
    FactoryName?:string;
    CityName?:string;
    CRName?:string;
    ILName?:string;
    ILId?:string;

    ILActivities?:ILActivity[];

    ILProductsList?:ILProduct[];

}