
export class CRindustrialLicenses {
  ILNumber?: string;
  ILName?: string;
  ILType?: string;
  ILExpirydate?: string;
  IsDeleted?: boolean = false;
  ILIssuedate?: string;
  ILFactoryName?: string;
  ILSource?: string;
  ILCity?: string;
  ResponseMsg?: string;
  DetailsURL?: string;
  Id?: string;
  ILISICActivities?: Array<ILISICActivities>;
  IlProducts?: Array<ILProducts>;
}

export class ILISICActivities {
  Division?: string;
  Class?: string;
  Activity?: string;
  ISICactivityID?: string;
  ISICCode?: string

}

export class ILProducts {
  Id?: string;
  Name?: string
}

export enum ILTypes {
  Intial = 1,
  Final = 2,
}

