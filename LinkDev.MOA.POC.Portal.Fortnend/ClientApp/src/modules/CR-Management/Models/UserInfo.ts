
export class UserInfo {
  FirstName?: string;
  SecondName?: string;
  ThirdName?: string;
  FourthName?: string;
  FullName?: string
  Email?: string;
  PhoneNumber?: number;
  IdentityTypeId?: string;
  IdentityNumber?: string;
  CrId?: string;
  CRRelationId?: string;
  Id?: string;
  IsDeleted?: boolean = false;
  IsUpdated?: boolean = false;
  IsResponseFailed?: boolean;
  ResponseMsg?: string;
  IsAdded?: boolean = false;
  Index?: string;
  Existing?: boolean = false;
  IsCROwner?: boolean = false;
}
