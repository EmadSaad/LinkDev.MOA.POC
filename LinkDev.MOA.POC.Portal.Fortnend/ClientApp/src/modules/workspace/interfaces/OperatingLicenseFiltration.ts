import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { FiltrationBase } from "./filtration-base";

export class IOperatingLicenseFiltration extends FiltrationBase {
    LicenseNumber?: string;
    From?: DateModel;
    To?: DateModel;
  }