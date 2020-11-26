import { CRModel } from "./CR-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";

export interface CRAndRelatedILsModel {
    CR?: CRModel;
    ILs?: RetrieveOptionsRequest[];
}
