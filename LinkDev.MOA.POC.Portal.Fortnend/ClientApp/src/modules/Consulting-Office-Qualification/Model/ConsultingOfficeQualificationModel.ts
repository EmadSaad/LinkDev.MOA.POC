import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { Guid } from "guid-typescript";
import { CRContactDetails } from "src/modules/CR-Management/Models/CRContactDetails";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { QualificationCertificateModel } from "./QualificationCertificateModel";

export class ConsultingOfficeQualificationModel {

	Id: Guid;

	RequestNumber?: string;

	QualificationType?: EntityReferenceItem;

	QualificationTypeId?: Guid;

	CRNumber?: EntityReferenceItem;

	CRNumberId?: Guid;

	OldQualificationCertificate?: EntityReferenceItem;
	
	OldQualificationCertificateId?: Guid;

	NewBranchName?: string;

	BranchToBeRenewed?: EntityReferenceItem;

	BranchToBeRenewedId?: Guid;

	OfficeNameinEnglish?: string;

	OfficeOwnerName?: string;

	OfficeOwnerNameinEnglish?: string;

	ResponsibleName?: string;

	LicenseNumber?: string;

	LicenseExpiryDate?: DateModel;

	Sector?: EntityReferenceItem;

	SectorId?: Guid;

	City?: EntityReferenceItem;

	CityId?: Guid;

	YearofConstruction?: string;

	TermsofReference?: number[];

	CommentsonCertificate?: string;

	CommentsfromLastCertificate?: string;

	SubscriptionNumber?: string;

	GOSIRegistrationIndicator?: string;

	UsedDevicesDescription?: string;

	ContactDetails:CRContactDetails[];

	Evaluation?: EntityReferenceItem;

	EvaluationId?: Guid;

	EvaluationResult?: number;

	RatingCategory?: EntityReferenceItem;

	RatingCategoryId?: Guid;


	CRBranch?: EntityReferenceItem;

	CRBranchIId?: Guid;



	Process?: EntityReferenceItem;

	ProcessId?: Guid;

	VersionNumber?: number;
	ldv_crsourcename?: string;
	Comments?: string;
	OfficeNameinArabic?: string;
	CRCategory?: string;
	ldv_certificatename?: string;
	ldv_cityname?: string;
	SocialInsuranceSubscriptionNumber?: string;
	ldv_mainbranchname?: string;
	Status?: number;
	RequestHeaderId?: string;
	ExpiryDate?: DateModel;
	ldv_portalrequeststatusname?: string;
	ldv_nameaccordingtocryominame?: string;
	NameAccordingtoCR?: string;
	ldv_crexpirydatename?: string;
	ChangeCategoryAbilityDate?: DateModel;
	CRSource?: string;
	Owner?: string;
	ImportSequenceNumber?: number;


	ldv_crexpirydateyominame?: string;
	IsPaid?: number;
	ldv_crcategoryname?: string;
	RequestStatus?: string;
	IsSubmit?: number;
	StageId?: string;
	ldv_requeststatusname?: string;
	CRExpiryDate?: string;
	ldv_ratingcategoryname?: string;
	ldv_processidname?: string;
	OwningUser?: string;
	CertificateExpiryDate?: DateModel;
	HasPayment?: number;
	CRIssuanceDate?: string;
	ldv_nameaccordingtocrname?: string;
	PortalRequestStatus?: string;
	StatusReason?: number;
	ldv_servicesettingsidname?: string;
	ldv_crbranchname?: string;
	ldv_crnumberyominame?: string;
	MainBranch?: string;
	AdminDecision?: number;
	Certificate?: string;


	Contacts: string[];
	GeneratedCertificate:QualificationCertificateModel;
}


export enum CRMStatusCodeEnum {
	Draft = 1,
	apologyfortherequest = 85,
	PendingImplementation = 36,
	PendingonOfficeToPay = 51,
	Completed=39,
	PendingOnOfficetoCompleteInformation=70
	
}

export class ConsultingOfficeQualificationValidation{
	IsValid: boolean;
	Message:string;
}


export enum QualificationTypeCodeEnum {
	NewOfficeQualificationRequestServiceCode=100,
    RenewMainBranchQualificationServiceCode=101,
    ChangeQualificationClassificationServiceCode=102,
    SafteyQualificationServiceCode=103,
    RenewSafetyQualifiactionServiceCode=104,
    AddBranchServiceCode=105,
    RenewBranchQualificationServiceCode=107
}