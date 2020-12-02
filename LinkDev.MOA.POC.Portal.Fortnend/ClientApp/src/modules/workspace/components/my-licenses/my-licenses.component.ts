import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { IWorkspaceContracts } from '../../interfaces/WorkspaceContracts.interface';
import { NgForm } from '@angular/forms';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { TranslateService } from '@ngx-translate/core';
import { ILicenseFiltration } from '../../interfaces/LicenseFiltration.interface';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';

@Component({
  selector: 'app-my-licenses',
  templateUrl: './my-licenses.component.html',
  styleUrls: ['./my-licenses.component.css']
})
export class MyLicensesComponent implements OnInit {
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  CRs: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;
  licenseFilteration: ILicenseFiltration = new ILicenseFiltration;
  crType: number;
  error: boolean = false;
  errorMode: Mode = Mode.Error;
  constructor(
    public WorkspaceService: WorkspaceService,
    public lookupService: LookupService,
    public translateService: TranslateService) {
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.config['placeholder'] = sel;
                this.config['noResultsFound'] = no;
                this.config['searchPlaceholder'] = search;
              })
          }
        )
      });
  }
  ngOnInit() {

    this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) this.CRs = retrievedCRs; })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.GetLicenses();
    });
  }
  GetLicenses() {
    this.WorkspaceService.getCrID().subscribe(crID => {
      SharedHelper.showLoader();
      this.currentCR.Text = crID;
      if (this.currentCR.Text) {
        this.WorkspaceService.getCRS().subscribe(
          CRs => {
            if (CRs.length > 0) {
              this.crType = CRs.filter(cr => cr.Value == this.currentCR.Text)[0].CrType;
            }
          });
          if (this.crType == 1) {
            this.error = false;
            this.licenseFilteration.CRId = this.currentCR.Text;
            this.licenseFilteration.PageNumber = 1;
            this.WorkspaceService.setLicenseFiltration(this.licenseFilteration);
          } else {
            this.error = true;
            SharedHelper.hideLoader();
          }
      }
    }, error => {
      console.log("GetCRsID error");
    });
  }
  UpdateCr(e) {
    SharedHelper.showLoader();
    this.WorkspaceService.setCrID(e);
  }
  searchLicense(form: NgForm) {
    SharedHelper.showLoader();
    this.licenseFilteration.CRId = this.currentCR.Text;
    if (form.value.FromDate != undefined) {
      this.licenseFilteration.From = form.value.FromDate;
    }
    if (form.value.ToDate != undefined) {
      this.licenseFilteration.To = form.value.ToDate;
    }
    if (form.value.LicenseNumber != undefined) {
      this.licenseFilteration.LicenseNumber = form.value.LicenseNumber;
    }
    this.WorkspaceService.setLicenseFiltration(this.licenseFilteration);
  }
  resetSearch(f: NgForm) {
    SharedHelper.showLoader();
    f.reset();
    this.WorkspaceService.setLicenseFiltration(this.licenseFilteration);
  }
}
