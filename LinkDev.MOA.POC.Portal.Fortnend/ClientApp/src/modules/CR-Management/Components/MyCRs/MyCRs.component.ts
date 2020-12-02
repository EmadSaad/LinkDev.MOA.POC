import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CRServices } from '../../Services/CR-Services';
import { CRsInfo, ILISICActivities } from '../../Models/CRsInfo';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { GridColumn, ColumnFieldType } from '../../../shared/form-guide/grid/models/GridColumn';


@Component({
  selector: 'app-MyCRs',
  templateUrl: './MyCRs.component.html',
  styleUrls: ['./MyCRs.component.css']
})
export class MyCRsComponent implements OnInit {
  closeResult = '';
  submit: boolean;
  public RetrieveOptionsObject: RetrieveOptionsRequest[] = [{
    EntityName: "account", CachingKey: "account_ldv_facilitytype_OptionSet", OptionSetName: "ldv_facilitytype", Mode: LookupRequestMode.OptionSet
  }];
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "Select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  public CRType: string;
  public CRTypeDescription: string
  public CRs: CRsInfo[] = [];
  public ContactCrs: any[] = [];
  public IsCrNumberValid: boolean = false;
  public IsCrTypeValid: boolean = false;
  public CrNumbertxt: string;
  public isShown: boolean = false;
  public Msg: string = "";
  public ResponseObject: CRsInfo;
  public MyCurrentCR: CRsInfo = new CRsInfo();
  public CRActivity: ILISICActivities[] = [];
  CRTypeslookupEntities: any[] = [];
  isPopUpOpened: boolean = false;

  constructor(protected CRServices: CRServices,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
  }
  ISICActivitygridcols: GridColumn[] = [
    { header: "CRManagement.IlActivitydivision", field: "Division", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityClass", field: "Class", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityName", field: "Activity", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ILISICCode", field: "ISICCode", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ISICActivitygridModel: ILISICActivities = new ILISICActivities();


  closeModal(modal, CRDetails: NgForm) {
    CRDetails.reset();
    this.CRActivity = [];
    modal.close();
    console.log(CRDetails)
    if (this.isShown) this.isShown = !this.isShown;
  }

  ngOnInit() {
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
    this.getContactCrs();
    this.lookupService.loadLookups(this.RetrieveOptionsObject).subscribe(result => {
      //
      this.lookupService.lookupEntities['account_ldv_facilitytype_OptionSet'].forEach(element => {
        // Exclude "محل تجارى" & "مستثمر اجنبى"
        if (element.Value !== "5" && element.Value !== "3")
          this.CRTypeslookupEntities.push(element);
      });
    });
    this.getContactCRFromIntegration();
  }

  // Services
  getCrInfo(CRNumber) {
    debugger;
    if (CRNumber != null) {
      SharedHelper.showLoader();
      this.CRServices.getCRByCrNumber(`CRnumber=${CRNumber}`).subscribe(res => {
        SharedHelper.hideLoader();
        if (res.FriendlyResponseMessage != null) {
          if (!this.isShown) this.isShown = !this.isShown;
          this.alertService.error(res.FriendlyResponseMessage);
          this.router.navigate(['/notification']);
        }
        else if (res.Content.IsResponsefail) {
          if (!this.isShown) this.isShown = true;
          this.Msg = res.Content.ResponseMsg;
          this.MyCurrentCR = res.Content;
          this.MyCurrentCR.CRTypeName = CRNumber;
          this.CRActivity = res.Content.ISICActivities;
        }
        else {
          if (this.isShown) this.isShown = !this.isShown;
          this.MyCurrentCR = res.Content;
          this.MyCurrentCR.CRTypeName = CRNumber;
          this.CRActivity = res.Content.ISICActivities;
        }
      },
        err => {
          if (!this.isShown) this.isShown = !this.isShown;
          SharedHelper.hideLoader();
        })
    }
  }

  getContactCrs() {
    debugger;
    SharedHelper.showLoader();
    this.CRServices.getContactCRs().subscribe(res => {
      this.CRs = res.Content;
      SharedHelper.hideLoader();
    }, err => {
      SharedHelper.hideLoader();
    });
  }

  PostCRdata(CRDetails: NgForm) {
    if (this.MyCurrentCR.ISICActivities.length == 0) {
      if (!this.isShown) this.isShown = true;
      this.Msg = "CRManagement.CRNotHaveISIC";
    }
    else {
      if (this.isShown) this.isShown = !this.isShown;
      this.submit = true;
      SharedHelper.showLoader();
      this.CRServices.PostContactCR(this.MyCurrentCR).subscribe(res => {
        debugger;
        SharedHelper.hideLoader();
        this.ResponseObject = res.Content;
        if (this.ResponseObject.IsResponsefail) {
          if (!this.isShown) this.isShown = !this.isShown;
          this.Msg = this.ResponseObject.ResponseMsg;
        }
        else {
          if (this.isShown) this.isShown = !this.isShown;
          this.MyCurrentCR = res.Content;
          this.CRs.push(this.MyCurrentCR);
          this.router.navigateByUrl('CR-Managment/CrDetails?CrId=' + this.MyCurrentCR.Id);
          this.modalService.dismissAll();
        }

      }, err => {
        if (!this.isShown) this.isShown = !this.isShown;
        this.Msg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
      CRDetails.reset();
    }

  }

  getContactCRFromIntegration() {
    SharedHelper.showLoader();
    this.CRServices.GetCRsByContactFromIntegration().subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        if (!this.isShown) this.isShown = !this.isShown;
        this.Msg = res.FriendlyResponseMessage;
      }
      else {
        if (res.Content.length == 0) {
          if (!this.isShown) this.isShown = true;
          this.Msg = "CRManagement.ContactNotHaveCR";
        }
        else {
          if (this.isShown) this.isShown = !this.isShown;
          this.ContactCrs = res.Content;
        }
      }
    }, err => {
      if (!this.isShown) this.isShown = true;
      this.Msg = "CRManagement.ContactNotHaveCR";
      SharedHelper.hideLoader();
    });
  }


  getCRTypeOptionSet() {
    return this.CRTypeslookupEntities;
  }

  GetSelectedValue(SelectedValue) {
    if (SelectedValue != null) {
      this.MyCurrentCR.CRTypeValue = SelectedValue;
      this.IsCrTypeValid = true;
      if (SelectedValue == "1")
        this.CRTypeDescription = "CRTypes.Investor";
      else if (SelectedValue == "2")
        this.CRTypeDescription = "CRTypes.InvestorForPrivateCity";
      else if (SelectedValue == "4")
        this.CRTypeDescription = "CRTypes.GovernmentalAgency";
      else if (SelectedValue == "6")
        this.CRTypeDescription = "CRTypes.ConsultingOffice";
      else if (SelectedValue == "7")
        this.CRTypeDescription = "CRTypes.Contractor";
    }
    else this.IsCrTypeValid = false;
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //this.CRDetails.reset();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //this.CRDetails.reset();
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
