import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CRServices } from '../../Services/CR-Services';
import { CRsInfo } from '../../Models/CRsInfo';
import { LookupService } from '../../../shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';
import { ConfigService } from '../../../shared/Services/Config-Service/config-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-CrDetails',
  templateUrl: './CrDetails.component.html',
  styleUrls: ['./CrDetails.component.css']
})
export class CrDetailsComponent implements OnInit {

  public MyCurrentCR: CRsInfo;
  public UpdateMsgClass: string = ""
  public UpdateMsg: string = "";

  @Output() CRNameOutput: EventEmitter<string> = new EventEmitter();
  @Output() CRNumberOutput: EventEmitter<string> = new EventEmitter();
  @Output() CRCityOutput: EventEmitter<string> = new EventEmitter();

  public emailValidationPattern: string = "";
  public PhoneValidationPattern: string = "";
  @ViewChild('CrDetailsForm') CrDetailsForm: NgForm;
  public RetrieveOptionsObject: RetrieveOptionsRequest[] = [{ EntityName: "account", CachingKey: "account_ldv_facilitytype_OptionSet", OptionSetName: "ldv_facilitytype", Mode: LookupRequestMode.OptionSet }];
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "----",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  constructor(protected CRServices: CRServices,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
    this.emailValidationPattern = ConfigService.EmailValidationPattern
    this.PhoneValidationPattern = ConfigService.NewPhoneValidationPattern;
  }

  ngOnInit() {
    this.MyCurrentCR = new CRsInfo();
    this.getCrInfo();
    this.lookupService.loadLookups(this.RetrieveOptionsObject).subscribe();
  }

  getCrInfo() {
    SharedHelper.showLoader();
    let CRId = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.GetCRDetails(`CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else {
        this.MyCurrentCR = res.Content;
        this.CRNameOutput.emit(this.MyCurrentCR.CRName);
        this.CRNumberOutput.emit(this.MyCurrentCR.CrNumber);
        this.CRCityOutput.emit(this.MyCurrentCR.CrCity);
      }
    },
      err => {
        this.UpdateMsgClass = "alert alert-danger"
        this.UpdateMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
  }

  UpdateCR() {
    this.UpdateMsg = ""
    SharedHelper.showLoader();
    this.CRServices.UpdateCR(this.MyCurrentCR).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (!res.Content.IsResponsefail) {
        this.UpdateMsgClass = "alert alert-success"
        this.UpdateMsg = res.Content.ResponseMsg
      }
      else {
        this.UpdateMsgClass = "alert alert-danger"
        this.UpdateMsg = res.Content.ResponseMsg
      }
     
    },
      err => {
        this.UpdateMsgClass = "alert alert-danger"
        this.UpdateMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
  }
}
