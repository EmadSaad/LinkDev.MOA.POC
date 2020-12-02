import { Guid } from "guid-typescript";

export class CRsInfo {
  CRName?: string;
  CrNumber?: string;
  Id?: string;
  CRIssuedate?: string;
  CRExpirydate?: string;
  CRTypeName?: string;
  CRTypeValue?: string;
  Relationshiptype?: string;
  ContactId?: string;
  CRId?: string;
  CrAddress?: string;
  AccountAddress?: string;
  CrEmail?: string;
  CrWebsite?: string;
  CrPostalCode?: string;
  CrPhone?: string;
  AccountPhone?: string;
  CrFax?: string;
  CrPoBox?: string;
  CrCity?: string;
  CrActivity?: string;
  IsDeleted?: boolean = false;
  IsUpdated?: boolean = false;
  IsResponsefail?: boolean;
  ResponseMsg?: string;
  IsAdded?: boolean = false;
  Index?: string;
  Issuedatehijri?: string;
  Expirydatehijri?: string;
  Issuedatehijriday?: string;
  Issuedatehijrimonth?: string;
  Issuedatehijriyear?: string;
  Expirydatehijriindays?: string;
  Expirydatehijriinmonths?: string;
  Expirydatehijriinyears?: string;
  UnitNumber?: string;
  AdditionalSymbol?: string;
  FromIntegeration?: string;
  ISThereIsRequestsOnCR?: string;
  LegalType?: string;
  ISICActivities?: Array<ILISICActivities>
}

export class ILISICActivities {
  Division?: string;
  Class?: string;
  Activity?: string;
  ISICactivityID?: string;
  ISICCode?: string
}


