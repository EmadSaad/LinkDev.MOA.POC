import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class IRequestFiltration extends FiltrationBase {
  RequestNumber?: string;
  RequestType?: string;
  RequestStatus?: string[];
  From?: DateModel;
  To?: DateModel;
  ShowRating?: boolean;
}
