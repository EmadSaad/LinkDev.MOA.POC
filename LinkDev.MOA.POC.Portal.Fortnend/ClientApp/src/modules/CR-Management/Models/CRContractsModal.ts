import { CRContactDetails } from "./CRContactDetails";

export class CRContractsModal {
  Name?: string;
  DurationInYears?: string;
  StartDate?: string;
  EndDate?: string;
  Id?: string;
  IsDeleted?: boolean;
  IsUpdated?: boolean;
  ContactDetailsValue?: string;
  ContactDetailsList?: Array<CRContactDetails>
}

