import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenService } from 'src/modules/shared/services/token.service';
import { UserInfo } from '../../models/UserInfo';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { AuthService } from '../../services/auth.service';
import { IUserLogin } from '../../models/User';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  //Props
  confirmationPassword: string;
  public emailValidationPattern: string;
  public mobileValidationPattern: string;
  public PhoneValidationPattern: string;
  public arabicValidationPattern: string;
  public numberValidationPattern: string;
  public passwordValidationPattern: string;
  public UserLogin = <IUserLogin>{};

  public MobileDisabled: boolean = false;
  public FullNmaeDisabled: boolean = false;
  public IdentityIssueDateDisabled: boolean = false;
  public EmailDisabled: boolean = false;
  public IdentityNumberDisabled: boolean = false;
  public PhoneNumberDisabled: boolean = false;

  // checkbox
  public checked: boolean = true;
  public Application: UserInfo = {};
  public isSubmitted: boolean = false;
  public IsIdentityExpiryDateHijriRequired: boolean = false;

  //Forms
  @ViewChild('completeProfileForm') completeProfileForm: NgForm;

  EmailValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.EMAIL_FORMAT' }
  PasswordValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.PASSWORD_VALIDATION_2' }
  NumberValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.NumberValidation' }



  IamURL: string;
  isLoginError: boolean;
  Message: string = "error";
  class: string = "error-select";
  mode: Mode;
  ErrorMode = Mode.Error;
  showEmailErrorMsg: boolean = false;
  emailErrorMsg: string;
  //Constructor
  constructor(protected AuthService: AuthService,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected authService: AuthService,
    protected tokenService: TokenService,
    protected router: Router,
    public api: APIService,
    private titleService: Title) {
    this.emailValidationPattern = ConfigService.EmailValidationPattern;
    this.mobileValidationPattern = ConfigService.NewMobileValidationPattern;
    this.PhoneValidationPattern = ConfigService.NewPhoneValidationPattern;
    this.numberValidationPattern = ConfigService.NumberValidationPattern;
    this.passwordValidationPattern = ConfigService.PasswordValidationPattern;
    this.titleService.setTitle("ECZA | Profile");
  }

  ngOnInit() {

    SharedHelper.showLoader();
    let userId = this.activatedRoute.snapshot.queryParams["userId"];
    //let token = this.activatedRoute.snapshot.queryParams["token"] == undefined ? null : this.activatedRoute.snapshot.queryParams["token"];
    this.authService.getCompleteProfile(`userId=${userId}`).subscribe(result => {
      if (result.ResponseCode === ResponseCode.Error) {
        this.alertService.error(result.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else {

        if (this.Application.FirstName == "" || this.Application.SecondName == "" || this.Application.ThirdName == "" || this.Application.FourthName == "") {
          this.RedirectToIam();
        }
        else {
          this.Application = result.Content;
          if (this.Application.IdentityTypeId !== "1" && this.Application.IdentityTypeId !== "2") /// password and GCC 
            this.IsIdentityExpiryDateHijriRequired = false;
          else
            this.IsIdentityExpiryDateHijriRequired = true;
          this.DisableEnableProfileData();
          SharedHelper.hideLoader();
        }
      }
    }, err => {
      SharedHelper.hideLoader();
    });
  }

  DisableEnableProfileData() {

    if (this.Application.MobileNumber)
      this.MobileDisabled = true;
    if (this.Application.FullName)
      this.FullNmaeDisabled = true;
    if (this.Application.IdentityExpiryDateinhijri != null)
      this.IdentityIssueDateDisabled = true;
    if (this.Application.PhoneNumber)
      this.PhoneNumberDisabled = true;
    if (this.Application.Email)
      this.EmailDisabled = true;

  }

  public setIslamicDate() {
    debugger;
    this.Application.IdentityExpiryDateInhijriDays = this.Application.IdentityExpiryDateinhijri.day;
    this.Application.IdentityExpiryDateInhijriMonth = this.Application.IdentityExpiryDateinhijri.month;
    this.Application.IdentityExpiryDateInhijriYear = this.Application.IdentityExpiryDateinhijri.year;
  }

  submitForm() {
    debugger;
    this.isSubmitted = true;
    if (this.validateCompleteProfileForm()) {
      SharedHelper.showLoader();
      this.authService.postCompleteProfile(this.Application, this.Application.captchaValue).subscribe(
        res => {
          debugger;
          if (res.Content) {
            // this.LoginAndGoToHomePage();
            this.sendactivationemail(this.Application.Email);
          }
          else {
            this.showEmailErrorMsg = true;
            this.emailErrorMsg = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }

        },
        error => {
          SharedHelper.hideLoader();

        }
      )
    }
  }
  LoginAndGoToHomePage() {
    if (localStorage.authKey == undefined) {
      this.UserLogin.email = this.Application.Email;
      this.UserLogin.password = this.Application.Password;
      this.authService.Token({ ...this.UserLogin }).subscribe(
        data => {
          debugger;
          SharedHelper.hideLoader();
          this.tokenService.setUserToken(data.access_token);
          this.tokenService.setUserData(JSON.parse(data.userData));
          this.tokenService.setUserTokenExpiration(data.expires_in);
          window.location.href = '/'
        },
        err => {
          SharedHelper.hideLoader();
        }
      );
    }
    else if (this.tokenService.isAuthenticated()) {
      window.location.href = '/'
    }
  }
  validateCompleteProfileForm() {
    debugger;
    if (this.completeProfileForm.form.value.password !== this.completeProfileForm.form.value.confirmPassword) {
      this.completeProfileForm.form.controls["confirmPassword"].setErrors({ 'incorrect': true });
      return false;
    }
    else if (this.showEmailErrorMsg) {
      return false;
    }
    else
      return this.completeProfileForm.valid;
  }
  SetError(message: string) {
    this.mode = Mode.Error;
    this.class = "error-select";
    this.Message = message;
    SharedHelper.hideLoader();
  }
  SetSuccess(message: string) {
    this.mode = Mode.Success;
    this.class = "success-select";
    this.Message = message;
    SharedHelper.hideLoader();
  }
  sendactivationemail(Email: string) {
    this.api.Get<ApiGenericResponse<string>>("api/ProfileManagement/SendActivationMail?Email=" + Email).subscribe(
      res => {
        debugger;
        if (res.ResponseCode === ResponseCode.Error) {
          this.SetError(res.FriendlyResponseMessage);
        }
        else {
          window.location.href = '/auth/ActivationMail?Email=' + Email;
        }
      },
      error => {
        debugger;
        this.SetError("Auth.EmailConfirmationError");
      }
    );
  }
  public RedirectToIam() {
    SharedHelper.showLoader();
    this.authService.getIamURL().subscribe(data => {
      this.IamURL = data;
      console.log(this.IamURL);
      window.location.href = data;
      SharedHelper.hideLoader();
    },
      (err: HttpErrorResponse) => {

        this.isLoginError = true;
        SharedHelper.hideLoader();
        this.alertService.error(err.error.FriendlyResponseMessage);
        this.router.navigate(['/notification']);

      });
  }
}
