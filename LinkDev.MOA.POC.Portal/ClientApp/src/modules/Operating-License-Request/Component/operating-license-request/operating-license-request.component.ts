import { Component, OnInit } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
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
import { CRMStatusCodeEnum, OperatingLicenseRequestModel } from '../../Model/OperatingLicenseRequestModel';
import { OperatingLicenseRequestService } from '../../Service/operating-license-request-service';
import { OperatingLicenseModel } from '../../Model/OperatingLicenseModel';
import { CircleManager } from '@agm/core';
import { AddedContractsModel } from '../../Model/AddedContractsModel';





@Component({
  selector: 'app-operating-license-request',
  templateUrl: './operating-license-request.component.html',
  styleUrls: ['./operating-license-request.component.css']
})
export class OperatingLicenseRequestComponent extends EServicesBase<OperatingLicenseRequestModel> implements OnInit {

  // Side Bar
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  selectedNode: FormHierarchyBase;
  formStructure: FormHierarchyBase[] = [
    { index: 1, label: "OperatingLicenseRequest.RequestMainInfo", type: NodeType.Parent, children: [] },
  ];

  IsMaintenanceDateValid: boolean = true;
  getContact: boolean = false;
  contactsList: ContactDetails[];
  certificateContactsList: ContactDetails[];
  getContract: boolean = false;
  ContractsList:ContractInfoModel[];

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  IsRequestValid: boolean = true;
  IsCRContractsBalanceValid: boolean = true;
  isCurrentCR: boolean = false;
  CurrentCR: CRModel = {};

  CROwnerGridcols: GridColumn[] = [
    { header: "ContractSubmission.Name", field: "OwnerName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.Nationality", field: "Nationality", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.SharingPercentage", field: "SharingPercentage", typeConfig: { type: ColumnFieldType.Text } }
  ];

  getBuildingLicensesRegardingToContract: boolean = false;

  isCurrentContract: boolean = false;
  CurrentContract: ContractInfoModel;

  contactDetailsfromContract: ContactDetails[];
  gridcols: GridColumn[] = [
    { header: "PlanApproval.Name", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Mobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } }
  ];

  ContractGridCols: GridColumn[] = [
    { header: "ModonContract.ContractNumber", field: "ContractNumber", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ModonContract.LandNumber", field: "LandNumber", typeConfig: { type: ColumnFieldType.Text } }
  ];
  ContractGridModel:AddedContractsModel;

  requestValidMsg: string;
  crContractBalanceValidMsg: string;
  getContractValidation: boolean = false;

  OperatingLicenseRequestId: string;

  isContractNumberReadOnly: boolean = true;
  isBuildingLicenseReadOnly: boolean = true;

  isSubmitDraft: boolean = false;
  isShowModonComment: boolean = false;

  cRMStatusCodeEnum = CRMStatusCodeEnum;

  disableDraft: boolean = true;
  isShowOldLicenseNumber: boolean = false;
  isOldLicenseHasValue: boolean = false;

  CertificateDetails: OperatingLicenseModel;

  //MhrezAddedContracts: AddedContractsModel[];













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

  protected TApplicationNewInstance(): OperatingLicenseRequestModel {
    return new OperatingLicenseRequestModel();
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }


  constructor(
    public contractSubmissionService: ContractSubmissionService,
    public planApprovalService: PlanApprovalService,
    protected requestService: OperatingLicenseRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService: Title) {
    super(requestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.titleService.setTitle("ECZA | Operating License Request");
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
    this.OperatingLicenseRequestId = this.activatedRoute.snapshot.queryParams["Id"];

    this.CertificateDetails = new OperatingLicenseModel();
    //this.MhrezAddedContracts = [];
  }

  protected afterFormReady(): void {

    if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
      this.GetContactDetailsByCR();
      // New Request
      if (this.OperatingLicenseRequestId == undefined) {
        this.cRChanged();
      }


    }
    else {
      this.GetCRsByTypeByContactId(1); // Investor
    }



    // Fill Grid

    if (this.Application.Request.Contacts != null
      && this.Application.Request.Contacts.length > 0
      && this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
      this.onContactChange(this.Application.Request.Contacts);
    }

    this.setStages(); // Must Before FillLookups() because stage sorting
    this.FillLookups();

    //this.ValidateIsShowOldLicenseNumber();

  }

  protected onSaveFormSuccess() {
    debugger;
    // disableDraft: only Reload in case Save as Draft 
    if (this.OperatingLicenseRequestId == undefined && this.disableDraft == false && this.Application.Request.IsSubmitted != true) {
      window.location.reload();
    }
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

  onCertificateContactChange(contacts: string[]) {
    debugger;
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

  protected GetValidateCRContractsBalances() {
    this.requestService.GetValidateCRContractsBalances(this.Application.Request.CRId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success){
          if (res.Content.IsValid === false) {
            this.IsRequestValid = false;
            this.IsCRContractsBalanceValid = false;
            this.crContractBalanceValidMsg = res.Content.ErrorMessage;
          }
          else{
            this.IsCRContractsBalanceValid = true;
          }
        }
          
      }
    )
  }

  cRChanged() {

    this.IsRequestValid = true;

    if (this.Application.Request.CRId != undefined) {
      this.GetValidateCRContractsBalances();
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
        this.CurrentCR = results.Content.CR;
      }
      this.isCurrentCR = false;

    });
  }

  public contractChanged() {
    this.IsRequestValid = true;
    this.requestValidMsg = undefined;

    if (this.Application.Request.ContractNumberId != undefined 
      && this.Application.Request.BuildingLicenseNumberId != Guid.EMPTY) {
      this.GetBuildingLicensesRelatedToContract();
      this.getContractInfo(this.Application.Request.ContractNumberId);
      this.ValidateBuildingLicenseReadOnly();
      this.validateContract(this.Application.Request.ContractNumberId);
    }
    else {
      this.IsRequestValid = false;
    }
  }

  public validateContract(contractNumberId) {
    debugger;
    if (this.OperatingLicenseRequestId == undefined) {
      if (!this.getContractValidation) {
        this.getContractValidation = true;
        this.requestService.ValidateOperatingLicenseRequest(this.Application.Request.ContractNumberId).subscribe(
          res => {
            this.getContractValidation = false;
            if (res.ResponseCode === ResponseCode.Success) {
              this.IsRequestValid = true;
              // Fill License Type
              this.lookupService.lookupEntities['ldv_operatinglicensetype_LookupWithId'] =
                [{ Text: res.Content.LicenseTypeName, Value: res.Content.LicenseTypeId }];
              this.Application.Request.LicenseTypeId = res.Content.LicenseTypeId;
              if (res.Content.IsNew === false) {
                this.isShowOldLicenseNumber = true;
                // Fill Old License 
                debugger;
                this.lookupService.lookupEntities['ldv_operatinglicensesbuildingcompletioncert_LookupWithId'] =
                  [{ Text: res.Content.OldLicenseNumber, Value: res.Content.OldLicenseNumberId }];
                this.Application.Request.OldLicenseNumberId = res.Content.OldLicenseNumberId;
              }

            }
            if (res.ResponseCode === ResponseCode.Error) {
              this.IsRequestValid = false;
              this.requestValidMsg = res.FriendlyResponseMessage;
              this.Application.Request.OldLicenseNumberId = undefined;
              this.Application.Request.LicenseTypeId = undefined;
              this.Application.Request.BuildingLicenseNumberId = undefined;
            }
          });
      }
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

  getContractInfo(contractId) {

    this.isCurrentContract = true;
    this.planApprovalService.GetContractInfo(contractId).subscribe(
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

   CompareMaintenanceContractEndDate() : boolean{
    debugger;
    //Naglaa
    if(this.Application.Request &&  this.Application.Request.MaintenanceContractEndDate){
      var d = new Date();
      d.setMonth(d.getMonth() + 3);
     
      var maintenanceDate = new Date(this.Application.Request.MaintenanceContractEndDate.year, 
      this.Application.Request.MaintenanceContractEndDate.month - 1, 
      this.Application.Request.MaintenanceContractEndDate.day);

      if(maintenanceDate <= d ){
        this.IsMaintenanceDateValid = false;
        return false;
      }
      this.IsMaintenanceDateValid = true;

      return true;
    
    }
  }
  SaveAsDraft() {
    debugger;
    this.isSubmitDraft = true;
    this.Application.IsSubmitted = false;
    
    if(this.Application.Request.MaintenanceContractEndDate
      && this.CompareMaintenanceContractEndDate()){

      }

    if (this.ValidateBeforeSubmit()) {
      if(this.Application.Request.MaintenanceContractEndDate){
        if(this.CompareMaintenanceContractEndDate()){
           this.saveApplication();
        }
      } 
      else{
        this.saveApplication();
      }     
    }
  }

  Submit() {
    debugger;
    let x = this.Application.Request.MaintenanceContractEndDate;
    if (this.ValidateBeforeSubmit() && this.Application.Request.MaintenanceContractEndDate
      && this.CompareMaintenanceContractEndDate()
      && this.validateDocuments()) {
        debugger;
      this.Application.Request.IsSubmitted = true;
      this.submitForm();
    }
    else {
      this.Application.IsSubmitted = true;
    }
  }

  ValidateBeforeSubmit() {
    debugger;
    if (this.isShowOldLicenseNumber) {
      this.isOldLicenseHasValue = this.Application.Request.OldLicenseNumberId != undefined
        && this.Application.Request.OldLicenseNumberId != Guid.EMPTY
    }
    else{
      this.isOldLicenseHasValue = true;
    }

    return this.IsRequestValid 
      && this.Application.Request.CRId != undefined
      && this.Application.Request.CRId != Guid.EMPTY
      && this.Application.Request.ContractNumberId != undefined
      && this.Application.Request.ContractNumberId != Guid.EMPTY
      && this.Application.Request.BuildingLicenseNumberId != undefined
      && this.Application.Request.BuildingLicenseNumberId != Guid.EMPTY
      && this.Application.Request.LicenseTypeId != undefined
      && this.Application.Request.LicenseTypeId != Guid.EMPTY
      && this.isOldLicenseHasValue;
  }

  protected validateDocuments(): boolean {
    let areDocumentsValid = true;
    if(this.Application.Documents)
    {
      let documentsToValidate = this.Application.Documents.filter(x => x.IsVisible);
      for(let i=0; i< documentsToValidate.length; i++)
      {
        let currentDocument = documentsToValidate[i];
        currentDocument.Errors = [];
         if(currentDocument.IsRequired && (!currentDocument.Files || currentDocument.Files.filter(x => x.IsDeleted !== true).length ===0))
         {
           currentDocument.Errors.push("Validations.Required");
           areDocumentsValid = false;
           break;
         }
         if(currentDocument.MinAllowedFiles && currentDocument.Files.filter(x => x.IsDeleted !== true).length < currentDocument.MinAllowedFiles)
         {
           currentDocument.Errors.push("Documents.ValidationMinNumberOfFiles");
           areDocumentsValid = false;
         }
      }
    }
    return areDocumentsValid;
   }

  FillLookups() {
    debugger;
    if (this.OperatingLicenseRequestId != undefined) {

      if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
        this.lookupService.lookupEntities['account_CRsByTypeInvestor'] =
          [{ Text: this.Application.Request.CR.Name, Value: this.Application.Request.CRId }];
        this.getCRInfo();
      }

      if (this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != "") {
        this.lookupService.lookupEntities['ldv_contract_LookupWithId'] =
          [{ Text: this.Application.Request.ContractNumber.Name, Value: this.Application.Request.ContractNumberId }];
        this.getContractInfo(this.Application.Request.ContractNumberId);
      }

      if (this.Application.Request.BuildingLicenseNumberId != undefined && this.Application.Request.BuildingLicenseNumberId != "" && this.Application.Request.BuildingLicenseNumberId != Guid.EMPTY) {
        this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] =
          [{ Text: this.Application.Request.BuildingLicenseNumber.Name, Value: this.Application.Request.BuildingLicenseNumberId }];
      }

      if (this.Application.Request.LicenseTypeId != undefined && this.Application.Request.LicenseTypeId != "") {
        this.lookupService.lookupEntities['ldv_operatinglicensetype_LookupWithId'] =
          [{ Text: this.Application.Request.LicenseTypeName, Value: this.Application.Request.LicenseTypeId }];
      }


      if (this.Application.Request.OldLicenseNumberId != undefined && this.Application.Request.OldLicenseNumberId != "" && this.Application.Request.OldLicenseNumberId != Guid.EMPTY) {
        debugger;
        this.isShowOldLicenseNumber = true;
        this.lookupService.lookupEntities['ldv_operatinglicensesbuildingcompletioncert_LookupWithId'] =
          [{ Text: this.Application.Request.OldLicenseNumber.Name, Value: this.Application.Request.OldLicenseNumberId }];

      }

      this.formStructure.push(
        { index: 3, label: "OperatingLicenseRequest.RequestComments", type: NodeType.Parent, children: [] },
      );

    }

  }

  protected ValidateContractNumberReadOnly() {
    if (this.Application.Request.CRId != undefined && this.OperatingLicenseRequestId == undefined) {
      this.isContractNumberReadOnly = false;
    }
  }

  protected ValidateBuildingLicenseReadOnly() {
    if (this.Application.Request.ContractNumberId != undefined && this.OperatingLicenseRequestId == undefined) {
      this.isBuildingLicenseReadOnly = false;
    }
  }

  protected setStages() {

    // console.log("IsRequestValid " +  this.IsRequestValid);
    // console.log("disableDraft " +  this.disableDraft);
    // console.log("Naglaa " +  !this.IsRequestValid || this.disableDraft);
    debugger;
    if (this.Application.ApplicationHeader == null) {
      this.disableDraft = false;
    }

    if (this.OperatingLicenseRequestId != undefined && this.OperatingLicenseRequestId != Guid.EMPTY) {

      this.ActiveLevelOne = null;
      this.ActiveLevelTwo = null;



      // مسودة
      if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.Draft.toString()) {
        this.ActiveLevelOne = 1;
        this.disableDraft = false;

      }

      // معلقة علي المستثمر
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingOnInvestor.toString()) {
        this.ActiveLevelOne = 1;
        this.isShowModonComment = true;

      }

      // قرار مسئول المدينة الصناعية || قرار مسئول المدينة الصناعية على الطلب الفورى
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.AdminDecisionOnImmediateRequest.toString()
        || this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.AdminDecision.toString()) {
        this.Application.IsReadOnly = true;
        this.Application.IsSubmitted = true;
        this.ActiveLevelOne = 1;
      }
      // تم التنفيذ
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.Completed.toString()) {
        this.formStructure.push(
          { index: 2, label: "OperatingLicenseRequest.CertificateDetailsTab", type: NodeType.Parent, children: [] },
        );
        this.ActiveLevelOne = 2;
        this.Application.IsReadOnly = true;
        if (this.Application.Request.OperatingLicensesCertificateId != undefined && this.Application.Request.OperatingLicensesCertificateId != Guid.EMPTY) {
          this.GetOperatingLicense(this.Application.Request.OperatingLicensesCertificateId);
        }
      }
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.UnableToComplete.toString()
        || this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.AutomaticShutDownDueToNonResponse.toString()) {
        this.Application.IsReadOnly = true;
        
      }

    }

  }

  GetOperatingLicense(LicenseId) {
    this.requestService.GetOperatingLicense(LicenseId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          debugger;
          this.CertificateDetails = res.Content;
          //this.MhrezAddedContracts= res.Content.AddedContracts;
          this.CertificateDetails.AddedContracts.forEach(element => {
            element.IsDeleted = false;
            element.IsUpdated = false;
          });
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

  ContractGridChanged(event){
    debugger;
    this.CurrentContract = null;
    if(event.ContractId){
      this.getContractInfo(event.ContractId);
    }
   }

}
