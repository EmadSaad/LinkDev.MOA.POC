import { Component, OnInit } from '@angular/core';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { TokenService } from '../../../shared/services/token.service';
import { AuthService } from '../../services/auth.service';
import { IUserLogin } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from '../../../Profile-Managment/Services/MyProfile-Service';

@Component({
  selector: 'app-old-portal-login',
  templateUrl: './old-portal-login.component.html',
  styleUrls: ['./old-portal-login.component.css']
})
export class OldPortalLoginComponent implements OnInit {

  public UserLogin = <IUserLogin>{};
  constructor(private tokenService: TokenService,
    private authService: AuthService,
    protected MyProfileService: MyProfileService,
    protected activatedRoute: ActivatedRoute, protected router: Router) {
  }

  ngOnInit() {
    this.OldPortalLogin();
  }

  OldPortalLogin() {
    SharedHelper.showLoader();
    this.UserLogin.email = this.activatedRoute.snapshot.queryParams["email"];
    this.UserLogin.password = this.activatedRoute.snapshot.queryParams["password"];

    this.authService.Token({ ...this.UserLogin }).subscribe(
      data => {
        this.tokenService.setUserToken(data.access_token);
        this.tokenService.setUserData(JSON.parse(data.userData));
        this.tokenService.setUserTokenExpiration(data.expires_in);
        this.GetUserFullName();
        // route to contract submission
        this.router.navigateByUrl('/contract-submission');
      },
      err => {
        SharedHelper.hideLoader();
        let message = JSON.parse(err.error.error).FriendlyResponseMessage;
       
      }
    );
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
