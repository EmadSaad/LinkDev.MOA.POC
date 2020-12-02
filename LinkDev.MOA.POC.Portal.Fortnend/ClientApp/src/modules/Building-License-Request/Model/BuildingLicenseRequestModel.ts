import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export class BuildingLicenseRequestModel {
	VersionNumber?: number;
	CreatedOn?: Date;
	PortalRequestStatus?: string;
	ldv_accountyominame?: string;
	ldv_contractnumbername?: string;
	ldv_portalrequeststatusname?: string;
	ldv_requestheaderidname?: string;
	IssuanceDateinHijri?: string;
	modifiedbyyominame?: string;
	owneridtype?: string;
	Process?: string;
	ldv_consultingofficeyominame?: string;
	CreatedByDelegate?: string;
	IndustrialCityAdminDecision?: number;
	ldv_contractoryominame?: string;
	Id: string;
	owneridname?: string;
	BPFBuildingLicenseRequest?: string;
	RecordCreatedOn?: Date;
	ldv_requestername?: string;
	ExpiryDayinHijri?: number;
	createdonbehalfbyyominame?: string;
	ConsultingOfficeDecision?: number;
	ModifiedByDelegate?: string;
	CommentType?: number;
	OwningTeam?: string;
	ExpiryMonthinHijri?: number;
	Status?: number;
	IssuanceMonthinHijri?: number;
	TimeZoneRuleVersionNumber?: number;
	ldv_consultingofficename?: string;
	modifiedbyname?: string;
	NoteFromLastPermit?: string;
	TraversedPath?: string;
	createdonbehalfbyname?: string;
	ScopeOfWork?: string;
	UTCConversionTimeZoneCode?: number;
	ldv_contractorname?: string;
	Owner?: string;
	ModifiedOn?: Date;
	ImportSequenceNumber?: number;
	owneridyominame?: string;
	GregorianIssuanceDate?: Date;
	IssuanceDayinHijri?: number;
	ProcessId?: string;
	createdbyname?: string;
	RequestStatus?: string;
	modifiedonbehalfbyname?: string;
	StageId?: string;
	ldv_requeststatusname?: string;
	IssuanceYearinHijri?: number;
	CreatedBy?: string;
	ldv_industrialcityname?: string;
	ModifiedBy?: string;
	ldv_processidname?: string;
	createdbyyominame?: string;
	OwningUser?: string;
	OwningBusinessUnit?: string;
	ldv_bpfbuildinglicenserequestname?: string;
	ldv_requesteryominame?: string;
	RequestHeader?: string;
	ExpiryYearinHijri?: number;
	StatusReason?: number;
	modifiedonbehalfbyyominame?: string;
	CurrentTask?: string;
	ldv_servicesettingsidname?: string;
	ldv_accountname?: string;
	OfficeBiddingEnded?: number;
	ldv_currenttaskidname?: string;
	SLAFailIndustrialCityAdministrator?: boolean;
	ldv_oldlicensenumbername: string;
	ldv_licensenumbername: string;
	ldv_licensedurationname?: string;



	// Used
	Requester: EntityReferenceItem;
	RequesterId: string;

	LicenseType?: EntityReferenceItem;
	LicenseTypeId: string;

	ContractNumber: EntityReferenceItem;
	ContractNumberId: string;

	CR: EntityReferenceItem;
	CRId: string;

	OldLicenseNumber?: EntityReferenceItem;
	OldLicenseNumberId?: string;

	LicenseNumber?: EntityReferenceItem;
	LicenseNumberId?: string;

	IndustrialCity?: EntityReferenceItem;
	IndustrialCityId?: string;


	LicenseDuration?: EntityReferenceItem;
	LicenseDurationId?: string;

	RequestNumber?: string;
	ConstructionBudget?: number;
	FloorsNumber?: number;
	AdditionalRemarks?: string;
	ExpiryDateinHijri?: string;
	ModonComments?: string;
	IsSubmitted?: number;
	GregorianExpiryDate: DateModel;
	AmendType?: string[];
	//AmendType?: number[];




	Contacts: string[];
	ContractorDecision?: number;
	ContractorBiddingEnded?: number;



	// Office 
	OfficeorBidding?: number;
	ConsultingOffice: EntityReferenceItem;
	ConsultingOfficeId: string;
	OfficeBiddingDecision?: number;
	ConsultingOfficePriceOfferValue?: number;
	ConsultingOfficePriceOfferComment?: string;
	ActiveConsultingOfficeBidding: string;


	// Contractor
	ContractororBidding?: number;
	Contractor: EntityReferenceItem;
	ContractorId: string;
	ContractorBiddingDecision?: number;
	ContractorPriceOfferValue?: number;
	ContractorPriceOfferComment?: string;
	ActiveContractorBidding: string;

	CRName:string;



	constructor() {
		this.LicenseType = new EntityReferenceItem();
		this.OldLicenseNumber = new EntityReferenceItem();
		this.LicenseNumber = new EntityReferenceItem();
		this.LicenseDuration = new EntityReferenceItem();
	}

}

export enum LicenseTypesIds {
	Temp = "f6ee9df6-2469-ea11-a9eb-000d3a46f0d9",
	New = "59ab7cce-2369-ea11-a9eb-000d3a46f0d9",
	Renew = "f8962da0-2469-ea11-a9eb-000d3a46f0d9",
	Amend = "b069ac41-2469-ea11-a9eb-000d3a46f0d9",
	Extend = "c631822d-2569-ea11-a9eb-000d3a46f0d9",
}

export enum RequesterBiddingDecision {
	Rejectall = 100000000,
	Chooseconsultingoffice = 100000001
}

export enum ConsultingofficeDecision {
	Approve = 1,
	Reject = 2,
}

export enum CRMStatusCodeEnum {
	Draft = 1,
	PendingOnInvestor = 38,
	PendingConsultingOfficeDecision = 37,
	PendingConsultingOfficeBidding = 22,
	PendingSelectingOfferFromConsultingOffices = 41,
	PendingSelectingOfferFromContractors = 50,
	ConsultingOfficeSelected = 43,
	PendingContractorDecision = 40,
	PendingContractorBidding = 42,
	OfficeAndContractorSelected = 19,
	AutomaticShutDownDueToNonResponse = 34,
	Completed = 39
}

export enum ServiceTypeEnum {
	PlanApproval = 1,
	BuildingLicense = 2,
}

export enum AmendTypesEnum {
	// NA = 1,
	ConsultingOffice = 2,
	Contractor = 3,
	ConstrctionBudget = 4,
	TimetableDocument = 5
}

export enum CrTypeEnum {
	Investor = 1,
	ConsultingOffice = 6,
	Contractor = 7
}
