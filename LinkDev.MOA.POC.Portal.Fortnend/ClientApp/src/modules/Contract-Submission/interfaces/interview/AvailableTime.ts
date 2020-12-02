import { DateTime } from "src/modules/shared/form-guide/models/date-time";
import { Guid } from "guid-typescript";

export interface AvailableTime {
    From?: DateTime;
    To?: DateTime;
    Resource?: string;
	Text?: string;
	Value?: string;
}
