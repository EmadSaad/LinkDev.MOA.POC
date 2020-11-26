import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class IQualificationFiltration extends FiltrationBase{
    QualificationNumber?:string;
    QualificationType?:string;
    From?: DateModel;
    To?: DateModel;
}
