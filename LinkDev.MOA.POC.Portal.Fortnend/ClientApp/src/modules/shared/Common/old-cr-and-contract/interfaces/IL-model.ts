import { ILProduct } from "./IL-product-model";
import { ILActivity } from "./IL-activity-model";


export class ILDetailsModel {
    
    ILType?:string;
    IssueDate ?:string;
    ExpiryDate ?:string;
    FactoryName ?:string;
    ILProducts ?:string;
    ILStatus ?:string;
    ILSource ?:string;
    CityEnglishName ?:string;
    CityArabicName?:string;
    CityName?:string;
    ILActivities?:ILActivity[];

    ILProductsList?:ILProduct[];
     
}
