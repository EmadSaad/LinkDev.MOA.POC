import { DateTime } from "src/modules/shared/form-guide/models/date-time";
import { PartnerModel } from "./partner-model";

export interface SAGIAModel {
    CompanyName?: string;
    CompanyActivity?: string;
    InvestmentSize?: string;
    IssueDate?: string;
    EndDate?: string
    PartnersList?: PartnerModel[];
}
