import { Guid } from "guid-typescript";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

export class PlanApprovalModel{
    Id?:string;
    ConsultingOffice:EntityReferenceItem;
    CR:EntityReferenceItem;
    ContractNumber:EntityReferenceItem;
    Investor: EntityReferenceItem;
    PlanType: EntityReferenceItem;
    IndustrialCity:EntityReferenceItem;
    ConsultingOfficeId:string;
    CRId:string;
    InvestorId:string;
    IndustrialCityId:string;
    PlanTypeId:string;
    ContractNumberId:string;
    Investorbiddingdecision?:number;
    Isdetailedplansubmitted:boolean;
    Isfeespaid:boolean;
    Isgeneralplansubmitted:boolean;
    Issubmitted:boolean;
    PriceValue:number;
    ModonComments:string;
    ServiceCost : number; 
    PlanApprovalNumber: string;
    OfficeComment:string;
    ScopeOfWork: string;
    CurrentSpace : string;
    AnotherComment : string;
    IndustrialcityAdminCommentOnDetailedPlan:string;
    IndustrialcityAdminDecisionOnDetailedPlan?:number;
    IndustrialcityAdminDecisionOnGeneralPlan?:number;
    OfficeOrBidding?:number;
   // PlanElements?:string;
    ConsultingOfficeDecision?:number;
    AddScopOfWork: string;
    Contractmeternumber: number;
    PriceOfferValue:number;
    DocumentList:DocumentSettingModel[];
    Contacts: string[];
    ActiveBidding:string;
    Requirefees:boolean;
    //PlanElementsString: string;
    FutureSpaceAfterModification: string;

    IsContractHasPreviousDocument:boolean;
    IsContractHasCadastralDocument:boolean;
    
    CRName:string;

    PlanElements: number[];
    OfficeCommentOnGeneralPlan:string;
    OfficeCommentOnDetailedPlan:string;

}

export enum CRMStatusCodeEnum{
    Draft = 1,
    CreateBidding = 22,
    PendingOfficeDecision = 23,
    InvestorDecision = 24, //معلقة على المستثمر لاختيار مكتب
    PendingAddingGeneraPlan = 25,
    PendingAddingDetailedPlan = 26,
    PendingPayment = 4,
    PendingOnOfficeToEditGeneralPlans = 28,
    PendingOnOfficeToEditDetailedPlans = 35,
    PendingOnIndustrialCityAdmin = 27,
}

export enum InvestorBiddingDecision{
    Rejectall = 100000000,
    Chooseconsultingoffice = 100000001
}

export enum ConsultingofficeDecision{
    Approve = 1,
    Reject = 2,
}

export enum ServiceTypeEnum {
    PlanApproval = 1,
    BuildingLicense = 2,
}

export enum CrTypeEnum {
    Investor = 1,
    ConsultingOffice = 6
}

export enum RequestTypeEnum {
    GeneralMainBranch = 1,
    SubBranch = 2,
    SafetyMainBranch = 3
}