import { Guid } from "guid-typescript";
import { ContactDetails } from "./contact-details";
import { Product } from "./product";
import { RawMaterial } from "./raw-material";
import { Equipment } from "./equipment";
import { Factory } from "./factory";
import { ImportingDetails } from "./importing-details";

export class ContractSubmissionModel {
    //#region stage 1
    ProductMainFamilyId?: string;
    ProductSubFamilyId?: string;
    ProductId?: string;
    RequestReason?: number;
    CRId?: Guid;
    Contacts?: Guid[];
    ILId?: Guid;
    IndustrialCityCode?: string;
    SAGIANumber?: string;
    IsAuthorizedSignatory?: boolean
    AuthorizedSignatoryName?: string;
    AuthorizedSignatoryMobile?: string;
    AuthorizedSignatoryID?: string;
    AuthorizedSignatoryIDExpiry? :string;
    AuthorizedSignatoryTitle?: string;
    IsElectronicAuthorizedSignatory?: boolean;
    AuthorizationLetterDate?: string;
    AuthorizationLetterNumber?: string;
    AuthorizedSignatoryE_transaction?: string;
    AuthorizedSignatoryE_subscription?: string;
    //#endregion
    //#region stage 2
    IndustryType? : number;
    IndustryMethodology? : number;
    ManufacturingDescription?: string;
    ProductsDetails?: Product[];
    RawMaterialsDetails?: RawMaterial[];
    ManufacturingTechnology?: number[];
    EquipmentDetails?: Equipment[];
    IsConsumersAgreement?: boolean;
    ConsumersAgreementInfo?: string;
    HasTechPartnership?: boolean;
    TechPartnerInfo?: string;
    //#endregion
    //#region stage 3
    IsInternalproduction?: boolean;
    ProductionCityId?: Guid;
    InternalDistributors?: string;
    IsExporting?: boolean;
    ExportingCountries?: number[];
    ExportingPercentage?: number;
    IsRelatedToIndustry?: boolean;
    RelatedIndustriesInfo?: string;
    //#endregion
    //#region stage 4
    InvestmentAmountValue?: number;
    ConstructionAmountValue?: number;
    EquipmentAmountValue?: number;
    get TotalInvestmentAmount(): number {
        return (this.InvestmentAmountValue ? Number(this.InvestmentAmountValue): 0)+
        (this.ConstructionAmountValue ? Number(this. ConstructionAmountValue): 0)+
        (this.EquipmentAmountValue ? Number(this.EquipmentAmountValue): 0);
    }
    FundingSources?: number[];
    SelfFundingPercentage?:number;
    SDBPercentage?: number;
    LendingBankPercentage?: number;
    BanksPercentage?: number;
    OtherFundingPercentage?: number;
    OtherSources?: string;
    IsExtraFunding?: boolean;
    TechnicianNumber?: string;
    AdministratorsNumber?: string;
    EngineersNumbers?: string;
    OperatorsNumber?: string;
    get TotalManPower(): number {
        debugger;
        return (this.TechnicianNumber ? Number(this.TechnicianNumber): 0)+
        (this.AdministratorsNumber ? Number(this. AdministratorsNumber): 0)+
        (this.EngineersNumbers ? Number(this. EngineersNumbers): 0)+
        (this.OperatorsNumber ? Number(this.OperatorsNumber): 0);
    }
    SaudiTechnicianNumber? : string;
    SaudiAdministratorsNumber?: string;
    SaudiEngineersNumbers?: string;
    SaudiOperatorsNumber?: string;
    get SaudiTotalManPower(): number {
        debugger;
        return (this.SaudiTechnicianNumber ? Number(this.SaudiTechnicianNumber): 0)+
        (this.SaudiAdministratorsNumber ? Number(this. SaudiAdministratorsNumber): 0)+
        (this.SaudiEngineersNumbers ? Number(this. SaudiEngineersNumbers): 0)+
        (this.SaudiOperatorsNumber ? Number(this.SaudiOperatorsNumber): 0);
    }
    //#endregion
    //#region stage 5
    HaveOtherFactories? : boolean;
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
    get TotalRequestedArea(): number{
        return Math.floor(((this.RequestedAreaWithSetbacks ? Number(this.RequestedAreaWithSetbacks): 0)+
        (this.RawMaterialWarehouseArea ? Number(this. RawMaterialWarehouseArea): 0)+
        (this.FinalProductWarehouseArea ? Number(this. FinalProductWarehouseArea): 0)+
        (this.ProductionArea ? Number(this. ProductionArea): 0)+
        (this.ServicesArea ? Number(this.ServicesArea): 0))/ Number(0.6));
    }
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
    IsForeignInvestor?: boolean;
    HavePrevProjects?: boolean;
    RequestedAreaNumber?: number;
    //#endregion
    //#region Logistic
    IsSelfFunding?: boolean;
    NumberOfDailyShipments?: number;
    ImportingDetails?: ImportingDetails[];
    YearlyStoringAmount? : number;
    IsImporting?: boolean;
    //#endregion
}
