import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

export class OperatingLicenseRequestModel {
	// IndustrialCityAdminDecisionForImmediate?: number;
	// VersionNumber?: number;
	// CreatedOn?: Date;
	// ldv_contractnumbername?: string;
	// ldv_requestheaderidname?: string;
	// modifiedbyyominame?: string;
	// owneridtype?: string;
	// Terms?: string;
	// CreatedByDelegate?: string;
	// modifiedbyname?: string;
	// owneridname?: string;
	// RecordCreatedOn?: Date;
	// createdonbehalfbyyominame?: string;
	// ModifiedByDelegate?: string;
	// OwningTeam?: string;
	// Status?: number;
	// RequestHeaderId?: string;
	// TimeZoneRuleVersionNumber?: number;
	// ldv_investoryominame?: string;
	// ServiceSettingsId?: string;
	// ldv_portalrequeststatusname?: string;
	// ldv_investorname?: string;
	// ldv_crname?: string;
	// TraversedPath?: string;
	// createdonbehalfbyname?: string;
	// CommentType?: number;
	// UTCConversionTimeZoneCode?: number;
	// ldv_servicesettingsidname?: string;
	// Owner?: string;
	// ModifiedOn?: Date;
	// ImportSequenceNumber?: number;
	// PortalRequestStatus?: string;
	// LicenseDuration?: string;
	// ProcessId?: string;
	// ldv_licensedurationname?: string;
	// createdbyname?: string;
	// RequestStatus?: string;
	// modifiedonbehalfbyname?: string;
	// StageId?: string;
	// ldv_requeststatusname?: string;
	// ldv_oldlicensenumbername?: string;
	// CreatedBy?: string;
	// ldv_industrialcityname?: string;
	// ModifiedBy?: string;
	// ldv_cryominame?: string;
	// LicenseExpiryDate?: Date;
	// ldv_processidname?: string;
	// createdbyyominame?: string;
	// OwningUser?: string;
	// ldv_licensetypename?: string;
	// IndustrialcityAdminDecision?: number;
	// OwningBusinessUnit?: string;
	// ldv_buildinglicensenumbername?: string;
	// ldv_operatinglicensescertificatename?: string;
	// StatusReason?: number;
	// modifiedonbehalfbyyominame?: string;
	// CurrentTaskId?: string;
	// ldv_currenttaskidname?: string;
	// owneridyominame?: string;
	// IndustrialCityAdminCommentForImmediate?: string;
	// Industrialcity?: string;

	// Used
	CR: EntityReferenceItem;
	CRId: string;

	ContractNumber: EntityReferenceItem;
	ContractNumberId: string;

	BuildingLicenseNumber?: EntityReferenceItem;
	BuildingLicenseNumberId?: string;

	IndustrialCity?: EntityReferenceItem;
	IndustrialCityId?: string;

	Requester: EntityReferenceItem;
	RequesterId: string;

	LicenseType: EntityReferenceItem;
	LicenseTypeId: string;

	Investor?: EntityReferenceItem;
	InvestorId: string;

	OldLicenseNumber?: EntityReferenceItem;
	OldLicenseNumberId: string;

	OperatingLicensesCertificate?: EntityReferenceItem;
	OperatingLicensesCertificateId: string;

	MaintenanceContractEndDate?: DateModel;
	MaintenanceContractStartDate?: DateModel;

	IsSubmitted?: boolean;
	Id: string;
	LicenseDurationId?: string;
	IsImmediate?: boolean;
	RequestNumber?: string;
	CRName?: string;
	LicenseTypeNameEN?:string;
	LicenseTypeNameAR?: string;
	LicenseTypeName?: string;
	LicenseCreationDate?: string;
    IndustrialCityAdminComment?: string;

	Contacts: string[];

}

export enum CRMStatusCodeEnum {
	Draft = 1,
	PendingOnInvestor = 38,
	AdminDecisionOnImmediateRequest=72,
	AdminDecision = 73,
	Completed = 39,
	UnableToComplete = 58,
	AutomaticShutDownDueToNonResponse = 34
}


