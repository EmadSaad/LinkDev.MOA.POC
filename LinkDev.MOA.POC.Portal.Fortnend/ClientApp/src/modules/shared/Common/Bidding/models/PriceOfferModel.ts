import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { PriceItem } from "./PriceItem";
import { DateTime } from "src/modules/shared/form-guide/models/date-time";

export class PriceOfferModel{
    constructor(){
        this.Investor = new EntityReferenceItem();
        this.Currency = new EntityReferenceItem();
        this.BiddingNumber = new EntityReferenceItem();
        this.BidderName = new EntityReferenceItem();
        this.PlanApprovalRequest = new EntityReferenceItem();
        this.BuildingLicenseRequest = new EntityReferenceItem();
        this.PriceOffer = new PriceItem();
        this.PriceOfferBase = new PriceItem();
    }

    Id?:string;
    Name?:string;
    Investor?:EntityReferenceItem;
    Currency?:EntityReferenceItem;
    BiddingNumber?:EntityReferenceItem;
    BidderName?:EntityReferenceItem;
    PlanApprovalRequest?:EntityReferenceItem;
    BuildingLicenseRequest?:EntityReferenceItem;
    InvestorDecision?:number;
    PriceOffer?:PriceItem;
    PriceOfferBase?:PriceItem;

    Comment?:string;
    CurrencyId?:string;
    PriceOfferValue?:number;
    PriceOfferBaseValue?:number;
    InvestorId?:string;
    BiddingNumberId?:string;
    BidderNameId?:string;
    BidderNameString?:string;
    PlanApprovalRequestId?:string;
    BuildingLicenseRequestId?:string;

    ApprovedRejectSpacifice?:boolean;
    ChoosePriceOfferOrRejectAll?:boolean;

    IsDeleted?:boolean=false;
    IsUpdated?:boolean=false;

    BidderCRName?:string;

    IndustrialCity?:string;
    RequestType?:number;
    ServiceType?:number;
    CRType?:number;
    ErrorMessage?:string;

    PriceCreatedOnDate?:string;

    // BidderEmail?:string;
    // BidderWebSiteURL?:string;
    // BidderTelephone?:string;

}

export enum CrTypeEnum {
    Investor = 1,
    ConsultingOffice = 6,
    Contractor = 7
}