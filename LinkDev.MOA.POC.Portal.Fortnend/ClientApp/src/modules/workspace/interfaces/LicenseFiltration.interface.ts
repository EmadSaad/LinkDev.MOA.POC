import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { FiltrationBase } from './filtration-base';

export class ILicenseFiltration extends FiltrationBase {

    LicenseNumber?: string;
    From?: DateModel;
    To?: DateModel;

}