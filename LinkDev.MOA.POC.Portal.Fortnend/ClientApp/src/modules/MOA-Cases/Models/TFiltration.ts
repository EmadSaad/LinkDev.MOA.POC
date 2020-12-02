import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export class TFiltration {
    RequestNumber?: string;
    RequestType?: string;
    RequestStatus?: string[];
    From?: DateModel;
    To?: DateModel;
    ShowRating?: boolean;
    PageNumber?: number;
}
