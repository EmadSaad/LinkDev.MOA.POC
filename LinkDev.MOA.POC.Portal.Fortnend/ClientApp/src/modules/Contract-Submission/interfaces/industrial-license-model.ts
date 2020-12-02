import { ISICActivityModel } from "./ISICActivityModel";
import { ILProductsModel } from "./ILProductsModel";

export interface IndustrialLicenseModel {
    Status?: string;
    ILType?: string;
    IssueDate?: string;
    ExpiryDate?: string;
    FactoryNameinILFactory?: string;
    ILProducts?: string;
    ILSource?: string;
    City?: string;
  ISICActivityModelList?: ISICActivityModel[];
  _IlProducts?: ILProductsModel[];
}
