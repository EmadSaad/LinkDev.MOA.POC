import { Component, OnInit, ViewChild } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { BuildingLicenseRequestModel, CRMStatusCodeEnum, LicenseTypesIds, RequesterBiddingDecision, ConsultingofficeDecision, ServiceTypeEnum, AmendTypesEnum, CrTypeEnum } from '../../Model/BuildingLicenseRequestModel';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { BuildingLicenseRequestService } from '../../Service/building-license-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { ColumnFieldType, GridColumn } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { TestUser, BiddingModel, BiddingOrOffice, BiddingType, BiddingOrContractor } from 'src/modules/shared/Common/Bidding/models/BiddingModel';
import { PriceOfferModel } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { Guid } from 'guid-typescript';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { request } from 'http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { PlanApprovalService } from 'src/modules/Plan-Approval/service/Plan-Approval.service';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { Title } from '@angular/platform-browser';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { DateModel } from 'src/modules/shared/form-guide/models/date-model';





@Component({
  selector: 'app-building-license-request',
  templateUrl: './building-license-request.component.html',
  styleUrls: ['./building-license-request.component.css']
})
export class BuildingLicenseRequestComponent extends EServicesBase<BuildingLicenseRequestModel> implements OnInit {

  // Fields
  EnableAddContacts: boolean = false;
  isShowOldLicenseNumber: boolean = false;
  disableSubmit: boolean = true;
  disableDraft: boolean = true;
  isContractNumberReadOnly: boolean = true;
  isLicenseTypeReadOnly: boolean = true;
  //isOldLicenseNumberReadOnly:boolean = true;
  //isAmendTypeReadOnly:boolean = true;
  isShowAmendType: boolean = false;
  isShowModonComment: boolean = false;
  isShowLicenseInformation: boolean = false;
  getContract: boolean = false;
  getDocuments: boolean = false;
  getRequestValidation: boolean = false;
  contactsList: ContactDetails[];
  getBuildingLicensesRegardingToContract: boolean;
  isSubmitDraft: boolean = false;
  isSubmit: boolean = false;
  IsRequestValid: boolean = true;
  requestValidMsg: string;
  //isMainInfoFieldsReadOnly: boolean = true;
  isConstructionBudgetReadOnly: boolean = true;
  isFloorsNumberReadOnly: boolean = true;
  isAlwaysReadOnlyAfterSubmit: boolean = true;
  getContact: boolean = false;
  BuildingLicenseRequestId: string;
  //RequesterId: string;
  cRMStatusCodeEnum = CRMStatusCodeEnum;
  currentUser: number;
  testUserEnum = TestUser;
  OfficeBidderId: string;
  ContractorBidderId: string;
  BiddingOrOfficeEnum = BiddingOrOffice;
  serviceType: ServiceTypeEnum;
  ScopeOfWorkValue: string;
  isRequestTypeAmend: boolean = false;
  // Office Fields
  IsSpecific: boolean = false;
  isOfficeBiddingReadOnly: boolean = true;
  isOfficePriceOfferReadOnly: boolean = true;
  ActiveConsultingOfficeBidding: string;

  // Contractor Fields
  isSpecificContractor: Boolean = false;
  isContractorBiddingReadOnly: boolean = true;
  isContractorPriceOfferReadOnly: boolean = true;
  BiddingTypeEnum = BiddingType;
  ActiveContractorBidding: string;
  BiddingOrContractorEnum = BiddingOrContractor;

  getExpiredLicense: boolean = false;

  IsCRContractsBalanceValid: boolean = true;
  crContractBalanceValidMsg: string;

  // Previous & Next
  enablePrevious: boolean = false;


  // Side Bar
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  selectedNode: FormHierarchyBase;


  // Amend Flags
  AmendInConsultingOffice: boolean = false;
  AmendInContractor: boolean = false;
  AmendInConstructionBudget: boolean = false;
  AmendInTimeTableDocument: boolean = false;

  CurrentCR: CRModel={};
  isCurrentCR: boolean = false;
  termsAndConditionsChecked: boolean = false;
  @ViewChild("popup") popUpTemplate: any;
  spacificConsultingOfficePriceOffer: PriceOfferModel;
  spacificContractorPriceOffer: PriceOfferModel;


  CROwnerGridcols: GridColumn[] = [
    { header: "ContractSubmission.Name", field: "OwnerName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.Nationality", field: "Nationality", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractSubmission.SharingPercentage", field: "SharingPercentage", typeConfig: { type: ColumnFieldType.Text } }
  ];

  isCurrentContract: boolean = true;
  CurrentContract: ContractInfoModel;
  contactDetailsfromContract: ContactDetails[];
  gridcols: GridColumn[] = [
    { header: "PlanApproval.Name", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Mobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } }
  ];



  formStructure: FormHierarchyBase[] = [
    {
      index: 1, label: "BuildingLicenseRequest.RequestMainInfoTab", type: NodeType.Parent, children:
        [
          {
            index: 1, label: "BuildingLicenseRequest.RequestMainInfoStage", type: NodeType.Child, children:
              [
                { index: 1, label: "BuildingLicenseRequest.RequestMainInfoSection", type: NodeType.Section }
              ]
          },
          {
            index: 2, label: "BuildingLicenseRequest.BiddingOrSpecificConsultingOfficeStage", type: NodeType.Child, children:
              [
                { index: 1, label: "BuildingLicenseRequest.BiddingOrSpecificConsultingOfficeSection", type: NodeType.Section }
              ]
          }
        ]
    },
    { index: 2, label: "BuildingLicenseRequest.ConsultingOfficePriceOfferTab", type: NodeType.Parent, children: [] },
    { index: 3, label: "BuildingLicenseRequest.BiddingOrSpecificContractorTab", type: NodeType.Parent, children: [] },
    { index: 4, label: "BuildingLicenseRequest.ContractorPriceOfferTab", type: NodeType.Parent, children: [] }



  ];

  newFormStructure: FormHierarchyBase[] = [];

  // Grid
  gridModel: ContactDetails;

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search" // label thats displayed in search input,
    //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };




  protected TApplicationNewInstance(): BuildingLicenseRequestModel {
    return new BuildingLicenseRequestModel();
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      { EntityName: "ldv_buildinglicenserequest", CachingKey: "ldv_buildinglicenserequest_ldv_amendtype_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_amendtype" },
      { EntityName: "ldv_service", CachingKey: "ldv_service_ServiceDefinitionDetails", Mode: LookupRequestMode.ServiceDefinitionDetails },
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


  protected getQueryStringNames(): string[] {
    return ["Id"];
  }

  constructor(
    public contractSubmissionService: ContractSubmissionService,
    public planApprovalService: PlanApprovalService,
    protected requestService: BuildingLicenseRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService: Title) {
    super(requestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.titleService.setTitle("ECZA | Building license reqeust");
  }


  ngOnInit() {

    // this.translateService.get('SELECT').subscribe(
    //   sel => {
    //     this.translateService.get('NO_RESULT_FOUND').subscribe(
    //       no => {
    //         this.config['placeholder'] = sel;
    //         this.config['noResultsFound'] = no;
    //       }
    //     )
    //   });

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
    this.BuildingLicenseRequestId = this.activatedRoute.snapshot.queryParams["Id"];
    //this.Application.Request.RequesterId = this.activatedRoute.snapshot.queryParams["RequesterId"];
    this.serviceType = ServiceTypeEnum.BuildingLicense;
    this.getBuildingLicensesRegardingToContract = false;
    //this.IsRequestValid = true;




    // if (!this.RequesterId) {
    //   this.RequesterId = "B9D1BD22-C571-EA11-A978-000D3AAB0880";
    // }



  }


  SetDisabledFlags() {


    // In Case Create Request
    if (this.BuildingLicenseRequestId == undefined) {
      this.isAlwaysReadOnlyAfterSubmit = false;
      //this.isMainInfoFieldsReadOnly = false;
    }
  }

  // Previous() {
  //   this.ActiveLevelOne = 1;
  //   this.ActiveLevelTwo = 1;
  // }


  // Next() {
  //   this.ActiveLevelOne = 1;
  //   this.ActiveLevelTwo = 2;
  // }

  protected afterFormReady(): void {
    //this.getDynamicLookups();
    //this.BidderId = "56FE0CA0-0E20-EA11-A98E-000D3A46F0D9"

    if (this.Application.Request && this.Application.Request.ConsultingOfficeId) {
      this.OfficeBidderId = this.Application.Request.ConsultingOfficeId;
    }

    if (this.Application.Request && this.Application.Request.ContractorId) {
      this.ContractorBidderId = this.Application.Request.ContractorId;
    }

    if(this.Application.Request.ContractNumberId!=Guid.EMPTY){
      this.getContractInfo();
    }

    this.AmendTypeChanged();
    //this.currentUser = 0;

    if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
      this.GetContactDetailsByCR();
      this.GetContractsRelatedToCR();
      this.GetCurrentUserType(this.Application.Request.CRId, 0);
      this.lookupService.lookupEntities['account_CRsByTypeInvestor'] = [
        { Text: this.Application.Request.CRName, Value: this.Application.Request.CRId }
      ];
    }
    else {
      this.GetCRsByTypeByContactId(CrTypeEnum.Investor);
    }




    //this.Application.Request.RequesterId = this.RequesterId;


    this.SetDisabledFlags();
    this.GetBuildingLicensesTypes();

    // Request Id Exist
    if (this.BuildingLicenseRequestId != undefined) {
      this.termsAndConditionsChecked = true;
      this.LicenseTypeChanged();
    }

    // Commented for Contractor Or Bidding Selected Automaic Issue
    // this.OldLicenseNumberChanged();




    if (this.Application.Request.CRId) {
      this.cRChanged();
    }


    if (this.Application.Request.OldLicenseNumberId != Guid.EMPTY && this.Application.Request.OldLicenseNumberId != undefined) {

      this.isShowOldLicenseNumber = true;
      //this.GetBuildingLicensesRelatedToContract(null);
      this.GetBuildingLicensesRelatedToContract();
    }



    if (this.Application.Request.OfficeorBidding == BiddingOrOffice.Office) {
      this.IsSpecific = true;


    }

    if (this.Application.Request.ContractororBidding == BiddingOrContractor.Contractor) {
      this.isSpecificContractor = true;
    }



    //this.setLookups();

    // Fill Grid
    if (this.Application.Request.Contacts != null &&
      this.Application.Request.Contacts.length > 0 &&
      this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
      this.onContactChange(this.Application.Request.Contacts);
    }

    // if (this.Application.Request.ConstructionBudget == 0) {
    //   this.Application.Request.ConstructionBudget = null;
    // }

    if (this.Application.Request.ConsultingOfficePriceOfferValue >= 0 || this.Application.Request.ConsultingOfficePriceOfferComment) {
      this.spacificConsultingOfficePriceOffer = new PriceOfferModel();
      this.spacificConsultingOfficePriceOffer.PriceOfferValue = this.Application.Request.ConsultingOfficePriceOfferValue;
      this.spacificConsultingOfficePriceOffer.Comment = this.Application.Request.ConsultingOfficePriceOfferComment;
    }

    if(this.Application.Request.ContractorPriceOfferValue >= 0 || this.Application.Request.ContractorPriceOfferComment){
    this.spacificContractorPriceOffer = new PriceOfferModel();
    this.spacificContractorPriceOffer.PriceOfferValue = this.Application.Request.ContractorPriceOfferValue;
    this.spacificContractorPriceOffer.Comment = this.Application.Request.ContractorPriceOfferComment;
    }

    // Fields Validations
    this.ValidateApplicationIsSubmitted();
    this.ValidateButtons();
    this.ValidateEnableAddContacts();
    this.ValidateAmendTypeFlags();
    this.ValidateConstructionBudget();
    this.ValidateFloorsNumber();
    this.ValidateIsShowOldLicenseNumber();


    var v = this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'];

  }

  protected onSaveFormSuccess() {
    // disableDraft: only Reload in case Save as Draft 
    if (this.BuildingLicenseRequestId == undefined && this.disableDraft == false) {
      window.location.reload();
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



  // protected getDynamicLookups() {
  //   this.requestService.getDynamicLookups().subscribe(
  //     res => {
  //       if (res.ResponseCode === ResponseCode.Success)
  //         this.lookupService.handleRetrievedLookup(res.Content);
  //     }
  //   )
  // }

  protected GetBuildingLicensesTypes() {
    this.requestService.GetBuildingLicensesTypes().subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }



  // protected GetBuildingLicensesRelatedToContract(isExpired: boolean) {
  //   this.getBuildingLicensesRegardingToContract = true;
  //   //this.Application.Request.OldLicenseNumberId = null;

  //   if (this.getBuildingLicensesRegardingToContract) {
  //     this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] = [];
  //     // change static id to requester id
  //     this.requestService.GetBuildingLicensesRelatedToContract(this.Application.Request.ContractNumberId, isExpired).subscribe(
  //       res => {
  //         this.getBuildingLicensesRegardingToContract = false;
  //         if (res.ResponseCode === ResponseCode.Success)
  //           this.lookupService.handleRetrievedLookup(res.Content);
  //       }
  //     )
  //   }
  // }

  protected GetBuildingLicensesRelatedToContract() {
    this.getBuildingLicensesRegardingToContract = true;
    //this.Application.Request.OldLicenseNumberId = null;

    if (this.getBuildingLicensesRegardingToContract) {
      this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] = [];
      // change static id to requester id
      this.requestService.GetBuildingLicensesRelatedToContract(this.Application.Request.ContractNumberId, this.Application.Request.LicenseTypeId).subscribe(
        res => {
          this.getBuildingLicensesRegardingToContract = false;
          if (res.ResponseCode === ResponseCode.Success)
            this.lookupService.handleRetrievedLookup(res.Content);
        }
      )
    }
  }


  SaveAsDraft() {
    this.isSubmitDraft = true;
    if(this.termsAndConditionsChecked){
    this.saveApplication();
  }
}

  Submit() {
    debugger;
    if (this.ValidateBeforeSubmit()) {
      this.Application.Request.IsSubmitted = 1;
      this.submitForm();
    }
    else {
      this.ActiveLevelTwo = 1;
      this.isSubmit = true;
    }
  }

  ValidateBeforeSubmit() {

    var isvalidDoc = this.validateDocuments();

    var isValidOldBuildingLicense = true;
    if (this.isShowOldLicenseNumber) {
      if (this.Application.Request.OldLicenseNumberId == Guid.EMPTY) {
        isValidOldBuildingLicense = false;
      }
    }

    var isValidAmendTypes = true;
    if (this.isShowAmendType) {
      if (this.Application.Request.AmendType == undefined) {
        isValidAmendTypes = false;
      }
    }

    return isvalidDoc
      && isValidOldBuildingLicense
      && isValidAmendTypes
      && this.Application.Request.ConstructionBudget >= 0
      && this.Application.Request.FloorsNumber >= 0
      && this.termsAndConditionsChecked;

  }

  cRChanged() {
    this.IsRequestValid = true;

    if (this.Application.Request.CRId != undefined) {
      this.GetValidateCRContractsBalances();
      this.GetContractsRelatedToCR();
      this.GetContactDetailsByCR();
      this.getCRInfo();
      this.ValidateContractNumberReadOnly();
    }
    else {
      this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
    }
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

  protected getCRInfo() {
    
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
      if (results.ResponseCode === ResponseCode.Success) {
        //debugger;
        this.CurrentCR = results.Content.CR;
        // if(this.CurrentCR.IssueDate.day == 0 && this.CurrentCR.IssueDate.month==0 && this.CurrentCR.IssueDate.year ==0){
        //   this.CurrentCR.IssueDate = null;
        // }

      }
      this.isCurrentCR = false;

    });
  }

  // protected setDateModelToNull(date:DateModel){
  //   if(date.day == 0 && date.month==0 && date.year ==0){
  //     date = null;
  //   }
  // }

  protected OldLicenseNumberChanged() {
    if (this.Application.Request.LicenseTypeId != undefined) {
      if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Renew
        || this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend) {
        this.requestService.GetBuildingLicenseDetails(this.Application.Request.OldLicenseNumberId).subscribe(
          res => {
            if (res.ResponseCode === ResponseCode.Success) {
              // Consulting Office
              //if (!this.Application.Request.OfficeorBidding) {
              this.Application.Request.OfficeorBidding = this.BiddingOrOfficeEnum.Office;
              //}
              //if (!this.Application.Request.ConsultingOffice) {
              this.Application.Request.ConsultingOffice = res.Content.ConsultingOffice;
              //}
              //if (!this.Application.Request.ConsultingOfficeId) {
              this.Application.Request.ConsultingOfficeId = res.Content.ConsultingOfficeId;
              //}

              // Contractor
              //if (!this.Application.Request.ContractororBidding) {
              this.Application.Request.ContractororBidding = this.BiddingOrContractorEnum.Contractor;
              //}
              //if (!this.Application.Request.Contractor) {
              this.Application.Request.Contractor = res.Content.Contractor;
              //}
              //if (!this.Application.Request.ContractorId) {
              this.Application.Request.ContractorId = res.Content.ContractorId;
              //}

              //if (!this.Application.Request.ConstructionBudget) {
              this.Application.Request.ConstructionBudget = res.Content.ConstructionBudget;
              //}
              //if (!this.Application.Request.FloorsNumber) {
              this.Application.Request.FloorsNumber = res.Content.FloorsNumber;
              //}
            }
          }
        );
      }
      else {
        this.Application.Request.OfficeorBidding = undefined;
        this.Application.Request.ConsultingOffice = undefined;
        this.Application.Request.ConsultingOfficeId = undefined;
        this.Application.Request.ContractororBidding = undefined;
        this.Application.Request.Contractor = undefined;
        this.Application.Request.ContractorId = undefined;
        this.Application.Request.ConstructionBudget = undefined;
        this.Application.Request.FloorsNumber = undefined;
      }
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

  public contractChanged() {
    this.Application.Request.LicenseTypeId = null;
    this.isShowOldLicenseNumber = false;
    this.isShowAmendType = false;
    this.IsRequestValid = true;

    if (this.Application.Request.ContractNumberId != undefined) {
      //this.GetBuildingLicensesRelatedToContract(this.getExpiredLicense);
      this.GetBuildingLicensesRelatedToContract();

      this.getContractInfo();
      this.ValidateLicenseTypeReadOnly();
    }
  }

  protected GetBuildingLicensesRequestDocuments() {

    // If Create only not Get
    if (!this.getDocuments && this.BuildingLicenseRequestId == undefined && this.Application.Request.LicenseTypeId != undefined && this.Application.Request.ContractNumberId != undefined) {
      this.Application.Documents = null;
      this.getDocuments = true
      this.requestService.GetBuildingLicensesRequestDocuments(this.Application.Request.LicenseTypeId, this.Application.Request.ContractNumberId).subscribe(
        res => {
          this.getDocuments = false;
          if (res.ResponseCode === ResponseCode.Success) {

            this.Application.Documents = res.Content;
          }
        }
      )
    }
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



  protected GetCurrentUserType(CRId: string, Counter: number) {

    // Counter = 1 means check if contact related to CR
    // Counter = 2 means check if contact related to Consulting Office
    // Counter = 3 means check if contact related to Contractor
    Counter += 1;
    this.requestService.GetCurrentUserType(CRId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          this.currentUser = res.Content;
          if (this.currentUser == -1) {
            if (Counter == 1) {
              if (this.Application.Request.ConsultingOfficeId != undefined && this.Application.Request.ConsultingOfficeId != Guid.EMPTY) {
                this.GetCurrentUserType(this.Application.Request.ConsultingOfficeId, Counter);
              }

              // Contact Not Related to CR Or Consulting Office So check if we are on bidding Status
              if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingConsultingOfficeBidding.toString()) {
                this.currentUser = 1;
                this.setStages();
              }
            }
            else if (Counter == 2) {
              if (this.Application.Request.ContractorId != undefined && this.Application.Request.ContractorId != Guid.EMPTY) {
                this.GetCurrentUserType(this.Application.Request.ContractorId, Counter);
              }

              // Contact Not Related to CR Or Consulting Office or Contractor So check if we are on bidding Status
              if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingContractorBidding.toString()) {
                this.currentUser = 2;
                this.setStages();
              }
            }

          }
          else {
            this.setStages(); // must After AmendTypeChanged
          }
        }
      }
    )




  }



  onContactChange(contacts: string[]) {
    this.contactsList = [];
    // contacts.forEach(contactId => {
    //   this.contactsList.push((this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'])
    //   .filter(
    //     ele =>ele['Value'] == contactId) as ContactDetails)
    // });
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

  AmendTypeChanged() {

    if (this.Application.Request.IsSubmitted == null && this.Application.Request.AmendType != undefined) {


      // Clear Flags 
      this.AmendInConsultingOffice = false;
      this.AmendInContractor = false;
      this.AmendInConstructionBudget = false;
      this.AmendInTimeTableDocument = false;

      this.Application.Request.AmendType.forEach(element => {
        if (element == AmendTypesEnum.ConsultingOffice.toString()) {
          this.AmendInConsultingOffice = true;
        }
        else if (element == AmendTypesEnum.Contractor.toString()) {
          this.AmendInContractor = true;
        }
        else if (element == AmendTypesEnum.ConstrctionBudget.toString()) {
          this.AmendInConstructionBudget = true;
        }
        else if (element == AmendTypesEnum.TimetableDocument.toString()) {
          this.AmendInTimeTableDocument = true;
        }
      });

      if (this.AmendInTimeTableDocument) {
        this.setDocumentRequired("BLRTimetable", true);
      }
      else {
        this.removeDocumentFiles("BLRTimetable");
        this.setDocumentRequired("BLRTimetable", false);
      }

      this.ValidateButtons();
      this.ValidateConstructionBudget();


    }
  }


  LicenseTypeChanged() {


    if (this.Application.Request.LicenseTypeId != null) {
      this.ScopeOfWorkValue = this.lookupService.lookupEntities['ldv_service_ServiceDefinitionDetails'].filter(x => x['Value'] == this.Application.Request.LicenseTypeId)[0]["ScopeOfWork"];
    }
    else {
      this.ScopeOfWorkValue = null;
    }
    if (this.BuildingLicenseRequestId == undefined) {

      // Clear Fields in case Amend Then any Type
      this.Application.Request.AmendType = [];
      this.Application.Request.ConstructionBudget = undefined;
      this.Application.Request.FloorsNumber = undefined;

      this.GetBuildingLicensesRequestDocuments();
      this.ValidateBuildingLicenseRequest();
      if (this.Application.Request.LicenseTypeId != undefined) {
        if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend) {
          //this.isMainInfoFieldsReadOnly = true;
          this.isRequestTypeAmend = true;
          this.getExpiredLicense = false;
          if (this.Application.Request.ContractNumberId != undefined) {
            //this.GetBuildingLicensesRelatedToContract(false);
            this.GetBuildingLicensesRelatedToContract();

          }
        }
        else if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Renew) {
          this.isRequestTypeAmend = false;
          this.getExpiredLicense = true;
          //this.isMainInfoFieldsReadOnly = true;
          if (this.Application.Request.ContractNumberId != undefined) {
            //this.GetBuildingLicensesRelatedToContract(true);
            this.GetBuildingLicensesRelatedToContract();

          }
        }
        else if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Temp ||
          this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Extend) {
          //this.isMainInfoFieldsReadOnly = false;
          this.isRequestTypeAmend = false;
          if (this.Application.Request.CRId != undefined) {
            //this.GetBuildingLicensesRelatedToContract(false);
            this.GetBuildingLicensesRelatedToContract();

          }
        }
        else {
          this.isRequestTypeAmend = false;
          //this.isMainInfoFieldsReadOnly = false;
          this.Application.Request.OldLicenseNumberId = null;
        }
        this.ValidateButtons();
        this.ValidateAmendTypeFlags();
        this.ValidateIsShowOldLicenseNumber();
        this.ValidateConstructionBudget();
        this.ValidateFloorsNumber();
      }

    }

    this.ValidateButtons();
  }

  GetDataFromOfficeComponent(biddingData: BiddingModel) {
    this.Application.Request.OfficeorBidding = biddingData.officeorbidding;
    this.Application.Request.ConsultingOfficeId = biddingData.ConsultingOfficeId;
  }

  // GetDataFromContractorComponent(biddingData: BiddingModel) {
  //   this.Application.Request.ContractororBidding = biddingData.contractorOrbidding;
  //   this.Application.Request.ContractorId = biddingData.ContractorId;
  // }

  // Office Bidding
  OnSubmitBidding(biddingData: BiddingModel) {

    this.isSubmit = true;
    this.Application.Request.IsSubmitted = 1;
    this.Application.Request.OfficeorBidding = biddingData.officeorbidding;
    this.Application.Request.ConsultingOfficeId = biddingData.ConsultingOfficeId;
    //this.Application.Request.RequesterId = this.RequesterId;

    this.Submit();


  }


  OnSubmitContractorBidding(biddingData: BiddingModel) {

    this.isSubmit = true;
    this.Application.Request.IsSubmitted = 1;
    this.Application.Request.ContractororBidding = biddingData.contractorOrbidding;
    this.Application.Request.ContractorId = biddingData.ContractorId;
    //this.Application.Request.RequesterId = this.RequesterId;

    this.Submit();


  }


  OnSubmitConsultingOfficePriceOffer(priceOfferModel: PriceOfferModel) {

    if (priceOfferModel.ChoosePriceOfferOrRejectAll == true) {//Investor Approve Bidding
      this.Application.Request.ConsultingOfficeId = priceOfferModel.BidderNameId;
      this.Application.Request.OfficeBiddingDecision = RequesterBiddingDecision.Chooseconsultingoffice;
    }
    else if (priceOfferModel.ChoosePriceOfferOrRejectAll == false) {//Investor Reject All 
      this.Application.Request.OfficeBiddingDecision = RequesterBiddingDecision.Rejectall;
    }
    else if (priceOfferModel.ApprovedRejectSpacifice == true) {//المكتب وافق
      this.Application.Request.ConsultingOfficeDecision = ConsultingofficeDecision.Approve;
      this.Application.Request.ConsultingOfficePriceOfferValue = priceOfferModel.PriceOfferValue;
      this.Application.Request.ConsultingOfficePriceOfferComment = priceOfferModel.Comment;
    }
    else if (priceOfferModel.ApprovedRejectSpacifice == false) {//المكتب رفض
      this.Application.Request.ConsultingOfficeDecision = ConsultingofficeDecision.Reject;
      this.Application.Request.ConsultingOfficePriceOfferComment = priceOfferModel.Comment;
    }

    if (priceOfferModel.ErrorMessage) {

      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = priceOfferModel.ErrorMessage;
      SharedHelper.scrollToBody();
      SharedHelper.hideLoader();
      // this.alertService.error(priceOfferModel.ErrorMessage,"","");
    }
    else {
      this.submitForm();
    }
  }

  OnSubmitContractorPriceOffer(priceOfferModel: PriceOfferModel) {
    if (priceOfferModel.ChoosePriceOfferOrRejectAll == true) {//Investor Approve Bidding
      this.Application.Request.ContractorId = priceOfferModel.BidderNameId;
      this.Application.Request.ContractorBiddingDecision = RequesterBiddingDecision.Chooseconsultingoffice;
    }
    else if (priceOfferModel.ChoosePriceOfferOrRejectAll == false) {//Investor Reject All 
      this.Application.Request.ContractorBiddingDecision = RequesterBiddingDecision.Rejectall;
    }
    else if (priceOfferModel.ApprovedRejectSpacifice == true) {//المقاول وافق
      this.Application.Request.ContractorDecision = ConsultingofficeDecision.Approve;
      this.Application.Request.ContractorPriceOfferValue = priceOfferModel.PriceOfferValue;
      this.Application.Request.ContractorPriceOfferComment = priceOfferModel.Comment;
    }
    else if (priceOfferModel.ApprovedRejectSpacifice == false) {//المكتب رفض
      this.Application.Request.ContractorDecision = ConsultingofficeDecision.Reject;
      this.Application.Request.ContractorPriceOfferComment = priceOfferModel.Comment;
    }

    if (priceOfferModel.ErrorMessage) {

      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = priceOfferModel.ErrorMessage;
      SharedHelper.scrollToBody();
      SharedHelper.hideLoader();
      // this.alertService.error(priceOfferModel.ErrorMessage,"","");
    }
    else {
      this.submitForm();
    }
  }

  protected setDocumentRequired(sectionName: string, isRequired: boolean) {

    if (this.Application.Documents) {
      if (this.Application.Documents.length > 0) {
        this.Application.Documents.forEach(element => {
          if (element.SectionName == sectionName) {
            element.IsRequired = isRequired;
          }
        });
      }
    }
  }

  protected removeDocumentFiles(sectionName: string) {

    if (this.Application.Documents) {
      if (this.Application.Documents.length > 0) {
        this.Application.Documents.forEach(element => {
          if (element.SectionName == sectionName) {
            element.Files.pop();
          }
        });
      }
    }
  }



  protected setStages() {
    if (this.BuildingLicenseRequestId != undefined && this.BuildingLicenseRequestId != Guid.EMPTY) {

      this.ActiveLevelOne = null;
      this.ActiveLevelTwo = null;

      // مسودة
      if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.Draft.toString()) {
        if (this.AmendInContractor && !this.AmendInConsultingOffice) {
          this.ActiveLevelOne = 3;
          this.isOfficeBiddingReadOnly = true;
          this.isContractorBiddingReadOnly = false;
        }
        else {
          this.ActiveLevelOne = 1;
          this.ActiveLevelTwo = 2;
          //this.isMainInfoFieldsReadOnly = false;
          this.isOfficeBiddingReadOnly = false;
          this.isContractorBiddingReadOnly = true;
        }
      }

      // معلقة على المستثمر
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingOnInvestor.toString()) {
        this.ActiveLevelOne = 1;
        this.ActiveLevelTwo = 1;
        //this.isMainInfoFieldsReadOnly = false;
        this.isOfficeBiddingReadOnly = true;
        this.isContractorBiddingReadOnly = true;
        this.isShowModonComment = true;
      }

      // معلقة علي قرار المكتب الاستشاري
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingConsultingOfficeDecision.toString()) {
        if (this.currentUser == 1) {
          this.isOfficePriceOfferReadOnly = false;
          this.ActiveLevelOne = 2;
          //this.OBidderId = this.Application.Request.ConsultingOfficeId;
        }
        else {
          this.ActiveLevelOne = 1;
          this.ActiveLevelTwo = 2;
        }
      }


      // تقديم عرض السعر من المكاتب
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingConsultingOfficeBidding.toString()) {
        this.ActiveLevelOne = 2;
        this.isOfficePriceOfferReadOnly = false;
        if (this.currentUser == 1) {
          this.GetCRsByTypeByContactId(CrTypeEnum.ConsultingOffice);
        }
      }

      //  قيد إختيار عرض سعر من المكاتب الإستشارية
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingSelectingOfferFromConsultingOffices.toString()) {
        this.ActiveLevelOne = 2;
        this.isOfficePriceOfferReadOnly = false;
      }

      // تم اختيار المكتب الإستشاري
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.ConsultingOfficeSelected.toString()) {
        this.ActiveLevelOne = 3;
        //this.ActiveLevelTwo = undefined;
        if (this.currentUser == 0) {
          this.isContractorBiddingReadOnly = false;
        }
      }

      // معلقة علي قرار المقاول
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingContractorDecision.toString()) {
        if (this.currentUser == 2) {
          this.ActiveLevelOne = 4;
          this.isContractorPriceOfferReadOnly = false;
          //this.BidderId = this.Application.Request.ContractorId;
        }
        else {
          this.ActiveLevelOne = 3;
        }
      }

      // قيد إنتهاء مناقصة المقاول
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingContractorBidding.toString()) {
        this.ActiveLevelOne = 4;
        this.ActiveLevelTwo = undefined;
        this.isOfficePriceOfferReadOnly = true;
        this.isContractorPriceOfferReadOnly = false;

        if (this.currentUser == 2) {
          this.GetCRsByTypeByContactId(CrTypeEnum.Contractor);
        }
      }

      // قيد إختيار عرض سعر من المقاولين
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingSelectingOfferFromContractors.toString()) {
        this.ActiveLevelOne = 4;
        this.ActiveLevelTwo = undefined;
        this.isContractorPriceOfferReadOnly = false;
      }

      //  تم اختيار المقاول /المكتب 
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.OfficeAndContractorSelected.toString()) {
        this.ActiveLevelOne = 5;
        this.ActiveLevelTwo = undefined;

      }

      //   تم التنفيذ
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.Completed.toString()) {
        this.ActiveLevelOne = 5;
        this.ActiveLevelTwo = undefined;
        this.isShowLicenseInformation = true;
      }

      // تم غلق تلقائي بسبب عدم الرد
      else if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.AutomaticShutDownDueToNonResponse.toString()) {
        this.ActiveLevelOne = 1;
        this.ActiveLevelTwo = 1;
        this.Application.IsReadOnly = true;
        this.isOfficePriceOfferReadOnly = true;
        this.isContractorPriceOfferReadOnly = true;
      }


      //this.RemoveInActiveStages(this.ActiveLevelOne);

      if (this.Application.ApplicationHeader.CRMStatusCode != this.cRMStatusCodeEnum.Draft.toString()) {
        this.formStructure.push(
          { index: 5, label: "BuildingLicenseRequest.LicenseDetailsTab", type: NodeType.Parent, children: [] },
          { index: 6, label: "BuildingLicenseRequest.RequestComments", type: NodeType.Parent, children: [] }
        );
      }

    }

  }

  protected RemoveInActiveStages(activeStageIndex: number) {

    this.newFormStructure.push(this.formStructure[0]);
    this.newFormStructure.push(this.formStructure.splice(activeStageIndex - 1, 1)[0]);

    this.formStructure = this.newFormStructure;
  }

  // Validations

  protected ValidateIsShowOldLicenseNumber() {
    if (this.Application.Request.LicenseTypeId != null) {
      if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.New) {
        this.isShowOldLicenseNumber = false;
      }
      else {
        this.isShowOldLicenseNumber = true;
      }
    }
    else {
      this.isShowOldLicenseNumber = false;
    }
  }

  protected ValidateBuildingLicenseRequest() {

    this.requestValidMsg = undefined;

    if (!this.getRequestValidation) {
      this.getRequestValidation = true;
      this.requestService.ValidateBuildingLicenseRequest(this.Application.Request.CRId,
        this.Application.Request.ContractNumberId,
        this.Application.Request.LicenseTypeId,
        this.Application.Request.OldLicenseNumberId,
        this.Application.Documents).subscribe(
          res => {
            this.getRequestValidation = false;
            if (res.ResponseCode === ResponseCode.Success) {
              this.IsRequestValid = res.Content.IsValid;
            }
            if (res.ResponseCode === ResponseCode.Error) {
              this.IsRequestValid = false;
              this.requestValidMsg = res.FriendlyResponseMessage;
              //this.Application.Request.LicenseTypeId = null;
            }
          });
    }
  }

  // protected setLookups(){

  //   if(this.BuildingLicenseRequestId){
  //     if(this.Application.Request.OldLicenseNumberId){
  //       this.lookupService.lookupEntities['ldv_buildinglicense_LookupWithId'] = [
  //         { Text: this.Application.Request.OldLicenseNumber.Name, Value: this.Application.Request.OldLicenseNumber.Value }
  //       ];
  //     }

  //   }

  // }

  protected ValidateAmendTypeFlags() {
    if (this.BuildingLicenseRequestId != undefined) {
      if (this.Application.Request.AmendType) {
        this.isShowAmendType = true;
      }
    }
    else {
      if (this.Application.ApplicationHeader != undefined && this.Application.Request.AmendType) {
        this.isShowAmendType = true;
      }
    }

    if (this.Application.Request.LicenseTypeId != undefined) {
      if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend) {
        this.isShowAmendType = true;
      }
      else {
        this.isShowAmendType = false;
      }
    }

  }

  protected ValidateEnableAddContacts() {
    if (this.BuildingLicenseRequestId == undefined) {
      this.EnableAddContacts = true;
    }
  }

  protected ValidateContractNumberReadOnly() {
    if (this.Application.Request.CRId != undefined && this.BuildingLicenseRequestId == undefined) {
      this.isContractNumberReadOnly = false;
    }
  }

  protected ValidateLicenseTypeReadOnly() {
    if (this.Application.Request.ContractNumberId != undefined && this.BuildingLicenseRequestId == undefined) {
      this.isLicenseTypeReadOnly = false;
    }
  }

  // protected ValidateOldLicenseNumberReadOnly() {
  //   if (this.Application.Request.OldLicenseNumberId == undefined && this.BuildingLicenseRequestId == undefined) {
  //     this.isOldLicenseNumberReadOnly = false;
  //   }
  // }

  // protected ValidateAmendTypeReadOnly() {
  //   if (this.Application.Request.AmendType != undefined && this.BuildingLicenseRequestId == undefined) {
  //     this.isAmendTypeReadOnly = false;
  //   }
  // }

  protected ValidateApplicationIsSubmitted() {
    if (this.BuildingLicenseRequestId !== undefined) {
      if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.Draft.toString()
        || this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingOnInvestor.toString()) {
        this.Application.IsSubmitted = false;
        this.Application.IsReadOnly = false;
      }
      else {
        this.Application.IsSubmitted = true;
        this.Application.IsReadOnly = true;
      }
    }
    else {
      this.Application.IsSubmitted = false;
      this.Application.IsReadOnly = false;
    }
  }
  
  protected ValidateButtons() {
    
    if (this.BuildingLicenseRequestId == undefined) {
      if(this.termsAndConditionsChecked){

      if (this.Application.Request.LicenseTypeId != undefined) {

        if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Renew) {
          this.disableDraft = true;
          this.disableSubmit = false;
        }

        else if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend) {

          if (this.AmendInConsultingOffice || this.AmendInContractor) {
            this.disableDraft = false;
            this.disableSubmit = true;
          }
          else {
            this.disableDraft = true;
            this.disableSubmit = false;
          }

        }
        else {
          this.disableDraft = false;
          this.disableSubmit = true;
        }
      }

    }
    else{
      this.disableDraft = true;
      this.disableSubmit = true;
    }


    }

    else {

      if (this.Application.ApplicationHeader.CRMStatusCode == this.cRMStatusCodeEnum.PendingOnInvestor.toString()) {
        this.disableDraft = true;
        this.disableSubmit = false;
      }

      else {
        this.disableDraft = true;
        this.disableSubmit = true;
      }

    }
  
 


  }

  protected ValidateConstructionBudget() {
    if (this.Application.Request.LicenseTypeId != undefined) {
      if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend
        || this.Application.IsSubmitted == true) {
        this.isConstructionBudgetReadOnly = true;

        if (this.Application.Request.AmendType) {
          if (this.AmendInConstructionBudget) {
            this.isConstructionBudgetReadOnly = false;
          }
          else {
            this.isConstructionBudgetReadOnly = true;
          }
        }
      }
      else if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Renew) {
        this.isConstructionBudgetReadOnly = true;
      }
      else {
        this.isConstructionBudgetReadOnly = false;
      }
    }
  }

  protected ValidateFloorsNumber() {
    if (this.Application.Request.LicenseTypeId != undefined) {
      if (this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Amend
        || this.Application.Request.LicenseTypeId.toLowerCase() === LicenseTypesIds.Renew
        || this.Application.IsSubmitted == true) {
        this.isFloorsNumberReadOnly = true;
      }
      else {
        this.isFloorsNumberReadOnly = false;
      }
    }



    // End Validations


  }
  openPopup(){
    this.modalService.open(this.popUpTemplate, {size: 'lg', backdrop: 'static' });
  }
}
