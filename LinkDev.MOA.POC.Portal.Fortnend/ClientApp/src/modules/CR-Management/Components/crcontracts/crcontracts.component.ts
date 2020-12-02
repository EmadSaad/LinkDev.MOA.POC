import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridColumn } from '../../../shared/form-guide/grid/models/GridColumn';
import { CRServices } from '../../Services/CR-Services';
import { ColumnFieldType } from '../../../shared/form-guide/gridEmmitter/models/GridColumn';
import { CRContractsModal } from '../../Models/CRContractsModal';
import { CRContactDetails } from '../../Models/CRContactDetails';
import { debug } from 'util';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../shared/services';

@Component({
  selector: 'app-crcontracts',
  templateUrl: './crcontracts.component.html',
  styleUrls: ['./crcontracts.component.css']
})
export class CRContractsComponent implements OnInit {
  constructor(protected activatedRoute: ActivatedRoute,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    protected CRServices: CRServices,
    protected alertService: AlertService,) { }

  public contactDetails = new CRContractsModal();
  public ContactDetailsList: any[] = [];
  public ErrorMsg: string = "";
  public SuccessMsg: string = "";
  viewModeItems: boolean = false;
  editModeItems: boolean = false;
  @ViewChild('gridForm') gridForm: NgForm;

  public CRContractsList: CRContractsModal[] = [];
  gridcols: GridColumn[] = [
    { header: "CRManagement.ContractName", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.DurationInYears", field: "DurationInYears", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContractStartingDate", field: "StartDate", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContractExpiryDate", field: "EndDate", typeConfig: { type: ColumnFieldType.Text } },
  ];
  gridModel: CRContractsModal = new CRContractsModal();


  ContactDetailsgridcols: GridColumn[] = [
    { header: "CRManagement.ContactName", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContactEmail", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ContactMobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.CommuncationRole", field: "CommunicationRole", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ContratContactDetailsModel: CRContactDetails = new CRContactDetails();

  isPopUpOpened: boolean = false;
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "Select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };
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
    this.getCRContracts();
    this.getCRContactDetails();
  }

  getCRContracts() {
    SharedHelper.showLoader();
    var id = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getCRContracts(`CrId=${id}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else {
        debugger;
        this.CRContractsList = res.Content;
      }
    }, err => {
      this.ErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  getCRContactDetails() {
    //SharedHelper.showLoader();
    var id = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getCRContactDetails(`CrId=${id}`).subscribe(res => {
      debugger;
      this.ContactDetailsList = res.Content;
    }, err => {
      this.ErrorMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

  getContactDetilsInfo(event) {
    let _ContactDetailsList_ = this.gridModel.ContactDetailsList;
    this.contactDetails.Id = this.gridModel.Id;
    if (event.length > 2)
      this.gridForm.form.controls["ContactDetailsMutliselect"].setErrors({ 'incorrect': true });
    else {
      event.forEach(function (item) {
        var FoundedItem = _ContactDetailsList_.find(x => x.Id === item);
        if (FoundedItem == undefined) {
          var contactItem = new CRContactDetails();
          contactItem.Id = item;
          contactItem.IsUpdated = true;
          _ContactDetailsList_.push(contactItem);
        }
        else
          FoundedItem.IsUpdated = true;
      });
    }
    this.contactDetails.ContactDetailsList = _ContactDetailsList_;
  }

  updateContractContactDetailsRelation() {
    SharedHelper.showLoader();
    this.SuccessMsg = "";
    this.ErrorMsg = "";
    this.CRServices.updateContractContactDetailsRelation(this.contactDetails).subscribe(res => {
      if (res.Content) {
        this.SuccessMsg = "CRManagement.UpdateSuccessMeg";
        this.getCRContracts();
      }
      else
        this.ErrorMsg = res.FriendlyResponseMessage;
    },
      err => {
        this.ErrorMsg = err.error.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      });
  }

  ViewMode(e) {
    this.viewModeItems = e;
  }
  EditMode(e) {
    this.editModeItems = e;
  }

}
