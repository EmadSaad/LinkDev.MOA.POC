import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

import { ConstructionMonthlyReportModel } from "./ConstructionMonthlyReport";
import { ConstructionStageModel } from "./ConstructionStage";
import { BuildingLicenseModel } from "src/modules/Building-License-Request/Model/BuildingLicenseModel";


export class ConstructionReportRequestModel {
	
	Id: Guid;

	ConstructionReportNumber?: string;

	ContractNumber: EntityReferenceItem;

	ContractNumberId?:Guid;

	BuildingLicense: EntityReferenceItem;

	BuildingLicenseId?:Guid;

	ConsultingOffice: EntityReferenceItem;
	
	ConsultingOfficeId?:Guid;

	Contractor: EntityReferenceItem;
	
	ContractorId?:Guid;

	CR: EntityReferenceItem;
	
	CRId?:Guid;

	Industrialcity: EntityReferenceItem;

	IndustrialcityId?:Guid;

	IsStagesTimeScheduleSubmited?: boolean;
	
	IsMonthlytimeScheduleFilled?: boolean;

	AdminReviewOnMonthlyReport?: number;

	TotalImplementedPercentage?: string;

	PartialConstructionDone?: boolean;
	
	RequestStatus: EntityReferenceItem;

	RequestStatusId?:Guid;

	PortalRequestStatus: EntityReferenceItem;

	PortalRequestStatusId?:Guid;

	ConstructionStages:ConstructionStageModel[];

	ConstructionMonthlyReport:ConstructionMonthlyReportModel[];

	CurrentConstructionMonthlyReport : ConstructionMonthlyReportModel;

	IsSubmitted:boolean;
	
}



export enum CRMStatusCodeEnum{
   
    PendingDefaultStages = 44,
	PendingMonthlyReport = 45,
	AdminReviewOnMonthlyReport = 27,
	ReportReviewed=46,
	AutomaticShutdown=47
    
}
