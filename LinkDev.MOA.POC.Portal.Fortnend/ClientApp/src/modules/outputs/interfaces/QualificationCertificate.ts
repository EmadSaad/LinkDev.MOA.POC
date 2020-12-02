import { Guid } from "guid-typescript";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";

export interface QualificationCertificateDetails {

	Id: Guid;
	
	CertificateNumber?: string;

	CertifiedAccount?: EntityReferenceItem;

	CertifiedAccountId?: Guid;

	CertificationStatus?: number;

	CertificateRegarding: number;
	CertificateRegardingString: string;
	
	Sector?: EntityReferenceItem;
	
	SectorId?: Guid;
	
	City?: EntityReferenceItem;
	
	CityId?: Guid;
	
	AvailableGeneralPlan?: number;
	
	AvailableGeneralBuildingLicenseProjects?: number;
	
	YearofConstruction?: string;
	
	SubscriptionNumber?: string;
	
	IssueDate?: DateModel;

	ExpiryDate?: DateModel;
	
	ChangeCategoryAbilityDate?: DateModel;
	
	CommentsonCertificate?: string;
	
	UsedDevicesDescription?: string;
	
	BranchName?: EntityReferenceItem;
	
	BranchNameId?: Guid;
	
	OfficeNameinEnglish?: string;
	
	OfficeOwnerName?: string;
	
	OfficeOwnerNameinEnglish?: string;
	
	ResponsibleName?: string;
	
	LicenseNumber?: string;

	LicenseExpiryDate?: DateModel;
	
	RatingCategory?: EntityReferenceItem;
	
	RatingCategoryId?: Guid;
	
	EvaluationResult?: number;
	
	TermsOfReference?: number[];
	
	
	
	
	CRBranch?: EntityReferenceItem;
	
	CRBranchId?: Guid;
	
	MainBranchGeneralCertificate?: EntityReferenceItem;
	
	MainBranchGeneralCertificateId?: Guid;
	
	MainBranchSafetyCertificate?: EntityReferenceItem;
	
	MainBranchSafetyCertificateId?: Guid;

	AccountCategory?: EntityReferenceItem;

	AccountCategoryId?: Guid;

	LandArea?: string;

	VersionNumber?: number;

	
	CurrentGeneralPlanApprovalProjects?: number;
	CurrentSafetyPlanApprovalProjects?: number;
	CurrentGeneralBuildingLicenseProjects?: number;
	CurrentSafetyBuildingLicenseProjects?: number;

	Privilege?: number[];

	IncreamentDecrement?: number;

	Status?: number;
	
	AvailableSafetyPlan?: number;
	ImportSequenceNumber?: number;
	AvailableSafetyBuildingLicenseProjects?: number;
	CanSubmitChangeCategoryRequest?: number;
	Comment?: string;
	
	StatusReason?: number;



	Documents: DocumentSettingModel[];
}
