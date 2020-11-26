import { Component, OnInit, ViewChild } from '@angular/core';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { LicenseService } from '../../services/license.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { TranslateService } from '@ngx-translate/core';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { BuildingLicenseInfo } from '../../interfaces/building-license-info';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { ContractorCr } from '../../interfaces/contractor-cr';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { NgForm, Validators } from '@angular/forms';
import { AddSafetyCrToLicenseRequest } from '../../interfaces/add-safety-cr-to-license-request';
import { AlertService } from 'src/modules/shared/services/alert.service';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit {

  @ViewChild('popupForm') myForm: NgForm;
  activeLevelOne = 1;
  activeLevelTwo = 1;
  safetyTypes: number[];
  formStructure: FormHierarchyBase[] = [];
  contractorsGridColumns: GridColumn[];
  licenseId: string;
  buildingLicenseInfo: BuildingLicenseInfo;
  documentSettings: DocumentSettingModel[] = [];
  contractContractorsAndConsultingOffice: ContractorCr[] = [];
  maximumContractorsConsultingOfficeNumber = 2;
  contractor: string;
  consultingOffice: any;
  safetyList: any[] = [];
  selectedSafety: any;
  addItemFailed: boolean;
  submissionInfo: string;
  submissionAlertClass: string;
  contractText: '';
  consultingOfficeText: '';
  tabText = 'Outputs.License.BuildingLicenseInfo';
  workspaceLabel: string;
  config = {
    displayKey: 'Text', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    placeholder: 'Service', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'Text'
  };
  constructor(private api: LicenseService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    protected lookupService: LookupService,
    private router: Router,
    protected alertService: AlertService) {
    this.buildingLicenseInfo = {};
    this.activatedRoute.queryParams.subscribe(p => {
      this.licenseId = p.Id;
      if (this.licenseId !== undefined && this.licenseId !== null) {
        SharedHelper.showLoader();
        this.getBuildingLicenseInfo();
        this.getContractorsAndConsultingOffices(false);
        this.getDocuments();
        this.getLookupTypes();

      } else {
        this.router.navigate(['/workspace']);

      }
    });
    this.contractorsGridColumns = [
      { header: 'Outputs.Contract.ContractsAndConsultingOffice.CRName', field: 'CRName', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.ContractsAndConsultingOffice.CRNumber', field: 'CRNumber', typeConfig: { type: ColumnFieldType.Text, } },
      {
        header: 'Outputs.Contract.ContractsAndConsultingOffice.RelationType',
        field: 'RelationType', typeConfig: { type: ColumnFieldType.Text, }
      },
      {
        header: 'Outputs.Contract.ContractsAndConsultingOffice.QualificationNumber',
        field: 'QualificationNumber', typeConfig: { type: ColumnFieldType.Text, }
      },
    ];
    this.formStructure.push({ index: 1, label: 'Outputs.License.BuildingLicenseInfo', type: NodeType.Parent });

    this.translate.get('SELECT').subscribe(
      sel => {
        this.translate.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.config['placeholder'] = sel;
            this.config['noResultsFound'] = no;
          }
        );
      }
    );
    this.translate.get('Outputs.License.Contractor').subscribe(
      cont => {
        this.contractText = cont;
      }
    );
    this.translate.get('Outputs.License.ConsultingOffice').subscribe(
      cont => {
        this.consultingOfficeText = cont;
      }
    );
    this.translate.get('WORKSPACE.Home').subscribe(res => {
      this.workspaceLabel = res;
    });
  }

  ngOnInit() {
  }
  onSelect(node: FormHierarchyBase) {
    if (node.index === 4) {
      const id = this.buildingLicenseInfo.ConstructionReport.Value;
      this.router.navigate(['/', 'Construction-Report-Request'], { queryParams: { Id: id } });
    }
    this.activeLevelOne = node.index;
    this.tabText = node.label;
  }

  getDocuments() {
    this.api.getLicenseDocuments(this.licenseId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.documentSettings = res.Content;
        this.formStructure.push({ index: 3, label: 'Outputs.License.Attachments', type: NodeType.Parent });
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  getContractorsAndConsultingOffices(showLoader: boolean) {
    if (showLoader) {
      SharedHelper.showLoader();
    }
    this.api.getBuildingLicenseContractorAndConsultingOffice(this.licenseId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.contractContractorsAndConsultingOffice = res.Content;
        let typeList = [];
        this.contractContractorsAndConsultingOffice.forEach(s => {
          s.IsDeleted = false;
          if (showLoader === false) {
            typeList.push(s.RelationTypeValue);
          }
        });
        if (showLoader === false) {
          this.safetyList.push({ 'Text': this.contractText, 'Value': 3 });
          this.safetyList.push({ 'Text': this.consultingOfficeText, 'Value': 5 });
          this.formStructure.push({ index: 2, label: 'Outputs.License.ContractorsAndConsultingOffice', type: NodeType.Parent });
        }

        // if (typeList.length === 0) {
        //   this.safetyList.push({ 'Text': this.contractText, 'Value': 3 });
        //   this.safetyList.push({ 'Text': this.consultingOfficeText, 'Value': 5 });

        // } else if (typeList.length < 2) {
        //   const type = typeList[0];
        //   if (type === 3) {
        //     this.safetyList.push({ 'Text': this.consultingOfficeText, 'Value': 5 });

        //   } else if (type === 5) {
        //     this.safetyList.push({ 'Text': this.contractText, 'Value': 3 });

        //   }
        // }
      }
      if (showLoader) {
        SharedHelper.hideLoader();
      }
    }, error => {

      if (showLoader) {
        SharedHelper.showLoader();
      }
      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = error.FriendlyResponseMessage;
    });
  }
  getBuildingLicenseInfo() {
    this.api.getBuildingLicenseInfo(this.licenseId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.buildingLicenseInfo = res.Content;
        if (this.buildingLicenseInfo.ConstructionReport) {
          this.formStructure.push({ index: 4, label: 'Outputs.License.MonthlyReport', type: NodeType.Parent });

        }
        SharedHelper.hideLoader();
      } else {
        SharedHelper.hideLoader();
        this.alertService.error(res.FriendlyResponseMessage, 'workspace', this.workspaceLabel);
        this.router.navigateByUrl('/notification');
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  safetySelectionChanged(value) {
    this.setRequired(value);
  }
  getLookupTypes() {
    this.api.getRequiredLookups(this.licenseId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        const lookups = res.Content;
        this.lookupService.handleRetrievedLookup(lookups);
      }
    });
  }
  addSafety(value) {
    let crId: string;
    if (this.selectedSafety === 3) {
      crId = this.contractor;
    } else {
      crId = this.consultingOffice;
    }
    const request: AddSafetyCrToLicenseRequest = { LicenseId: this.licenseId, CRId: crId, Role: this.selectedSafety };
    SharedHelper.showLoader();
    this.api.addSafetyToLicense(request).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        if (res.Content === true) {
          this.getContractorsAndConsultingOffices(true);
        }
      } else {
        this.submissionAlertClass = 'alert-danger';
        this.submissionInfo = res.FriendlyResponseMessage;
        SharedHelper.hideLoader();

      }
    }, error => {
      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }
  setRequired(selectedSafety: number) {
    let formControlName = '';
    let removeRequiredNumber;
    if (selectedSafety === 5) {
      formControlName = 'safetyConsulting';
      removeRequiredNumber = 3;
    } else {
      formControlName = 'safetyContractor';
      removeRequiredNumber = 5;

    }
    this.removeRequired(removeRequiredNumber);
    this.myForm.form.get(formControlName).setValidators([Validators.required]);
    this.myForm.form.get(formControlName).updateValueAndValidity();

  }
  removeRequired(selectedSafety: number) {
    let formControlName = '';
    if (selectedSafety === 5) {
      formControlName = 'safetyConsulting';
    } else {
      formControlName = 'safetyContractor';

    }
    this.myForm.form.get(formControlName).clearValidators();
    this.myForm.form.get(formControlName).setValue('');
    this.myForm.form.get(formControlName).updateValueAndValidity();
  }
  modalClosed(eventArgs) {
    this.myForm.form.updateValueAndValidity();
    this.myForm.form.get('safetyContractor').setValue('');
    this.myForm.form.get('safetyConsulting').setValue('');
    this.myForm.form.get('safetyType').setValue('');

  }
}
