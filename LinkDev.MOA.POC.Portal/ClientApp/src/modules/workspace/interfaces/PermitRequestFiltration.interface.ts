import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class IPermitRequestFiltration extends FiltrationBase {

    PermitRequestNumber?: string;
    From?: DateModel;
    To?: DateModel;

}