import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { DateTime } from "src/modules/shared/form-guide/models/date-time";

export interface InterviewParameter {
    ContractSubmissionID?: string
    ResourceID?: string
	From?: DateTime
	To?: DateTime
    _InterviewDecision?: InterviewDecision
    Comment?: string;
}

export enum InterviewDecision {
    Reservation=1,
    postpon=2,
    Cancellation=3
}
