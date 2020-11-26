import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class IContractFiltration extends FiltrationBase {
  MainType?: string;
  From?: DateModel;
  To?: DateModel;
}
