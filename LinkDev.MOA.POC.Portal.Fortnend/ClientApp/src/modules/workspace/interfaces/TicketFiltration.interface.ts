import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class ITicketFiltration extends FiltrationBase {
  ticketNumber: string;
  RequestType?: string;
  RequestStatus?: string[];
  From?: DateModel;
  To?: DateModel;
  ShowRating?: boolean;
}
