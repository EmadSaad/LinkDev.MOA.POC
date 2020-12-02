import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TokenService } from 'src/modules/shared/services/token.service';
import { UserInfo } from '../../../Models/UserInfo';
//import { AppConfigService } from 'src/modules/shared/services/app-config.service';
import { CustomTab } from 'src/modules/shared/Models/custom-tab.model';
//import { MyProfileService } from '../../../Services/MyProfile-Service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { MyProfileService } from '../../../Services/MyProfile-Service';
import { userInfo } from 'os';
import { LookupRequestMode } from '../../../../shared/Enums/lookup-request-mode.enum';
import { ConfigService } from '../../../../shared/Services/Config-Service/config-service.service';
import { SharedHelper } from '../../../../shared/services/shared-helper';

@Component({
  selector: 'app-MyProfile',
  templateUrl: './MyProfile.component.html',
  styleUrls: ['./MyProfile.component.css']
})
export class MyProfileComponent implements OnInit {
  public UserInfo: UserInfo = {};
  public identityTypeDropdownConfig = {}
  public mobileValidationPattern: string;
  public PhoneValidationPattern: string;
  public isSubmitted: boolean = false;
  public UpdateMsgClass: string = ""
  public UpdateMsg: string = "";

  public RetrieveOptionsObject: RetrieveOptionsRequest[] = [{ EntityName: "contact", CachingKey: "contact_ldv_typeofidentity_OptionSet", OptionSetName: "ldv_typeofidentity", Mode: LookupRequestMode.OptionSet }];
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "Select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  //Forms
  @ViewChild('MyProfileForm') MyProfileForm: NgForm;

  constructor(protected MyProfileService: MyProfileService,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
    this.mobileValidationPattern = ConfigService.NewMobileValidationPattern;
    this.PhoneValidationPattern = ConfigService.NewPhoneValidationPattern;

  }

  submitForm() {
    debugger;
    this.isSubmitted = true;
    SharedHelper.showLoader();
    this.MyProfileService.post(this.UserInfo).subscribe(
      res => {
        SharedHelper.hideLoader();
        if (res.Content) {
          this.UpdateMsgClass = "alert alert-success"
          this.UpdateMsg = "CRManagement.UpdateSuccessMeg"
        }
        else {
          this.UpdateMsgClass = "alert alert-danger"
          this.UpdateMsg = res.FriendlyResponseMessage
        }
      },
      err => {
        this.UpdateMsgClass = "alert alert-danger"
        this.UpdateMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
  }



  ngOnInit() {
    this.GetUserProfile();
    this.lookupService.loadLookups(this.RetrieveOptionsObject).subscribe();
  }

  getIdentityTypeeOptionSet() {
    return this.lookupService.lookupEntities['contact_ldv_typeofidentity_OptionSet'];
  }

  GetUserProfile() {
    debugger;
    SharedHelper.showLoader();
    this.MyProfileService.get().subscribe(res => {
      SharedHelper.hideLoader();
      this.UserInfo = res.Content;
    },
      err => {
        this.UpdateMsgClass = "alert alert-danger"
        this.UpdateMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
  }
}
