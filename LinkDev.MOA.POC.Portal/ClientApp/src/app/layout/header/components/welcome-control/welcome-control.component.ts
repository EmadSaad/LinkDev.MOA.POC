import { Component, OnInit, Injector } from '@angular/core';
import { IUserData } from '../../../../../modules/auth/models/User';
import { TokenService } from '../../../../../modules/shared/services/token.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../modules/auth/services/auth.service';
import { MyProfileService } from '../../../../../modules/Profile-Managment/Services/MyProfile-Service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';

@Component({
  selector: 'welcome-control',
  templateUrl: './welcome-control.component.html',
  styleUrls: ['./welcome-control.component.scss']
})
export class WelcomeControlComponent implements OnInit {
  public userData?: IUserData;
  isAuthorized: boolean;
  FullName: string;

  public isLanguageDefault: boolean;

  constructor(
    private tokenService: TokenService,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    protected MyProfileService: MyProfileService) {
    tokenService.isAuthenticated()
      .subscribe(
        data => {
          this.isAuthorized = data;
        });
    tokenService.getUserDataObserve().subscribe(
      data => {
        this.userData = data;
        //this.FullName =
        if (this.FullName == "" || this.FullName == undefined || this.FullName == null) {
          if (this.userData != null && this.userData != undefined)
            //this.FullName = this.userData.UserFullName;
            this.FullName = "محمد إبراهيم فهمي";
        }
      }
    );
  }

  ngOnInit() {
    this.FullName = "محمد إبراهيم فهمي";
  }

  ngAfterViewInit() {
  }

  logout(e: Event) {
    e.preventDefault();
    SharedHelper.showLoader();
    this.authService.logOut().subscribe(() => {
      this.tokenService.logout();
      SharedHelper.hideLoader();
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    }, err => {
      this.tokenService.logout();
      SharedHelper.hideLoader();
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    });
  }

  GetUserFullName() {
    // SharedHelper.showLoader();
    this.MyProfileService.get().subscribe(res => {
      SharedHelper.hideLoader();
      this.FullName = "محمد إبراهيم فهمي";
    },
      err => {
        SharedHelper.hideLoader();
      });
  }
}
