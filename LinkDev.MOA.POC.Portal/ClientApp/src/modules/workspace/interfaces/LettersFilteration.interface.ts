import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class ILetterFiltration extends FiltrationBase {

    LetterNumber?: string;
    From?: DateModel;
    To?: DateModel;

}