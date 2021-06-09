import { Component, OnInit } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { PartialBuildingRequestModel } from '../../Model/PartialBuildingRequestModel';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { PartialBuildingRequestService } from '../../Service/partial-building-request-service';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { PlanApprovalService } from 'src/modules/Plan-Approval/service/Plan-Approval.service';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { Guid } from 'guid-typescript';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';





@Component({
  selector: 'app-partial-building-request',
  templateUrl: './partial-building-request.component.html',
  styleUrls: ['./partial-building-request.component.css']
})
export class PartialBuildingRequestComponent extends EServicesBase<PartialBuildingRequestModel> implements OnInit {
  
  // Side Bar
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  selectedNode: FormHierarchyBase;
  formStructure: FormHierarchyBase[] = [
    { index: 1, label: "PartialBuildingRequest.RequestMainInfoTab", type: NodeType.Parent, children: [] },
  ];

  getContact: boolean = false;
  contactsList: ContactDetails[];

  getContract: boolean = false;

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  IsRequestValid: boolean = true;
  isCurrentCR: boolean = false;
  CurrentCR: CRModel={};

  CROwnerGridcols: GridColumn[] = [
    { header: "ContractSubmission.Name", field: "OwnerName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.Nationality", field: "Nationality", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.SharingPercentage", field: "SharingPercentage", typeConfig: { type: ColumnFieldType.Text } }
  ];

  getBuildingLicensesRegardingToContract: boolean = false;

  isCurrentContract:boolean = false;
  CurrentContract: ContractInfoModel;

  contactDetailsfromContract: ContactDetails[];
  gridcols: GridColumn[] = [
    { header: "PlanApproval.Name", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Mobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } }
  ];

  requestValidMsg: string;
  getBuildingLicenseValidation: boolean = false;

  PartialBuildingRequestId: string;

  isContractNumberReadOnly: boolean = true;
  isBuildingLicenseReadOnly: boolean = true;










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
        if (!this.Application.IsReadOnly) {
          if (node.index != this.ActiveLevelTwo) {
            this.ActiveLevelTwo = node.index;
          }
        }
        else {
          this.ActiveLevelTwo = node.index;
        }
        break;
    }
  }

  protected TApplicationNewInstance(): PartialBuildingRequestModel {
    return new PartialBuildingRequestModel();
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }
 

  constructor(
    public contractSubmissionService: ContractSubmissionService,
    public planApprovalService: PlanApprovalService,
    protected requestService: PartialBuildingRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService: Title) {
    super(requestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.titleService.setTitle("ECZA | Partial Building Request");
  }

  ngOnInit() {
    
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.translateService.get('moreValues').subscribe(
                  moreValues => {
                    this.config['placeholder'] = sel;
                    this.config['noResultsFound'] = no;
                    this.config['searchPlaceholder'] = search;
                    this.config['moreText'] = moreValues;
                  })
              })
          })
      });


    // Query String
    this.PartialBuildingRequestId = this.activatedRoute.snapshot.queryParams["Id"];

  }

  protected afterFormReady(): void {
    if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
      this.GetContactDetailsByCR();
      // New Request
      if (this.PartialBuildingRequestId == undefined) {
        this.cRChanged();
      }
      
    
    }
    else {
      this.GetCRsByTypeByContactId(1); // Investor
    }

    

    // Fill Grid
    debugger;
    if (this.Application.Request.Contacts != null 
      && this.Application.Request.Contacts.length > 0
      && this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
      this.onContactChange(this.Application.Request.Contacts);
    }

    this.FillLookups();

  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_constructioncontractstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_constructioncontractstatus" },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_legalstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_legalstatus" },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_ldv_pricingdate_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_pricingdate" },
    ];
  }

  protected GetContactDetailsByCR() {


    if (!this.getContact) {
      this.getContact = true
      this.requestService.getCRContacts(this.Application.Request.CRId).subscribe(
        res => {
          this.getContact = false;
          if (res.ResponseCode === ResponseCode.Success) {

            this.lookupService.handleRetrievedLookup(res.Content);
            if (this.Application.Request.Contacts != null &&
              this.Application.Request.Contacts.length > 0) {
              this.onContactChange(this.Application.Request.Contacts);
            }
          }

        }
      )
    }
  }

  onContactChange(contacts: string[]) {
    this.contactsList = [];
    
    for (let i = 0; i < contacts.length; i++) {
      const contactId = contacts[i];
      for (let j = 0; j < this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'].length; j++) {
        const contactDet = this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'][j];

        if (contactDet['Value'] == contactId) {
          this.contactsList.push(contactDet);

        }
      }

      this.contactsList[i].IsDeleted = false;
      this.contactsList[i].IsUpdated = false;
    }
  }

  protected GetContractsRelatedToCR() {

    //this.Application.Request.ContractNumberId = null;
    if (!this.getContract) {
      this.getContract = true
      this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
      this.requestService.GetContractsRelatedToCR(this.Application.Request.CRId).subscribe(
        res => {

          this.getContract = false;
          if (res.ResponseCode === ResponseCode.Success) {
            this.lookupService.handleRetrievedLookup(res.Content);
          }
        }
      )
    }
  }

  protected GetCRsByTypeByContactId(crType: number) {
    this.requestService.GetCRsByTypeByContactId(crType).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }

  cRChanged() {
    debugger;
    this.IsRequestValid = true;

    if (this.Application.Request.CRId != undefined) {
      this.GetContractsRelatedToCR();
      this.getCRInfo();
      this.GetContactDetailsByCR();
      this.ValidateContractNumberReadOnly();
    }
    else {
      this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
    }
  }

  protected getCRInfo() {
    
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
      if (results.ResponseCode === ResponseCode.Success) {
        //debugger;
        this.CurrentCR = results.Content.CR;
      

      }
      this.isCurrentCR = false;

    });
  }

  public contractChanged() {
    this.IsRequestValid = true;

    if (this.Application.Request.ContractNumberId != undefined) {
      this.GetBuildingLicensesRelatedToContract();
      this.getContractInfo();
      this.ValidateBuildingLicenseReadOnly();
    }
  }

  protected GetBuildingLicensesRelatedToContract() {
    this.getBuildingLicensesRegardingToContract = true;

    if (this.getBuildingLicensesRegardingToContract) {
      this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] = [];
      // change static id to requester id
      this.requestService.GetBuildingLicensesRelatedToContract(this.Application.Request.ContractNumberId).subscribe(
        res => {
          this.getBuildingLicensesRegardingToContract = false;
          if (res.ResponseCode === ResponseCode.Success)
            this.lookupService.handleRetrievedLookup(res.Content);
        }
      )
    }
  }

  getContractInfo() {

    this.isCurrentContract = true;
    this.planApprovalService.GetContractInfo(this.Application.Request.ContractNumberId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
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

  public buildingLicenseChanged() {
    this.IsRequestValid = true;
    this.requestValidMsg = undefined;


    if (this.Application.Request.BuildingLicenseId != undefined && this.Application.Request.BuildingLicense != Guid.EMPTY) {

      if (!this.getBuildingLicenseValidation) {
        this.getBuildingLicenseValidation = true;
        this.requestService.ValidateBuildingLicense(this.Application.Request.BuildingLicenseId).subscribe(
            res => {
              this.getBuildingLicenseValidation = false;
              if (res.ResponseCode === ResponseCode.Success) {
                this.IsRequestValid = true;
              }
              if (res.ResponseCode === ResponseCode.Error) {
                this.IsRequestValid = false;
                this.requestValidMsg = res.FriendlyResponseMessage;
              }
            });
      }
    }
    else{
      this.IsRequestValid = false;
    }
  }

  
  Submit() {
    debugger;
    if (this.ValidateBeforeSubmit()) {
      this.Application.Request.IsSubmitted = true;
      this.submitForm();
    }
    else {
      this.Application.IsSubmitted = true;
    }
  }

  ValidateBeforeSubmit() {


    return  this.Application.Request.CRId != undefined
      && this.Application.Request.CRId != Guid.EMPTY
      && this.Application.Request.ContractNumberId != undefined 
      && this.Application.Request.ContractNumberId != Guid.EMPTY
      && this.Application.Request.BuildingLicenseId != undefined
      && this.Application.Request.BuildingLicenseId != Guid.EMPTY;

  }

  FillLookups(){
    if(this.PartialBuildingRequestId != undefined){

      if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
        this.lookupService.lookupEntities['account_CRsByTypeInvestor'] = 
        [{ Text: this.Application.Request.CR.Name, Value: this.Application.Request.CRId }];
        this.getCRInfo();
      }

      if (this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != "") {
        this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = 
        [{ Text: this.Application.Request.ContractNumber.Name, Value: this.Application.Request.ContractNumberId }];
        this.getContractInfo();
        this.ActiveLevelOne = 2;
      }

      if (this.Application.Request.BuildingLicenseId != undefined && this.Application.Request.BuildingLicenseId != "") {
        this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] = 
        [{ Text: this.Application.Request.BuildingLicense.Name, Value: this.Application.Request.BuildingLicenseId }];
      }

      this.formStructure.push(
        { index: 2, label: "PartialBuildingRequest.CertificateDetailsTab", type: NodeType.Parent, children: [] },
      );

    }

  }

  protected ValidateContractNumberReadOnly() {
    if (this.Application.Request.CRId != undefined && this.PartialBuildingRequestId == undefined) {
      this.isContractNumberReadOnly = false;
    }
  }

  protected ValidateBuildingLicenseReadOnly() {
    if (this.Application.Request.ContractNumberId != undefined && this.PartialBuildingRequestId == undefined) {
      this.isBuildingLicenseReadOnly = false;
    }
  }

}
