import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class IBiddingsFiltration extends FiltrationBase {
    BiddingType?: number;
    BiddingNumber?: string;
    From?: DateModel;
    To?: DateModel;
}