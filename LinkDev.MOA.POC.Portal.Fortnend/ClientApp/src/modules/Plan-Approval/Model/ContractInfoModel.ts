import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";

export class ContractInfoModel {

    constructor(){
    this.CR= new EntityReferenceItem();
    this.Industrialcity= new EntityReferenceItem();
    this.ProductMainfamily= new EntityReferenceItem();
    this.ProductSubFamily= new EntityReferenceItem();
    this.Product= new EntityReferenceItem();
    }


    Id?:string;
    CR:EntityReferenceItem;
    Industrialcity:EntityReferenceItem;
    ProductMainfamily:EntityReferenceItem;
    ProductSubFamily:EntityReferenceItem;
    Product:EntityReferenceItem;
    ConstructionContractStatus?:string;
    LegalStatus?:string;
    Pricingdate?:string;
    ContractExpiryDate:DateModel;
    ContractStartingDate:DateModel;
    CRId:string;
    IndustrialcityId:string;
    ProductMainfamilyId:string;
    ProductSubFamilyId:string;
    ProductId:string;
    
    CRString:string;
    IndustrialcityString:string;
    ProductMainfamilyString:string;
    ProductSubFamilyString:string;
    ProductString:string;
    FileNumber:string;
    PricingdateString:string;
    LegalStatusString:string;
    ConstructionContractStatusString:string;
    Contacts: RetrieveOptionsRequest[];

}
