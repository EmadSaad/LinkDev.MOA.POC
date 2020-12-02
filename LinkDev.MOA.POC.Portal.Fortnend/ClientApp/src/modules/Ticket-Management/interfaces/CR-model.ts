import { DateTime } from "src/modules/shared/form-guide/models/date-time";
import { CROwnerModel } from "./CR-owner-model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export interface CRModel {
    CRType?: string;
    CRNumber?: string;
    IssueDate?: DateModel;
    ExpiryDate?: DateModel;
    IssuanceCity?: string;
    CRName?: string;
    CRActivity?: string;
    CROwners?: CROwnerModel[];
}
