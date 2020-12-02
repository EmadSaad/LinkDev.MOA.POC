import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompleteProfileComponent } from "./components/complete-profile/complete-profile.component";
import { AuthComponent } from "./auth.component";
import { ConfirmEmailComponent } from "./components/confirm-email/confirm-email.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { LoginComponent } from "./components/login/login.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ProfileGuardService } from "../Guards/ProfileGuard.guard ";
import { IamLoginComponent } from "./components/iam-login/iam-login.component";
import { ActivationMailComponent } from "./components/activation-mail/activation-mail.component";
import { AuthAuthorizedPageComponent } from "./components/auth-authorized-page/auth-authorized-page.component";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuardService } from "../Guards/AuthGuard.guard ";
import { LoginGuardService } from "../Guards/LoginGuard.guard ";
import { OldPortalLoginComponent } from "./components/old-portal-login/old-portal-login.component";

const routes: Routes = [
    // { path: '', module: HomeComponent, canActivate: [] },
  { path: "complete-profile", component: CompleteProfileComponent, canActivate: [ProfileGuardService] },
    { path: "confirm-email", component: ConfirmEmailComponent, canActivate: [] },
  { path: "forgetpassword", component: ForgetPasswordComponent, canActivate: [LoginGuardService] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuardService] },
  { path: "change-password", component: ChangePasswordComponent, canActivate: [AuthGuardService] },
    { path: "IamLogin", component: IamLoginComponent, canActivate: [] },
  { path: "ActivationMail", component: ActivationMailComponent, canActivate: [] },
  { path: "NotAuthorizedPage", component: AuthAuthorizedPageComponent, canActivate: [] },
  { path: "reset-password", component: ResetPasswordComponent, canActivate: [] },
  { path: "Old-Portal_Login", component: OldPortalLoginComponent, canActivate: [] },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {

}
