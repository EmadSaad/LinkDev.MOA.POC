import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { PriceOfferModel } from "./PriceOfferModel";

export class BiddingModel{

    constructor(){
        this.BiddingStatus = new EntityReferenceItem();
        this.ConsultingOffice = new EntityReferenceItem();
        this.PlanApprovalRequestNumber = new EntityReferenceItem();
        this.BuildingLicenseRequest = new EntityReferenceItem();
        this.PriceOfferList = [];
    }

    Id?:string;
    BiddingStatus?:EntityReferenceItem;
    ConsultingOffice?:EntityReferenceItem;
    Contractor?:EntityReferenceItem;
    PlanApprovalRequestNumber?:EntityReferenceItem;
    BuildingLicenseRequest?:EntityReferenceItem;
    Qualify?:string;
    IsActive?:boolean;
    BiddingNumber?:string;
    BiddingStatusId?:string;
    ConsultingOfficeId?:string;
    ContractorId?:string;
    PlanApprovalRequestNumberId?:string;
    BuildingLicenseRequestId?:string;
    PriceOfferList?:PriceOfferModel[];
    AddScopOfWork?:string;
    officeorbidding:BiddingOrOffice;
    contractorOrbidding:BiddingOrContractor;
    RequesterMobilePhoneNumber:string;
    RequesterEmail:string;
    RequesterName:string;

    IsDeleted:boolean=false;
    IsUpdated:boolean=false;
}


export enum QualifyEnum {
	ConsultingOffice = 1,
	Contractor = 2
}

export enum ServiceTypeEnum {
    PlanApproval = 1,
    BuildingLicense = 2,
}

export enum BiddingOrOffice{
    Bidding=100000001,
    Office =100000000
}


export enum TestUser{
    Investor,
    Bidder,
    Contractor,
    MODONAdmin,

}

export enum BiddingOrContractor{
    Bidding=2,
    Contractor=1
}

export enum BiddingType {
    Office = 1,
    Contractor = 2
}

export enum RequestTypeEnum {
    GeneralMainBranch = 1,
    SubBranch = 2,
    SafetyMainBranch = 3
}