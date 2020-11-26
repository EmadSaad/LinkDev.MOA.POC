import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { AlertService } from '../../../shared/services';
import { IUserLogin } from '../../models/User';
import { userInfo } from 'os';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { APIService } from '../../../shared/Services/API-Service/api-service.service';
import { ApiGenericResponse, ResponseCode } from '../../../shared/Models/api-generic-response';
import { RatingService } from '../../services/rating.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILatestNonRatedAppData } from '../../models/latest-non-rated-app-data.model';
import { WorkspaceService } from '../../../workspace/services/workspace.services';
import { MyProfileService } from '../../../Profile-Managment/Services/MyProfile-Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public submitted: boolean = false;
  message: string;
  public UserLogin = <IUserLogin>{};
  public emailValidationPattern: string;
  public passwordValidationPattern: string;

  // Rating popup
  @ViewChild("popup") popUpTemplate: any;
  lastNonRatedApp: ILatestNonRatedAppData;
  rateValue = 0;
  notYetRated: boolean = false;
  ///// validation msgs
  EmailValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.EMAIL_FORMAT' }
  PasswordValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.PASSWORD_VALIDATION_2' }
  IamURL: string;
  isLoginError: boolean;
  Email: string;
  ShowResendActivationMail: boolean = false;
  IamUrlApi: string = 'api/ProfileManagement/IAMLogin';

  constructor(protected translateService: TranslateService,

    private authService: AuthService,
    private tokenService: TokenService,
    protected MyProfileService: MyProfileService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title, public api: APIService,
    private ratingService: RatingService, private modalService: NgbModal, protected WorkspaceService: WorkspaceService) {
    this.emailValidationPattern = ConfigService.EmailValidationPattern;
    this.passwordValidationPattern = ConfigService.PasswordValidationPattern;
    this.titleService.setTitle("Modon | Login");
  }


  @ViewChild('loginForm') loginForm: NgForm;

  ngOnInit() {
    this.tokenService.clear();
  }
  ngAfterViewInit() {
    document.querySelector("body").setAttribute("id", "auth");
    document.querySelector(".inner-layout").classList.add('colored-bg');
    document.querySelector(".inner-layout").classList.remove('container');
    document.querySelector(".inner-layout >div").classList.add('container');
    document.querySelector(".main-menu").classList.add('no-bg')
  }
  ngOnDestroy() {
    document.querySelector("body").removeAttribute("id");
    document.querySelector(".inner-layout").classList.remove('colored-bg');
    document.querySelector(".inner-layout").classList.add('container');
    document.querySelector(".inner-layout >div").classList.remove('container');
    document.querySelector(".main-menu").classList.remove('no-bg');
  }
  onSubmit() {
    this.submitted = true;

    this.alertService.clear();
    if (this.loginForm.invalid) {
      return;
    }

    SharedHelper.showLoader();

    this.authService.Token({ ...this.UserLogin }).subscribe(
      data => {
        debugger;
        this.tokenService.setUserToken(data.access_token);
        this.tokenService.setUserData(JSON.parse(data.userData));
        this.tokenService.setUserTokenExpiration(data.expires_in);
        this.GetUserFullName();
        this.ratingService.getlatestNonRatedApp().subscribe(res => {
          if (res.Content) {
            SharedHelper.hideLoader();
            this.lastNonRatedApp = res.Content;
            SharedHelper.scrollToBody();
            this.modalService.open(this.popUpTemplate, { centered: true, backdrop: 'static' });
          } else {
            this.activatedRoute.queryParamMap.subscribe(param => {
              if (param.has('returnURL') && param.get('returnURL') !== '') {
                window.location.href = param.get('returnURL')
              } else {
                window.location.href = '/'
              }
              SharedHelper.hideLoader();
            });
          }


        });



      },
      err => {
        debugger;
        let message = JSON.parse(err.error.error).FriendlyResponseMessage;
        if (message == "Email Not Confirmed") {
          this.message = "Activation.EmailNotConfirmed";
          this.ShowResendActivationMail = true;
        }
        else {
          this.message = JSON.parse(err.error.error).FriendlyResponseMessage;
          this.ShowResendActivationMail = false;
        }
        SharedHelper.hideLoader();
      }
    );
  }

  RedirectToIam() {
    SharedHelper.showLoader();
    window.location.href = ConfigService.APIURL + this.IamUrlApi;
    //this.authService.getIamURL().subscribe(data => {
    //  this.IamURL = data;
    //  console.log(this.IamURL);
    //  window.location.href = data;
    //},
    //  (err: HttpErrorResponse) => {
    //    this.isLoginError = true;
    //  });
  }

  Resendactivationemail() {
    SharedHelper.showLoader();
    this.api.Get<ApiGenericResponse<string>>("api/ProfileManagement/ResendActivationMail?Email=" + this.UserLogin.email).subscribe(
      res => {
        SharedHelper.hideLoader();
        this.ShowResendActivationMail = false;
        if (res.ResponseCode === ResponseCode.Error) {
          this.message = res.FriendlyResponseMessage;
        }
        else
          this.message = "Activation.ResendActivationMailSuccess";
      },
      error => {
        SharedHelper.hideLoader();
        this.message = "Auth.EmailConfirmationError";
        this.ShowResendActivationMail = false;
      }
    );
  }

  handleRate() {
    //console.log(this.rateValue);
    if (this.rateValue == 0) {
      this.notYetRated = true;
    } else {
      this.notYetRated = false;
      this.WorkspaceService.SubmitRating(this.lastNonRatedApp.ApplicationId, this.rateValue).subscribe(res => {
        if (res.Content) {
          this.modalService.dismissAll();
          this.activatedRoute.queryParamMap.subscribe(param => {
            if (param.has('returnURL') && param.get('returnURL') !== '') {
              window.location.href = param.get('returnURL')
            } else {
              window.location.href = '/'
            }
            //SharedHelper.hideLoader();
          });
        }
      });
    }
  }
  noRate() {
    this.rateValue = 0;
    this.WorkspaceService.SubmitRating(this.lastNonRatedApp.ApplicationId, this.rateValue).subscribe(res => {
      if (res.Content) {
        this.modalService.dismissAll();
        this.activatedRoute.queryParamMap.subscribe(param => {
          if (param.has('returnURL') && param.get('returnURL') !== '') {
            window.location.href = param.get('returnURL')
          } else {
            window.location.href = '/'
          }
          //SharedHelper.hideLoader();
        });
      }
    });

  }


  GetUserFullName() {
    this.MyProfileService.get().subscribe(res => {
      this.tokenService.setUserFullName(res.Content.FullName);
    },
      err => {
        SharedHelper.hideLoader();
      });
  }
}


