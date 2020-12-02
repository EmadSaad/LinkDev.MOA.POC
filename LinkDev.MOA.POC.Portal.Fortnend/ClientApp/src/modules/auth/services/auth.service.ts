import { Injectable } from '@angular/core';
import { UserInfo } from '../models/UserInfo';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserForgetPassword, IUserLogin, IUserResetPassword, IUserChangePassword } from '../models/User';
import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
import { APIService } from '../../shared/Services/API-Service/api-service.service';
import { TokenService } from '../../shared/services/token.service';
import { ConfigService } from '../../shared/Services/Config-Service/config-service.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'token';
  private logoutURL = "api/Logout";
  private GetURLIAM = 'api/ProfileManagement/IAMLogin';
  private getCompleteProfileUrl = 'api/ProfileManagement/GetCompleteProfile';
  private postCompleteProfileUrl = 'api/ProfileManagement/SubmitCompleteProfile';
  private forgetPasswordUrl = ConfigService.APIURL + 'api/ProfileManagement/ForgotPassword';
  private ResetPasswordUrl = 'api/ProfileManagement/ResetPassword';
  private VerifyPasswordTokenUrl = ConfigService.APIURL + 'api/ProfileManagement/VerifyPasswordToken'
  private ChangePasswordURL = 'api/ProfileManagement/ChangePassword'
  constructor(private httpCustomService: APIService,
    public tokenService: TokenService, private http: HttpClient, private translate: TranslateService) {
  }

  Token(user: IUserLogin): Observable<any> {
    const body = new HttpParams()
      .set('userName', user.email)
      .set('password', user.password)
      .set('grant_type', "password");
    return this.httpCustomService.Post<string>(this.loginUrl, body);
  }
  logOut(): Observable<any> {
    return this.httpCustomService.Get(this.logoutURL);
  }
  getIamURL(): Observable<string> {
    return this.httpCustomService.Get<string>(this.GetURLIAM);
  }

  getCompleteProfile(params?: string): Observable<ApiGenericResponse<UserInfo>> {
    return this.httpCustomService.Get<ApiGenericResponse<UserInfo>>(`${this.getCompleteProfileUrl}?${params}`);
  }

  postCompleteProfile(application: UserInfo, recaptchaToken: string): Observable<ApiGenericResponse<UserInfo>> {
    return this.http.post<ApiGenericResponse<UserInfo>>(ConfigService.APIURL + this.postCompleteProfileUrl, application, this.CreateRequestHeader(recaptchaToken));
  }

  ForgetPassword(Email: String, recaptchaToken: string): Observable<ApiGenericResponse<string>> {
    return this.http.get<ApiGenericResponse<string>>(`${this.forgetPasswordUrl}?${Email}`, this.CreateRequestHeader(recaptchaToken));
  }

  verifyResetPasswordToken(token: string): Observable<ApiGenericResponse<string>> {
    return this.http.get<ApiGenericResponse<string>>(this.VerifyPasswordTokenUrl + '?token=' + token, this.CreateRequestHeader(""));
  }

  ResetPassword(user: IUserResetPassword, recaptchaToken: string): Observable<ApiGenericResponse<string>> {
    return this.http.post<ApiGenericResponse<string>>(ConfigService.APIURL + this.ResetPasswordUrl, user, this.CreateRequestHeader(recaptchaToken));
  }

  ChangePassword(application: IUserChangePassword, recaptchaToken: string): Observable<ApiGenericResponse<string>> {
    return this.http.post<ApiGenericResponse<string>>(ConfigService.APIURL + this.ChangePasswordURL, application, this.CreateRequestHeader(recaptchaToken));
    //return this.httpCustomService.Post<ApiGenericResponse<string>>(this.ChangePasswordURL, application);
  }




  private CreateRequestHeader(recaptchaToken: string) {
    var headers = new HttpHeaders({
      'recaptchaValue': recaptchaToken,
      'Accept-Language': this.translate.currentLang,
      'Content-type': "application/json",
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    });

    var httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

}
