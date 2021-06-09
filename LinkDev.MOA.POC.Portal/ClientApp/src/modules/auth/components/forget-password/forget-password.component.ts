import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/UserInfo';
import { AuthService } from '../../services/auth.service';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  //Props
  public emailValidationPattern: string;
  public emailText: string;
  disableButton: boolean;
  EmailValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.EMAIL_FORMAT' }
  public Application: UserInfo = {};
  public SuccessMsg: string;
  public ServerErrorMsg: string;
  //Forms
  @ViewChild('forgetPasswordForm') forgetPasswordForm: NgForm;

  constructor(protected AuthService: AuthService,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService: Title) {
    this.emailValidationPattern = ConfigService.EmailValidationPattern;
    this.titleService.setTitle("ECZA | Forget password");
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
    this.SuccessMsg = "";
    this.ServerErrorMsg = "";
    if (!this.forgetPasswordForm.valid)
      return;
    SharedHelper.showLoader();
    this.AuthService.ForgetPassword(`Email=${this.emailText}`, this.Application.captchaValue).subscribe(savingResult => {
      SharedHelper.hideLoader();
      if (savingResult.FriendlyResponseMessage != null) {
        this.ServerErrorMsg = savingResult.FriendlyResponseMessage;
        this.forgetPasswordForm.form.controls["captchaControl"].reset();
      }
      else {
        this.alertService.success(savingResult.Content);
        this.router.navigate(['/notification']);
      }

    }, err => {
      this.ServerErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }
}
