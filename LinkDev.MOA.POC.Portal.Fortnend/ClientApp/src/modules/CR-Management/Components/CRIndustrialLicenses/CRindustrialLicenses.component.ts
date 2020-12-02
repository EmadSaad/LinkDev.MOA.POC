import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../shared/services';
import { LookupService } from '../../../shared/Services/lookup.service';
import { CRindustrialLicenses, ILISICActivities, ILProducts } from '../../Models/CRindustrialLicenses';
import { CRServices } from '../../Services/CR-Services';
import { GridColumn, ColumnFieldType } from '../../../shared/form-guide/grid/models/GridColumn';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';

import { SharedHelper } from '../../../shared/services/shared-helper';
import { Product } from '../../../Contract-Submission/interfaces/product';

@Component({
  selector: 'app-CRindustrialLicenses',
  templateUrl: './CRindustrialLicenses.component.html',
  styleUrls: ['./CRindustrialLicenses.component.css']
})
export class CRindustrialLicensesComponent implements OnInit {

  public PopupMsg: string = "";
  public PopupMsgClass: string = "";
  public SuccessMsg: string = "";
  public ServerErrorMsg: string = "";
  public CRils: CRindustrialLicenses[] = [];
  public ILInfo: CRindustrialLicenses = new CRindustrialLicenses();

  public RetrieveOptionsObject: RetrieveOptionsRequest[] = [{ EntityName: "ldv_industriallicense", CachingKey: "ldv_industriallicense_ldv_iltype_OptionSet", OptionSetName: "ldv_iltype", Mode: LookupRequestMode.OptionSet }];
  public ILType: string;
  public ILNumbertxt: string;
  isPopUpOpened: boolean = false;
  viewModeItems: boolean = false;
  addItemFailed: boolean = false;
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "___",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  gridcols: GridColumn[] = [
    { header: "CRManagement.ILNumber", field: "ILNumber", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ILType", field: "ILType", typeConfig: { type: ColumnFieldType.Dropdown, dropDownconfig: this.config, lookupKey: "ldv_industriallicense_ldv_iltype_OptionSet" } },
    { header: "CRManagement.IssueDate", field: "ILIssuedate", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ExpiryDate", field: "ILExpirydate", typeConfig: { type: ColumnFieldType.Text } },
  ];

  ISICActivitygridcols: GridColumn[] = [
    { header: "CRManagement.IlActivitydivision", field: "Class", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityClass", field: "Division", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityName", field: "Activity", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ILISICCode", field: "ISICCode", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ISICActivitygridModel: ILISICActivities = new ILISICActivities();

  ILProductsgridcols: GridColumn[] = [
    { header: "CRManagement.ProductName", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ILProductsgridModel: ILProducts = new ILProducts();

  constructor(protected CRServices: CRServices,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
  }

  ngOnInit() {
   
    this.getCRindustrialLicenses();
    this.lookupService.loadLookups(this.RetrieveOptionsObject).subscribe();

  }

  getILTypeOptionSet() {
    return this.lookupService.lookupEntities['ldv_industriallicense_ldv_iltype_OptionSet'];
  }

  GetSelectedValue(SelectedValue) {
    this.ILType = SelectedValue;
  }
  getCRindustrialLicenses() {
    SharedHelper.showLoader();
    let CrNumber = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getCRindustrialLicenses(`CrId=${CrNumber}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else {
        this.CRils = res.Content;
      }
    }, err => {
      this.ServerErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  GetindustrialLicensesByNumber() {
    this.PopupMsg = "";
    ///////////////////////// param /////////////////////////
    let ILNumber = this.ILNumbertxt;
    var CRId = this.activatedRoute.snapshot.queryParams["CrId"];
    ///////////////////////
    //////////////////////////validation ///////////////////////
    var FoundedItem = this.CRils.filter(x => x.ILNumber == ILNumber && x.IsDeleted != true);
    if (FoundedItem.length > 0) {
      this.PopupMsg = "CRManagement.IlValidation";
      this.PopupMsgClass = "alert alert-danger";
      this.ILNumbertxt = '';
    }
    else {
      SharedHelper.showLoader();
      //////////////////////////Get IL /////////////////////////
      var QueryParam = `ILNumber=${ILNumber}` + `&` + `CRId=${CRId}`;
      this.CRServices.GetILByILNumber(QueryParam).subscribe(res => {
        SharedHelper.hideLoader();
        if (res.FriendlyResponseMessage !== null) {
          this.PopupMsg = res.FriendlyResponseMessage;
          this.PopupMsgClass = "alert alert-danger";
          this.ILNumbertxt = '';
        }
        else if (res.Content.ResponseMsg != null) {
          this.PopupMsg = res.Content.ResponseMsg;
          this.PopupMsgClass = "alert alert-danger";
          this.ILNumbertxt = '';
        }
        else {
          this.ILInfo = res.Content;
        }
      }, err => {
        this.ServerErrorMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
    }

  }


  CreateIL(eventArgs) {
    debugger;
    this.SuccessMsg = "";
    this.PopupMsg = "";
    if (this.ILInfo.IlProducts.length == 0) {
      this.PopupMsg = "CRManagement.ILNotHaveProduct";
    }
    this.ILInfo = Object.assign(new CRindustrialLicenses, eventArgs);
    SharedHelper.showLoader();
    this.CRServices.CreateIL(this.ILInfo).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (res.Content) {
        this.SuccessMsg = "CRManagement.CreateSuccessfully"
      }
      else {
        this.ServerErrorMsg = "CRManagement.CreateError"
        this.addItemFailed = true;
      }
      this.addItemFailed = false;
      this.getCRindustrialLicenses();
    }, err => {
      this.ServerErrorMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
    });
  }

  ViewMode(e) {
    this.viewModeItems = e;
  }

  DeleteIL(ILGuid) {
    this.SuccessMsg = "";
    this.PopupMsg = "";
    var DeletedIL = this.CRils.find(x => x.Id == ILGuid);
    SharedHelper.showLoader();
    this.CRServices.DeleteIL(DeletedIL).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (res.Content)
        this.SuccessMsg = "CRManagement.DeleteSuccessfully"
      else
        this.ServerErrorMsg = "CRManagement.DeleteError"
    }, err => {
      this.ServerErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  UpdateIL() {
    let CRId = this.activatedRoute.snapshot.queryParams["CrId"];
    let ILId = this.ILInfo.Id;
    SharedHelper.showLoader();
    this.CRServices.getILUpdateFromIntgeration(`IndustriallicenseId=${ILId}` + `&` + `CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        SharedHelper.hideLoader();
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (res.Content.ResponseMsg != null) {
        this.PopupMsg = res.Content.ResponseMsg;
        this.PopupMsgClass = "alert alert-danger";
      }
      else {
        this.PopupMsg = "CRManagement.UpdateSuccessfully";
        this.PopupMsgClass = "alert alert-success";
        this.ILInfo = res.Content;
        this.ILInfo.ILISICActivities = res.Content.ILISICActivities;

      }
    }, err => {
      this.PopupMsg = err.error.FriendlyResponseMessage;
      this.PopupMsgClass = "alert alert-danger";
      SharedHelper.hideLoader();
    });
  }

  ResetILForm() {
    this.ILInfo = {};
  }
  ModalClosed(e) {
    if (e) {
      this.SuccessMsg = "";
      this.PopupMsg = "";
    }
  }
}
