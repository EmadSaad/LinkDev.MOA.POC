import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { ConstructionStageModel } from "./ConstructionStage";


export class ConstructionMonthlyReportModel {
	
	Id?: Guid;

	MonthlyReportNumber?: string;

	TotalImplementedPercentage?: string;
	
	ContractNumber: EntityReferenceItem;

	ContractNumberId?:Guid;

	ConsultingOffice: EntityReferenceItem;
	
	ConsultingOfficeId?:Guid;

	Contractor: EntityReferenceItem;
	
	ContractorId?:Guid;

	BuildingLicense: EntityReferenceItem;

	BuildingLicenseId?:Guid;

	ConstructionReportRequest: EntityReferenceItem;

	ConstructionReportRequestId?:Guid;

	ConstructionStages:ConstructionStageModel[];

	IsDeleted:boolean;
	IsUpdated:boolean;
	
	CreatedOn:string;


	
}
