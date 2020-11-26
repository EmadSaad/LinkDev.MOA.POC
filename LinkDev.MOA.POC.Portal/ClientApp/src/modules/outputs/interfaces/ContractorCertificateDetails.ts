import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";

export interface ContractorCertificateDetails {
    Id?:string;
    QualificationtNumber?:string;
    ContractorEnglishName?:string;
    ContractorArabicName?:string;
    MainBranchAddress?:string;
    Note?:string;
    CertificateType:ldv_certificatetype;
    CertificateStatus:ldv_certificatestatus;
    IssuedDate:DateModel;
    ExpiryDate:DateModel;

    CR: EntityReferenceItem;
    CRId:string;
    City: EntityReferenceItem;
    CityId:string;
    ContractorRating: EntityReferenceItem;
    ContractorRatingId:string;

    Documents: DocumentSettingModel[];
}

export enum ldv_certificatestatus{
    Active = 1,
    Suspended = 2,
    Expired = 3
}
export enum ldv_certificatetype{
    Buildings = 1,
    Safety = 2
   
}
