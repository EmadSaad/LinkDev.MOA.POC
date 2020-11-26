import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services/alert.service';
import { OperatingLicenseService } from 'src/modules/outputs/services/operatinglicense.service';
import { OperatingLicenseModel } from 'src/modules/Operating-License-Request/Model/OperatingLicenseModel';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { PlanApprovalService } from 'src/modules/Plan-Approval/service/Plan-Approval.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ColumnFieldType, GridColumn } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { AddedContractsModel } from 'src/modules/Operating-License-Request/Model/AddedContractsModel';




@Component({
  selector: 'app-operating-license-details',
  templateUrl: './operating-license-details.component.html',
  styleUrls: ['./operating-license-details.component.css']
})
export class OperatingLicenseDetailsComponent implements OnInit {

  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  selectedNode: FormHierarchyBase;
  CertificateDetails: OperatingLicenseModel;
  certificateContactsList: ContactDetails[];
  licenseId: string;
  formStructure: FormHierarchyBase[] = [
    { index: 1, label: 'Outputs.OperatingLicense.CertificateDetails', type: NodeType.Parent }
  ];

  isCurrentContract: boolean = false;
  CurrentContract: ContractInfoModel;
  contactDetailsfromContract: ContactDetails[];
  getContact = false;

  ContractGridCols: GridColumn[] = [
    { header: "ModonContract.ContractNumber", field: "ContractNumber", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ModonContract.LandNumber", field: "LandNumber", typeConfig: { type: ColumnFieldType.Text } }
  ];
  ContractGridModel: AddedContractsModel;

  gridcols: GridColumn[] = [
    { header: "PlanApproval.Name", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Mobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } }
  ];




  config = {
    displayKey: 'Text', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    placeholder: 'Service', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'Text'
  };

  constructor(private operatingLicenseService: OperatingLicenseService,
    public planApprovalService: PlanApprovalService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public lookupService: LookupService,
    private router: Router,
    protected alertService: AlertService) {
    this.CertificateDetails = new OperatingLicenseModel();
    this.activatedRoute.queryParams.subscribe(p => {
      this.licenseId = p.Id;
      if (this.licenseId !== undefined && this.licenseId !== null) {
        //SharedHelper.showLoader();
        this.getLookupTypes();
        this.GetOperatingLicense(this.licenseId);
      } else {
        this.router.navigate(['/workspace']);
      }
    });



  }

  ngOnInit() {
    this.loadLookups();
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {

    return [
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_constructioncontractstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_constructioncontractstatus" },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_legalstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_legalstatus" },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_pricingdate_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_pricingdate" },
    ];
  }

  onSelect = (node: FormHierarchyBase) => {

    this.ActiveLevelTwo = undefined;
    switch (node.type) {
      case NodeType.Parent:
        this.ActiveLevelOne = node.index;
        if (this.ActiveLevelOne == 1) {
          this.ActiveLevelTwo = 1;
        }
        break;
      case NodeType.Child:
        if (node.index != this.ActiveLevelTwo) {
          this.ActiveLevelTwo = node.index;
        }
        else {
          this.ActiveLevelTwo = node.index;
        }
        break;
    }
  }

  GetOperatingLicense(LicenseId) {

    this.operatingLicenseService.GetOperatingLicense(LicenseId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          debugger;
          this.CertificateDetails = res.Content;
          if (this.CertificateDetails && this.CertificateDetails.ContractNumberId) {
            this.getContractInfo(this.CertificateDetails.ContractNumberId);
          }
          if(this.CertificateDetails && this.CertificateDetails.CRId){
            this.GetContactDetailsByCR(this.CertificateDetails.CRId);
          }

          this.CertificateDetails.AddedContracts.forEach(element => {
            element.IsDeleted = false;
            element.IsUpdated = false;
          });
          
        }
      }
    )
  }

  onCertificateContactChange(contacts: string[]) {

    this.certificateContactsList = [];

    for (let i = 0; i < contacts.length; i++) {
      const contactId = contacts[i];
      for (let j = 0; j < this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'].length; j++) {

        const contactDet = this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'][j];

        if (contactDet['Value'] == contactId) {
          this.certificateContactsList.push(contactDet);

        }
      }

      this.certificateContactsList[i].IsDeleted = false;
      this.certificateContactsList[i].IsUpdated = false;
    }
  }

  getContractInfo(contractId) {

    this.isCurrentContract = true;
    this.planApprovalService.GetContractInfo(contractId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          debugger;
          //Add Here ya Omar :D 
          this.CurrentContract = res.Content;

          let constructionStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_constructioncontractstatus_OptionSet"];
          let legalStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_legalstatus_OptionSet"];
          let PricingDateOS = this.lookupService.lookupEntities["ldv_contract_ldv_pricingdate_OptionSet"];

          this.CurrentContract.ConstructionContractStatus = constructionStatusOS.filter(c => c.Value == this.CurrentContract.ConstructionContractStatus)[0] ? constructionStatusOS.filter(c => c.Value == this.CurrentContract.ConstructionContractStatus)[0].Text : null;
          this.CurrentContract.LegalStatus = legalStatusOS.filter(c => c.Value == this.CurrentContract.LegalStatus)[0] ? legalStatusOS.filter(c => c.Value == this.CurrentContract.LegalStatus)[0].Text : null;
          this.CurrentContract.Pricingdate = PricingDateOS.filter(c => c.Value == this.CurrentContract.Pricingdate)[0] ? PricingDateOS.filter(c => c.Value == this.CurrentContract.Pricingdate)[0].Text : null;

          if (this.CurrentContract.Contacts && this.CurrentContract.Contacts.length > 0) {
            this.contactDetailsfromContract = this.CurrentContract.Contacts[0].Result;
            this.contactDetailsfromContract.forEach(x => {
              x.IsDeleted = false;
              x.IsUpdated = false;
            })
          }
          else {
            this.contactDetailsfromContract = null;
          }

        }

        this.isCurrentContract = false;

      }
    );
  }

  ContractGridChanged(event) {

    this.CurrentContract = null;
    if (event.ContractId) {
      this.getContractInfo(event.ContractId);
    }
  }




  protected loadLookups(): void {
    let lookups = this.getLookupTypes();
    if (lookups && lookups.length > 0) {
      this.lookupService.loadLookups(lookups).subscribe(result => {
      });
    }

  }

  protected GetContactDetailsByCR(cRId) {


    if (!this.getContact) {
      this.getContact = true
      this.operatingLicenseService.getCRContacts(cRId).subscribe(
        res => {
          this.getContact = false;
          if (res.ResponseCode === ResponseCode.Success) {
            debugger;
            this.lookupService.handleRetrievedLookup(res.Content);
            // Fill Grid
          if (this.CertificateDetails.Contacts != null
            && this.CertificateDetails.Contacts.length > 0
            && this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
            this.onCertificateContactChange(this.CertificateDetails.Contacts);
          }
          }

        }
      )
    }
  }

}
