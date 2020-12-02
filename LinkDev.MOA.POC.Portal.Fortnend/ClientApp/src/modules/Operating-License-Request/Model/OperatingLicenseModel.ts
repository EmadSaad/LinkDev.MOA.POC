import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { AddedContractsModel } from "./AddedContractsModel";

export class OperatingLicenseModel {
	LicenceStartDate?: DateModel;
	IsImmediate?: boolean;
	AccountPhone?: string;
	CR: EntityReferenceItem;
	CRId: string;
	Id: string;
	OperatingLicensesApplication: EntityReferenceItem;
	OperatingLicensesApplicationId: string;
	BuildingLicenseNumber: EntityReferenceItem;
	BuildingLicenseNumberId: string;
	LicenseDurationInMonths?: number;
	Investor: EntityReferenceItem;
	InvestorId: string;
	PostalCode?: string;
	POBox?: string;
	ContractNumber: EntityReferenceItem;
	ContractNumberId: string;
	LicenseNumber?: string;
	LicenceExpiryDate?: DateModel;
	CRType?: string;
	LicenseType: EntityReferenceItem;
	LicenseTypeId: string;
	Fax?: string;
	LicenseDuration: EntityReferenceItem;
	LicenseDurationId: string;
	Contacts: string[];
	CRName?: string;
	LicenseTypeNameEN?: string;
	LicenseTypeNameAR?: string;
	IndustrialCity: EntityReferenceItem;
	IndustrialCityId: string;
	AddedContracts:AddedContractsModel[];
	Documents:DocumentSettingModel[];
}