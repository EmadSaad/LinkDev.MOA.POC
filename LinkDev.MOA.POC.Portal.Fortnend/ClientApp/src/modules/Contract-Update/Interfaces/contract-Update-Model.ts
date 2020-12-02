import { OldCRContract } from "../../shared/Common/old-cr-and-contract/interfaces/contractId-CRId-model";

export class ContractUpdateModel implements OldCRContract {
  Id?: string;
  Requester?: string;
  CRId?: string;
  ContractId?: string;
  UpdateType_?: string;
  UpdateReason?: string;
  HasIl?: boolean;
  NewCRId?: string;
  NewILId?: string;
  CRVersionId?: string;
  ILVersionId?: string;
  UpdateCurrentCRIL?: boolean;
  Products?: string[];
  ProductSubFamilyId?: string
  ContactDetails?: string[];
}

export enum UpdateTypes {
  UpdateArea = 1,
  UpdateILCR = 2
}
