import { ContractContactDetails } from "./Contract-Contact-details-model";
import { ContractProduct } from "./Contract-product";
import { CRDetailsModel } from "./CR-model";
import { ILDetailsModel } from "./IL-model";

export class ContractModel {

     Id?:string;
     CRNumber ?:string;
     CRName ?:string;
     IndustrialLicenseName ?:string; // ILName + " - " + ILNumber;
     ILName?:string;
     ILNumber ?:string;
     ILId?:string;
     IndustrialCityName?:string;
     ProductMainFamilyName?:string;
     ProductSubFamilyName?:string;
     ProductName?:string;
     ContractExpiryDate ?:string;
     ContractStartingDate ?:string;
     ConstructionContractStatus ?:string;
     LegalStatus?:string;
     PricingDate ?:string;

     ContactDetails ?:ContractContactDetails[];
     ContractProducts?:ContractProduct[];

     CRDetailsModel ?:CRDetailsModel;
     ILDetailsModel?: ILDetailsModel ;
     ProductMainFamilyId?:string;

     IssuanceDateInHigri?:string;
     ExpiryDateInHigri?:string;
     DateType?:number;
     
    }
