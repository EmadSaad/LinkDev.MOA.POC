import { QuoteLineModel } from "./QuoteLineModel";

export interface QuoteWithRelatedQuoteLines {
    QuoteNumber?: string;
    TotalAmount?: number;
    TotalVat?: number;
    TotalAmountBeforeVat?: number;
    QuoteLineModelsToShow?: QuoteLineModel[];
    CRName?: string;
    CRAddress?: string;
    CRPhone?: string;
    CRFax?: string;
    CRPOBox?: string;
    CRZIPCode?: string;
    LandArea?: string;
    ContactEmail?: string;
    LandAddress?: string;
	SadadNumber?: string;
    GregorianDate?: string;
    HijriDate?: string;
    FileId?: string;
}
