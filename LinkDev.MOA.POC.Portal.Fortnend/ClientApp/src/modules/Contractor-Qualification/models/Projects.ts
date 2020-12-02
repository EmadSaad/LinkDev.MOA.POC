import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export interface Projects
{
    ProjectName?:string;
    InvestorName?: string;
    ProjectDate?: DateModel;
    IsAdded?: boolean;
    IsDeleted?:boolean;
    IsUpdated?: boolean
}