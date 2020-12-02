import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenService } from 'src/modules/shared/services/token.service';
import { AuthService } from '../../services/auth.service';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { Title } from '@angular/platform-browser';
import { IUserChangePassword } from '../../models/User';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  //Props
  confirmationPassword: string;
  passwordValidationPattern: string;

  PasswordValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.PASSWORD_VALIDATION_2' }
  public UserChangePassword = <IUserChangePassword>{};
  public ServerErrorMsg: string = "";;
  public isSubmitted: boolean = false;

  //Forms
  @ViewChild('changePasswordForm') changePasswordForm: NgForm;

  disableButton: boolean = false;

  constructor(
    protected AuthService: AuthService,
    protected modalService: NgbModal,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected tokenService: TokenService,
    private titleService: Title) {
    this.titleService.setTitle("Modon | Change password");
    this.passwordValidationPattern = ConfigService.PasswordValidationPattern;
  }

  ngOnInit() {
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
    this.ServerErrorMsg = "";
    if (this.changePasswordForm.valid && this.validateChangePasswordForm()) {
      SharedHelper.showLoader();
      debugger;
      this.UserChangePassword.userName = JSON.parse(localStorage.getItem("userData")).userName;
      this.AuthService.ChangePassword({ ...this.UserChangePassword }, this.UserChangePassword.captchaValue).subscribe(savingResult => {
        SharedHelper.hideLoader();
        if (savingResult.FriendlyResponseMessage != null) {
          this.ServerErrorMsg = savingResult.FriendlyResponseMessage;
          this.changePasswordForm.form.controls["captchaControl"].reset();
        }
        else {
          this.tokenService.logout();
          this.alertService.success(savingResult.Content);
          this.router.navigateByUrl('/notification');
          //this.router.navigate(['/auth', 'login']);
        }

      });
    }

  }


  validateChangePasswordForm() {
    if (this.changePasswordForm.form.value.newpassword == undefined && this.changePasswordForm.form.value.confirmPassword == undefined)
      return false;
    else if (this.changePasswordForm.form.value.newpassword !== this.changePasswordForm.form.value.confirmPassword) {
      this.changePasswordForm.form.controls["confirmPassword"].setErrors({ 'incorrect': true });
      return false;
    }
    else
      return this.changePasswordForm.valid;
  }
}
