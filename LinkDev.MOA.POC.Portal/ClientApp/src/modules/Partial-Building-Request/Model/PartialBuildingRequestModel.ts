import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";

export class PartialBuildingRequestModel {
	VersionNumber?: number;
	CreatedOn?: Date;
	IsSubmitted?: boolean;
	ldv_contractnumbername?: string;
	ldv_requestheaderidname?: string;
	modifiedbyyominame?: string;
	Id: string;
	owneridtype?: string;
	Process?: string;
	CreatedByDelegate?: string;
	modifiedbyname?: string;
	owneridname?: string;
	RecordCreatedOn?: Date;
	ldv_requestername?: string;
	createdonbehalfbyyominame?: string;
	ModifiedByDelegate?: string;
	OwningTeam?: string;
	Status?: number;
	RequestHeader?: string;
	TimeZoneRuleVersionNumber?: number;
	ServiceSetting?: string;
	ldv_portalrequeststatusname?: string;
	ldv_industrialcityname?: string;
	ldv_crname?: string;
	TraversedPath?: string;
	createdonbehalfbyname?: string;
	ldv_bpfpartialbuildingrequestname?: string;
	CommentType?: number;
	UTCConversionTimeZoneCode?: number;
	ldv_servicesettingsidname?: string;
	Owner?: string;
	ModifiedOn?: Date;
	ImportSequenceNumber?: number;
	owneridyominame?: string;
	ProcessId?: string;
	ldv_buildinglicensename?: string;
	createdbyname?: string;
	RequestStatus?: string;
	modifiedonbehalfbyname?: string;
	StageId?: string;
	CurrentTask?: string;
	ldv_requeststatusname?: string;
	ldv_processidname?: string;
	CreatedBy?: string;
	ldv_partialbuildingcertificatename?: string;
	ModifiedBy?: string;
	ldv_cryominame?: string;
	BPFPartialBuildingRequest?: string;
	createdbyyominame?: string;
	OwningUser?: string;
	OwningBusinessUnit?: string;
	Name?: string;
	ldv_requesteryominame?: string;
	PortalRequestStatus?: string;
	StatusReason?: number;
	modifiedonbehalfbyyominame?: string;
	ldv_currenttaskidname?: string;

	// Used
	CR: EntityReferenceItem;
	CRId: string;

	ContractNumber: EntityReferenceItem;
	ContractNumberId: string;

	BuildingLicense?: EntityReferenceItem;
	BuildingLicenseId?: string;

	IndustrialCity?: EntityReferenceItem;
	IndustrialCityId?: string;

	Requester: EntityReferenceItem;
	RequesterId: string;

	PartialBuildingCertificate: EntityReferenceItem;
	PartialBuildingCertificateId: string;

	Contacts: string[];

}
