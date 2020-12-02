import { Component, OnInit, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MODONbreadcrumbs } from '../../../Globals';
import { UserInfo } from '../../auth/models/UserInfo';
import { APIService } from '../Services/API-Service/api-service.service';
import { Router } from '@angular/router';
import { AlertService } from '../services';
import { ApiGenericResponse, ResponseCode } from '../Models/api-generic-response';
import { ConfigService } from '../Services/Config-Service/config-service.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public oldModonURL: string;
  public _user: UserInfo = {};

  @Input() CurrnetComponentName: string;
  CurrentComponent: BreadCrumbItem

  constructor(public translate: TranslateService,
    public api: APIService,
    protected router: Router,
    protected alertService: AlertService) { }

  ngOnInit() {
    debugger;
    this.setModonOldURL();
    this.CurrentComponent = MODONbreadcrumbs.find(x => x.ComponentName.toLocaleLowerCase().trim() === this.CurrnetComponentName.toLocaleLowerCase().trim());
  }

  setModonOldURL() {
    this.api.Get<ApiGenericResponse<UserInfo>>("api/ProfileManagement/GetUserCredential").subscribe(
      res => {
        debugger;
        if (res.ResponseCode === ResponseCode.Success) {
          this._user = res.Content;
          this.oldModonURL = ConfigService.OldModonURL + "/users/LoginRedirectFormCRM?username=" + res.Content.Email + "&password=" + res.Content.Password;
        }
      },
    );
  }
}

export class BreadCrumbItem {
  ComponentName: string;
  ItemTextKey: string;
  Route: string;
  ParentComponentName: string;
  Parameters: string;
  HasRoute: boolean;
}

