
import { CROwnerModel } from "./CR-owner-model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { ISICActivityModel } from "./ISICActivityModel";

export interface CRModel {
  CRType?: string;
  CRNumber?: string;
  IssueDate?: DateModel;
  ExpiryDate?: DateModel;
  ReadOnlyIssueDate?: string;
  ReadOnlyExpiryDate?: string;
  IssuanceCity?: string;
  CRName?: string;
  CRActivity?: string;
  CROwners?: CROwnerModel[];
  ISICActivities?: Array<ISICActivityModel>
}
