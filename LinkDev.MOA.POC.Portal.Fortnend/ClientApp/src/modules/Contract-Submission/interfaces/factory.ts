import { Guid } from "guid-typescript";

export interface Factory {
    Location?: number;
    FactoryCode?: string;
    ArabicName?: string;
    EnglishName?: string;
    Address?: string;
    MainActivity?: string;
    FactoryStatus?: string;
    ContractNumberId?: Guid;
    IsDeleted?: boolean;
}
