import { Transaction } from "./transaction";

export interface ContractStatement {
    ERPBalance: string;
    FileNumber: string;
    Transactions: Transaction[];

}
