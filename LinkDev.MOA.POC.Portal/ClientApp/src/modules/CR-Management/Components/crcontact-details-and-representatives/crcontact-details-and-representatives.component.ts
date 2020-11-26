import { Component, OnInit } from '@angular/core';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { ColumnFieldType, GridColumn } from '../../../shared/form-guide/grid/models/GridColumn';
import { LookupService } from '../../../shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { UserInfo } from '../../Models/UserInfo';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';
import { CRServices } from '../../Services/CR-Services';
import { CRContactDetails } from '../../Models/CRContactDetails';

@Component({
  selector: 'app-crcontact-details-and-representatives',
  templateUrl: './crcontact-details-and-representatives.component.html',
  styleUrls: ['./crcontact-details-and-representatives.component.css']
})
export class CRContactDetailsAndRepresentativesComponent implements OnInit {

  /// representative pros 
  public UserInfoList: UserInfo[] = [];
  public RepresentativeErrorMsg: string = "";
  public RepresentativeSuccessMsg: string = "";
  addItemFailed: boolean = false;

  public IdentityNumber: string;
  public Email: string;
  isPopUpOpened: boolean = false;
  isContactPopUpOpened: boolean = false;
  IsUserCROwner: boolean = false;

  emailValidationPattern: string;
  IdentityNumberValidationPattern: string;
  public RetrieveOptionsObject: RetrieveOptionsRequest[] = [{ EntityName: "contact", CachingKey: "contact_ldv_typeofidentity_OptionSet", OptionSetName: "ldv_typeofidentity", Mode: LookupRequestMode.OptionSet }];
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "Select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  gridcols: GridColumn[] = [
    { header: "CRManagement.FullName", field: "FullName", typeConfig: { type: ColumnFieldType.Text, } },
    { header: "CRManagement.IdentityNumber", field: "IdentityNumber", typeConfig: { type: ColumnFieldType.Text, } },
    { header: "CRManagement.IdentityType", field: "IdentityTypeId", typeConfig: { type: ColumnFieldType.Dropdown, dropDownconfig: this.config, lookupKey: "contact_ldv_typeofidentity_OptionSet" } },
    { header: "CRManagement.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text, } },
    { header: "CRManagement.PhoneNumber", field: "PhoneNumber", typeConfig: { type: ColumnFieldType.Text, } }
  ];
  gridModel: UserInfo = new UserInfo();
  public MyCurrentRepresentative: UserInfo = new UserInfo();
  //////////////////////////////////////////////////////////////////////

  ///////////////////////////Contact details Pros/////////////////////////
  public ContactDetailsObj: CRContactDetails = new CRContactDetails();
  public ContactDetaillsList: CRContactDetails[] = [];
  public addContactItemFailed: boolean = false;
  //isContactPopUpOpened: boolean = false;
  isResposeFailed: boolean = false;
  public ContactErrorMsg: string = "";
  public ContactSuccessMsg: string = "";

  MobilValidationPattern: string;
  EmailValidation: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.EMAIL_FORMAT' }

  Contactsgridcols: GridColumn[] = [
    { header: "CRManagement.ContactName", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContactEmail", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContactMobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.CommuncationRole", field: "CommunicationRole", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ContactsgridModel: CRContactDetails = new CRContactDetails();

  constructor(protected CRServices: CRServices,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
    this.emailValidationPattern = ConfigService.EmailValidationPattern
    this.IdentityNumberValidationPattern = ConfigService.IdentityNumberValidationPattern;
    this.MobilValidationPattern = ConfigService.NewMobileValidationPattern;
  }

  ngOnInit() {
    // debugger;
    this.lookupService.loadLookups(this.RetrieveOptionsObject).subscribe();
    this.getCRRepresentatives();
    this.getContactDetails();

    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.config['placeholder'] = sel;
            this.config['noResultsFound'] = no;
          }
        )
      }
    )
  }

  getIdentityTypeOptionSet() {
    return this.lookupService.lookupEntities['contact_ldv_typeofidentity_OptionSet'];
  }

  getCRRepresentatives() {
    SharedHelper.showLoader();
    var id = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getMyRepresentative(`CrId=${id}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (res.Content.length > 0) {
        this.UserInfoList = res.Content;
        this.IsUserCROwner = this.UserInfoList[0].IsCROwner;
      }

    }, err => {
      this.RepresentativeErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  CreateRepresentative(eventArgs) {
    SharedHelper.showLoader();
    this.RepresentativeErrorMsg = "";
    this.RepresentativeSuccessMsg = "";
    var id = this.activatedRoute.snapshot.queryParams["CrId"];
    this.MyCurrentRepresentative.CrId = id;
    var x = this.MyCurrentRepresentative.IdentityNumber.charAt(0);
    if (this.MyCurrentRepresentative.IdentityNumber.charAt(0) == '1')
      this.MyCurrentRepresentative.IdentityTypeId = "1";
    else
      this.MyCurrentRepresentative.IdentityTypeId = "2";
    this.CRServices.CreateRepresentative(this.MyCurrentRepresentative).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (!res.Content.IsResponseFailed) {
        this.RepresentativeSuccessMsg = "CRManagement.CreateSuccessfully"
        this.MyCurrentRepresentative = res.Content;
        this.getCRRepresentatives();
      }
      else {
        if (res.Content.ResponseMsg != null) {
          this.RepresentativeErrorMsg = res.Content.ResponseMsg;
          this.addItemFailed = true;
        }
        else {
          this.RepresentativeErrorMsg = "CRManagement.CreateError";
          this.addItemFailed = true;
        }
        this.addItemFailed = false;
        this.getCRRepresentatives();
      }

    }, err => {
      this.RepresentativeErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  DeleteRepresentative(eventArgs) {
    this.RepresentativeErrorMsg = "";
    this.RepresentativeSuccessMsg = "";
    var DeletedRepresentative = this.UserInfoList.find(x => x.Id == eventArgs);
    //let UserName = JSON.parse(localStorage.getItem("userData")).userName
    //if (UserName == DeletedRepresentative.Email) {
    //  this.RepresentativeErrorMsg = "CRManagement.DeleteYourAccountError";
    //  this.getCRRepresentatives();
    //}
    //else {
      SharedHelper.showLoader();
      this.CRServices.DeleteRepresentative(DeletedRepresentative).subscribe(res => {
        SharedHelper.hideLoader();
        if (res.FriendlyResponseMessage !== null) {
          this.alertService.error(res.FriendlyResponseMessage);
          this.router.navigate(['/notification']);
        }
        else {
          if (res.Content.IsResponseFailed)
            this.RepresentativeErrorMsg = res.Content.ResponseMsg;
          else
            this.RepresentativeSuccessMsg = res.Content.ResponseMsg;
          this.getCRRepresentatives();
        }
        //else if (res.Content) {
        //  this.RepresentativeSuccessMsg = "CRManagement.DeleteSuccessfully";
        //  this.getCRRepresentatives();
        //}
        //else {
        //  this.RepresentativeErrorMsg = "CRManagement.DeleteError";
        //  this.getCRRepresentatives();
        //}
      }, err => {
        this.RepresentativeErrorMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
    //}
  }

  SetFullName() {
    var FirstName = (this.MyCurrentRepresentative.FirstName != null || this.MyCurrentRepresentative.FirstName != undefined) ? this.MyCurrentRepresentative.FirstName : "";
    var ThirdName = (this.MyCurrentRepresentative.ThirdName != null || this.MyCurrentRepresentative.ThirdName != undefined) ? this.MyCurrentRepresentative.ThirdName : "";
    this.MyCurrentRepresentative.FullName = FirstName + " " + ThirdName;
  }


  ///////////////////////////////////////////////// Contact Details functions
  getContactDetails() {
    SharedHelper.showLoader();
    var id = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getContactDetails(`CrId=${id}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else
        this.ContactDetaillsList = res.Content;
    }, err => {
      this.ContactErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }
  CreateContactDetails(eventArgs) {
    this.ContactErrorMsg = "";
    this.ContactSuccessMsg = "";
    this.ContactDetailsObj = Object.assign(new CRContactDetails, eventArgs);
    this.ContactDetailsObj.CrId = this.activatedRoute.snapshot.queryParams["CrId"];
    SharedHelper.showLoader();
    this.CRServices.postContactDetails(this.ContactDetailsObj).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (!res.Content.IsResponseFailed) {
        this.ContactSuccessMsg = "CRManagement.CreateSuccessfully"
        this.getContactDetails();
      }
      else {
        if (res.Content.ResponseMsg != null)
          this.ContactErrorMsg = res.Content.ResponseMsg;
        else
          this.ContactErrorMsg = "CRManagement.CreateError"
        this.addItemFailed = true;
        this.getContactDetails();
      }
      this.addItemFailed = false;
    }, err => {
      this.ContactErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  DeleteContactDetails(eventArgs) {
    this.ContactErrorMsg = "";
    this.ContactSuccessMsg = "";
    var DeletedContactDetails = this.ContactDetaillsList.find(x => x.Id == eventArgs);
    SharedHelper.showLoader();
    this.CRServices.DeleteContactDetails(DeletedContactDetails).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (res.Content) {
        this.ContactSuccessMsg = "CRManagement.DeleteSuccessfully";
        this.getContactDetails();
      }
      else {
        this.ContactErrorMsg = "CRManagement.DeleteError";
        this.getContactDetails();
      }
    }, err => {
      this.ContactErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

}
