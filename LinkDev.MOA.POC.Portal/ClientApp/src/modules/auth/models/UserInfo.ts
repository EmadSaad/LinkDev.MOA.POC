import { DateModel } from "../../shared/form-guide/models/date-model";

export class UserInfo {
  FullName?: string;
  FirstName?: string;
  SecondName?: string;
  ThirdName?: string;
  FourthName?: string;
  Email?: string;
  PhoneNumber?: number;
  MobileNumber?: number;
  Fax?: string;
  IdentityIssueDate?: string;
  IdentityTypeId?: string;
  IdentityTypeIdNames?: TypeOfIdentityEnum;

  IdentityNumber?: string;
  Password?: string;
  UserId?: string;

  IdentityExpiryDateInhijriDays?: number;
  IdentityExpiryDateInhijriMonth?: number;
  IdentityExpiryDateInhijriYear?: number;
  IdentityExpiryDateinhijri?: DateModel;
  captchaValue?: string ;
}

enum TypeOfIdentityEnum {
  National_ID = 1,
  Residency = 2,
  Passport = 3,
  GCC = 4
}

