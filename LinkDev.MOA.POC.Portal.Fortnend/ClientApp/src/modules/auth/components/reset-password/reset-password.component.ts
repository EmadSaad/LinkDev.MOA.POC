import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { AuthService } from '../../services/auth.service';
import { IUserResetPassword } from '../../models/User';
import { AlertService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from '../../../shared/services/token.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  //Props
  confirmationPassword: string;
  passwordValidationPattern: string;

  PasswordValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.PASSWORD_VALIDATION_2' }
  public UserResetPassword = <IUserResetPassword>{};
  public SuccessMsg: string;
  public ServerErrorMsg: string;
  public isSubmitted: boolean = false;
  //Forms
  @ViewChild('ResetPasswordForm') ResetPasswordForm: NgForm;

  token: string;
  isvalid: boolean;
  constructor(protected AuthService: AuthService,
    protected modalService: NgbModal,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected tokenService: TokenService) {
    this.passwordValidationPattern = ConfigService.PasswordValidationPattern;

  }

  ngOnInit() {
    {
      this.activatedRoute.queryParams.subscribe(
        param => {
          this.token = param['token'];
          if (!this.token) {
            this.translateService.get('MISSING_TOKEN')
              .subscribe(
                data => {
                  this.ServerErrorMsg = data;
                  this.alertService.error(this.ServerErrorMsg);
                  this.router.navigateByUrl('/notification');
                  this.isvalid = false;
                }
              );

            return;
          }
          this.AuthService.verifyResetPasswordToken(this.token)
            .subscribe(
              data => {
                if (data.FriendlyResponseMessage != null) {
                  this.isvalid = false;
                  this.ServerErrorMsg = data.FriendlyResponseMessage;
                  this.alertService.error(this.ServerErrorMsg);
                  this.ResetPasswordForm.form.controls["captchaControl"].reset();
                  this.router.navigateByUrl('/notification');
                }
                else if (data.Content == "Valid")
                  this.isvalid = true;
              },
              err => {
                this.isvalid = false;
                this.ServerErrorMsg = err.error.ApiResponseMessage.FriendlyResponseMessage;
                this.alertService.error(this.ServerErrorMsg);
                this.ResetPasswordForm.form.controls["captchaControl"].reset();
                this.router.navigateByUrl('/notification');
              }
            );
        }
      )

    }
  }

  ngAfterViewInit() {
    document.querySelector("body").setAttribute("id", "auth");
    document.querySelector(".inner-layout").classList.add('colored-bg');
    document.querySelector(".main-menu").classList.add('no-bg');
  }
  ngOnDestroy(){
    document.querySelector("body").removeAttribute("id");
    document.querySelector(".inner-layout").classList.remove('colored-bg');
    document.querySelector(".main-menu").classList.remove('no-bg');
  }
  submitForm(): void {
    debugger;
    this.isSubmitted = true;
    if (this.validateResetPasswordForm() && this.isvalid) {
      SharedHelper.showLoader();
      this.UserResetPassword.token = this.token;
      this.AuthService.ResetPassword({ ...this.UserResetPassword}, this.UserResetPassword.captchaValue).subscribe(savingResult => {
        SharedHelper.hideLoader();
        if (savingResult.FriendlyResponseMessage != null) {
          this.ServerErrorMsg = savingResult.FriendlyResponseMessage;
          this.alertService.error(this.ServerErrorMsg);
          this.ResetPasswordForm.form.controls["captchaControl"].reset();
          this.router.navigateByUrl('/notification');
        }
        else  {
          this.SuccessMsg = savingResult.Content;
          this.alertService.success(this.SuccessMsg);
          this.router.navigateByUrl('/notification');
        }

      }, err => {
        this.ServerErrorMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
    }
  }

  validateResetPasswordForm() {
    debugger;
    if (this.ResetPasswordForm.form.value.password !== this.ResetPasswordForm.form.value.confirmPassword) {
      this.ResetPasswordForm.form.controls["confirmPassword"].setErrors({ 'incorrect': true });
      return false;
    }
    else
      return this.ResetPasswordForm.valid;
  }
}
