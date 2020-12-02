import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { StringMapWithRename } from "@angular/core/src/render3/jit/compiler_facade_interface";


export class DrillingPermitOutputModel {
    Id?: string;
    CRName: EntityReferenceItem;
    IndustrialCity: EntityReferenceItem;
    IndustrialCityId?: string;
    Contacts: string[];
    RequesterId?: string;
    CRNameId?: string;
    ContractNumber: EntityReferenceItem;
    Requester: EntityReferenceItem;
    DrillingPermitType: EntityReferenceItem;
    DesignorContractWithInvestor?: number;
    DrillingMethod?: number;
    DrillingType?: number;
    DesignNumber?: number;
    DrillingPermitTypeId?: string;
    ContractNumberId?: string;
    Other?: string;
    ModonNotesOnTheRequest?: string;
    WorkDescription?: string;
    WorkDimensionsHeightm?: number;
    WorkDimensionsWidthm?: number;
    WorkDimensionLengthm?: number;
    ProjectManaggerMail?: string;
    SupervisingDestination?: string;
    ProjectManagerContactNumber?: string;
    ProjectManagerName?: string;
    WorkOverallLength?: number;
    DrillingPermitStartingDateInhijriDays?: number;
    DrillingPermitStartingDateInhijriMonth?: number;
    DrillingPermitStartingDateInhijriYear?: number;
    DrillingPermitStartingDateinhijri?: DateModel;
    DrillingPermitEndingDateInhijriDays?: number;
    DrillingPermitEndingDateInhijriMonth?: number;
    DrillingPermitEndingDateInhijriYear?: number;
    DrillingPermitEndingDateinhijri?: DateModel;
    ContractNumberString?: string;
    WorkLocation?: string;
    CoordinationDestination :number[];

}
