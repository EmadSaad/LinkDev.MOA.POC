export interface Transaction {
    transactionNumber: string;
    transactionType: string;
    Amount: string;
	RunningAmount: string;
	PaidAmount: string;
    effectiveDate: string;
    invoiceStartDate: string;
    invoiceEndDate: string;
    effectiveDateHijri: string;
    invoiceStartDateHijri: string;
    invoiceEndDateHijri: string;
    transactionTypeDesc: string;
    IsDeleted: boolean;
}
