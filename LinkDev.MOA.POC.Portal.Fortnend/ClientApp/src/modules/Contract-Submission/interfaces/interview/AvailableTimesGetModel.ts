import { Guid } from "guid-typescript";
import { DateTime } from "src/modules/shared/form-guide/models/date-time";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export interface AvailableTimesGetModel {
    RequestId?: string;
	FromDate?:DateModel;
	ToDate?:DateModel;
}
