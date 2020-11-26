import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

export class ConstructionStageModel {
	
	Id: Guid;

	StageName?: string;

	ImplementationDuration?: number;

	PlannedPercentage?: string;

	Comments?: string;
	
	LastMonthImplementationPercentage?: number;

	CurrentMonthImplementationPercentage?: string;
	
	ConstructionReportRequest: EntityReferenceItem;

	ConstructionReportRequestId?:Guid;

	ConstructionMonthlyReport: EntityReferenceItem;

	ConstructionMonthlyReportId?:Guid;

	IsDeleted:boolean;
	IsUpdated:boolean;
	
}
