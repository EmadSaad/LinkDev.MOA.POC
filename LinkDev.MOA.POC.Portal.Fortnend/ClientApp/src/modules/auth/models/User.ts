
export interface IUserLogin {
  email?: string;
  password?: string;

}

export interface IUserData {
  userName:string;
  email:string;
  title :string;
  familyName :string;
  firstName :string;
  phoneNumber :string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  ChangePassword?: boolean;
  UserFullName?: string;
}

export interface IUserForgetPassword {
  email?: string;
}
export interface IUserChangePassword {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  captchaValue?: string;
  userName?: string;
}
export interface IUserResetPassword {
  token?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  captchaValue?: string;
}

