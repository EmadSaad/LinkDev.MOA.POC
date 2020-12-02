import { Guid } from "guid-typescript";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

export class TicketDetails {
    Title?: string;
    PartnerNote?: string;
    IsTicketHasPreviousDocument:boolean;
    isPreviousTicketDocReadOnly: boolean;
    IsTicketHasAttachmentDocument:boolean;
    ContactCRID: string;
    CRId:string;
    ContractNumberId:string;
    Contacts: string;
    CRName:string;
    ConsultingOfficeId:string;
    ContractInfo : string;
    ContactDetails: string;
}

export enum CrTypeEnum {
    Investor = 1,
    ConsultingOffice = 6
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
}