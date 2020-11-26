export enum Language {
  ar = 1025,
  en = 1033,
  fr = 1036
}

export enum AcceptLanguageHeader {
  "ar-sa" = 1025,
  "en-us" = 1033,
  "fr-fr" = 1036

}

export enum Mode {
  None = 0,
  InProgress = 1,
  Success = 2,
  Error = 3,
  Warning = 4,
  Empty = 5
}

export enum LoginStatus {
  Success = 1,
  WrongEmailOrPassword = 2,
  AccountLocked = 3,
  AccountNotActivated = 4,
  InvalidRecaptchaToken = 5,
  ExpiredToken = 6,
  RequireOTP = 7,
  AccountDeleted = 8,
  RepresentativeNotActivated = 9
}

export enum ChangePasswordStatus {
  Success = 1,
  InvalidOldPassword = 2,
  InvalidRecaptchaToken = 3,
  Error = 4
}

export enum ForgetPasswordStatus {
  Success = 1,
  InvalidRecaptchaToken = 2,
  EmailNotFound = 3,
  AccountLocked = 4,
  AccountNotActivated = 5
}

export enum ResetPasswordStatus {
  Success = 1,
  InvalidRecaptchaToken = 2,
  InvalidToken = 3,
  ExpiredToken = 4,
  ErrorHappened = 5
}

export enum ValidateForgetPasswordStatus {
  Valid = 1,
  NotFound = 2,
  Expired = 3
}

export enum DeleteProductStatus {
  Success = 1,
  NotFound = 2,
  Error = 3
}
