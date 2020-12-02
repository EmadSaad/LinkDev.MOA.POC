import { EntityReferenceItem } from "src/modules/shared/Models/EntityReferenceItem.model";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { StringMapWithRename } from "@angular/core/src/render3/jit/compiler_facade_interface";


export class DrillingModal {
    Id?: string;
    CRName: EntityReferenceItem;
    IndustrialCity: EntityReferenceItem;
    IndustrialCityId?: string;
    Contacts: string[];
    RequesterId?: string;
    CRNameId?: string;
    OlddrilingPermitId?: string;
    ContractNumber: EntityReferenceItem;
    Requester: EntityReferenceItem;
    DrillingPermitType: EntityReferenceItem;
    OlddrilingPermit: EntityReferenceItem;
    DesignorContractWithInvestor?: number;
    DrillingMethod?: number;
    DrillingType?: number;
    DesignNumber?: number;
    DrillingPermitTypeId?: string;
    ContractNumberId?: string;
    hijristartdate?: string;
    hijrienddate?: string;
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
    IsSubmitted: boolean;
    DrillingPermitStartingDateInhijriDays?: number;
    DrillingPermitStartingDateInhijriMonth?: number;
    DrillingPermitStartingDateInhijriYear?: number;
    DrillingPermitStartingDateinhijri?: DateModel;
    DrillingPermitEndingDateInhijriDays?: number;
    DrillingPermitEndingDateInhijriMonth?: number;
    DrillingPermitEndingDateInhijriYear?: number;
    DrillingPermitEndingDateinhijri?: DateModel;
    //PermitStartingDate: DateModel;
   // PermitEndingDate: DateModel;
    ContractNumberString?: string;
    RequestType?: number;
    WorkLocation?: string;
    CoordinationDestination :number[];


}
