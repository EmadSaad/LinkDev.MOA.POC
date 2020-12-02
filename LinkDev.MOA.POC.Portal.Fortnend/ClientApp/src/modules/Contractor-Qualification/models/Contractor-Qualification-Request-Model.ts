import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { Guid } from "guid-typescript";
import { ContractorCertificateModel } from "./ContractorCertificateModel";

export class ContractorQualificationRequestModel
{
    RequestNumber?:string;
    ContractorEnglishName?:string;
    ContractorArabicName?:string;
    MainBranchAddress?:string;
    Note?:string;
    NoteFromLastCertificate?:string;
    Comment?:string;
    Price?:Number;
    Id?:string;
    ProjectsGrid:ProjectsGrid[];
    AdminDecisionname?:string;
    AdminDecision:ldv_admindecisionEnum
    Contacts?: string[];
    Projects?:string[];
    CR: EntityReferenceItem;
    CRId:string;
    IsFeesPaid:boolean;
    RequestType: EntityReferenceItem;
    RequestTypeId:string;
    
    City: EntityReferenceItem;
    CityId:string;

    OldQualificationCertificate: EntityReferenceItem;
    OldQualificationCertificateId:string;
    
    ContractorRating: EntityReferenceItem;
    ContractorRatingId:string;

    OldRatingCategory: EntityReferenceItem;
    OldRatingCategoryId:string;
    
    GeneratedCertificate:ContractorCertificateModel;
    
}

export enum ldv_admindecisionEnum {
	Proceedwithrequest = 1,
	Sendbacktocompletemissingparts = 2,
	Cantbeprocessed = 3
}

export class ProjectsGrid{
    InvestorName?:string;
    ProjectDate?:Date;
    ProjectName?:string;
    IsDeleted?:boolean;
}
export enum CRMStatusCodeEnum {
	Draft = 1,
	PendingonContractorToPay = 57,
	Completed=39
	
}