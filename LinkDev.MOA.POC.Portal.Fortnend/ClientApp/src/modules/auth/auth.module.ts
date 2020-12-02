import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing-module';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module'
import { MustMatch } from './helpers/matchingPassword';
import { PasswordTextBoxModule } from '../shared/form-guide/password-textbox/modules/password-textbox.module';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModule } from '../shared/form-guide/message/modules/message.module';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { SharedModule } from '../shared/shared.module';

import { JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';
import { IamLoginComponent } from './components/iam-login/iam-login.component';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { ConfigService } from '../shared/Services/Config-Service/config-service.service';
import { ActivationMailComponent } from './components/activation-mail/activation-mail.component';
import { AuthAuthorizedPageComponent } from './components/auth-authorized-page/auth-authorized-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RatingModule } from 'primeng/rating';
import { OldPortalLoginComponent } from './components/old-portal-login/old-portal-login.component';


@NgModule({
  declarations: [AuthComponent,
    CompleteProfileComponent,
    ConfirmEmailComponent,
    ForgetPasswordComponent,
    LoginComponent,
    ChangePasswordComponent,
    IamLoginComponent,
    ActivationMailComponent,
    AuthAuthorizedPageComponent,
    ResetPasswordComponent,
    OldPortalLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    TextBoxModule,
    MutliselectModule,
    PasswordTextBoxModule,
    TranslateModule,
    MessageModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    ValidationViewerModule,
    SharedModule,
    IslamicDatePickerModule,
    RatingModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: ConfigService.recaptchaSiteKey
        

      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: localStorage.getItem('lang') || 'ar',
    }
  ]
})
export class AuthModule { }
