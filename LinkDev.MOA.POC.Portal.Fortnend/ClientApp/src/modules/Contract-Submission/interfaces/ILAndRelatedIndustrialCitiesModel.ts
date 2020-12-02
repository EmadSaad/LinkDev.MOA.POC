import { IndustrialLicenseModel } from "./industrial-license-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";

export interface ILAndRelatedIndustrialCitiesModel {
    IndustrialLicense?: IndustrialLicenseModel;
    IndustrialCities?: RetrieveOptionsRequest[];
}
