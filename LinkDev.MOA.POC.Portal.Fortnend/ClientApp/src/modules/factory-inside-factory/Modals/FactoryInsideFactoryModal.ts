import { DateModel } from "../../shared/form-guide/models/date-model";

export class FactoryInsideFactoryModal {
  ContractNumber: string;
  Requester: string;
  CR: string;
  SecondCR: string;
 //IL: string;
  SecondIL: string;
  EstablishingContractDateInhijriDays?: number;
  EstablishingContractDateInhijriMonth?: number;
  EstablishingContractDateInhijriYear?: number;
  EstablishingContractDateInhijri?: DateModel;
  EstablishingContractNumber: string;
  SharePercentage: number;
}
