import { ContactDetails } from "./contact-details";
import { Product } from "./product";
import { RawMaterial } from "./raw-material";
import { Equipment } from "./equipment";
import { Factory } from "./factory";
import { ImportingDetails } from "./importing-details";
import { DateModel } from "src/modules/shared/form-guide/models/date-model";

export class ContractSubmissionModel {
    Id?:string;
    //#region stage 1
    ProductMainFamilyId?: string;
    ProductSubFamilyId?: string;
    ProductId?: string;
    RequestReason?: number;
    CRId?: string;
    OldContractId?: string;
    Contacts?: string[];
    HasIl?:string;
    ILId?: string;
    IndustrialCityCode?: string;
    SAGIANumber?: string;
    IsAuthorizedSignatory?: string
    DelegatorId?: string;
    ModonProducts?: string[];
    //#endregion
    //#region stage 2
    IndustryType? : number;
    IndustryMethodology? : number;
    ManufacturingDescription?: string;
    ProductsDetails?: Product[];
    RawMaterialsDetails?: RawMaterial[];
    ManufacturingTechnology?: string[];
    EquipmentDetails?: Equipment[];
    IsConsumersAgreement?: string;
    ConsumersAgreementInfo?: string;
    HasTechPartnership?: string;
    TechPartnerInfo?: string;
    //#endregion
    //#region stage 3
    IsInternalproduction?: string;
    ProductionCityId?: string;
    InternalDistributors?: string;
    IsExporting?: string;
    ExportingCountries?: number[];
    ExportingPercentage?: number;
    IsRelatedToIndustry?: string;
    RelatedIndustriesInfo?: string;
    //#endregion
    //#region stage 4
    InvestmentAmountValue?: number;
    ConstructionAmountValue?: number;
    EquipmentAmountValue?: number;
    FundingSources?: string[];
    SelfFundingPercentage?:number;
    SDBPercentage?: number;
    LendingBankPercentage?: number;
    BanksPercentage?: number;
    OtherFundingPercentage?: number;
    OtherSources?: string;
    IsExtraFunding?: string;
    TechnicianNumber?: string;
    AdministratorsNumber?: string;
    EngineersNumbers?: string;
    OperatorsNumber?: string;
    SaudiTechnicianNumber? : string;
    SaudiAdministratorsNumber?: string;
    SaudiEngineersNumbers?: string;
    SaudiOperatorsNumber?: string;
    //#endregion
    //#region stage 5
    HaveOtherFactories? : string;
    Factories?: Factory[];
    CompanyBio?: string;
    //#endregion
    //#region stage 6 Artificial
    RequestedAreaWithoutSetbacks?: number;
    RequestedAreaWithSetbacks?: number;
    RequestedSetbacksArea?: number;
    RawMaterialWarehouseArea?: number;
    FinalProductWarehouseArea?: number;
    ProductionArea?: number;
    ServicesArea?: number;
    ElectricalLoadsWatt? : number;
    NeededIndustrialWater?: number;
    NeededPureWater?: number;
    NeededSewage?: number;
    NeededGas?: number
    //#endregion
    //#region stage 6 Ready units
    NumberOfUnits?: number;
    RequestedArea?: number;
    //#endregion
    //#region service
    IsForeignInvestor?: string;
    HavePrevProjects?: string;
    RequestedAreaNumber?: number;
    //#endregion
    //#region Logistic
    IsSelfFunding?: string;
    NumberOfDailyShipments?: number;
    ImportingDetails?: ImportingDetails[];
    YearlyStoringAmount? : number;
    IsImporting?: string;
    ExportingAmount?: number;
    //#endregion
}
