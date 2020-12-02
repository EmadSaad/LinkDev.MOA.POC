import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanApprovalService } from '../service/Plan-Approval.service';
import { PlanApprovalModel, CRMStatusCodeEnum, InvestorBiddingDecision, ConsultingofficeDecision, ServiceTypeEnum, CrTypeEnum, RequestTypeEnum } from '../Model/PlanApprovalModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PlanApprovalModule } from '../Plan-Approval.module';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { TestUser, BiddingModel, BiddingOrOffice } from 'src/modules/shared/Common/Bidding/models/BiddingModel';
import { Guid } from 'guid-typescript';
import { PriceOfferModel } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ColumnFieldType, GridColumn } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { stringify } from 'querystring';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { ContractInfoModel } from '../Model/ContractInfoModel';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { request } from 'http';

@Component({
  selector: 'app-Plan-Approval',
  templateUrl: './Plan-Approval.component.html',
  styleUrls: ['./Plan-Approval.component.css']
})
export class PlanApprovalComponent extends EServicesBase<PlanApprovalModel> implements OnInit {

  constructor(public contractSubmissionService: ContractSubmissionService,
    protected requestService: PlanApprovalService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
      super(requestService,lookupService,activatedRoute,alertService,translateService,modalService,router);
      //this.configureMutliSelectConfiguration();
     }


  isFirstSetStageVisit:boolean = false;   

  isSubmit:boolean=false;

  viewInitialized: boolean = false;

  isBiddingComReadOnly:boolean = false;   
  isPriceOfferComReadOnly:boolean = true;   
  isDraftSatgeReadOnly:boolean = false;
  isGeneralInfoSatgeReadOnly:boolean = true;
  isGeneralDocReadOnly:boolean = true;
  isDetiledDocReadOnly:boolean = true;
  isPaymentSatgeReadOnly:boolean = true;
  getContact: boolean = false;
  getContract: boolean = false;
  
  IsCRContractsBalanceValid: boolean = true;
  crContractBalanceValidMsg: string;

  isContractNumberReadOnly:boolean = true;
  isPlanTypeReadOnly : boolean = true;
  isCRReadOnly : boolean = true;
  IsRequestValid:boolean = false;
  getRequestValidation : boolean = false;
  requestValidMsg :string;
  ShowSapceRow:boolean = false;

  requestType:RequestTypeEnum = RequestTypeEnum.GeneralMainBranch;

  contractMeternNmberValidMsg :string;
  IsContractMeternNmberHasValue:boolean = false;

  isPreviousPlanDocReadOnly:boolean = false;
  isCadastralPlanDocReadOnly:boolean = false;
  isNeedPreviousPlan:boolean = false;
  isNeedSafetyPlan:boolean = false;

  currentUser:TestUser;
  testUserEnum=TestUser;
  cRMStatusCodeEnum = CRMStatusCodeEnum;
  PlanApprovalId: string;
  BidderId:string;
  InvestorId:string;
  isSpasifice:boolean = false;
  spacificPriceOffer:PriceOfferModel;
  BiddingOrOfficeEnum = BiddingOrOffice;
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  selectedNode: FormHierarchyBase;

  CurrentCR: CRModel={};
  isCurrentCR:boolean;
  isCurrentContract:boolean;
  CurrentContract:ContractInfoModel;
  serviceType:ServiceTypeEnum;
  checked:boolean = false;
  @ViewChild("popup") popUpTemplate: any;
  //showPriceOfferCom : boolean = true;
  // config = {
  //   displayKey: "Text", //if objects array passed which key to be displayed defaults to description
  //   search: true, //true/false for the search functionlity defaults to false,
  //   placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
  //   noResultsFound: "No results found!", // text to be displayed when no items are found while searching
  //   searchPlaceholder: "Search" // label thats displayed in search input,
  //   //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  // };

  // config = {}
  // configureMutliSelectConfiguration() {
  //     this.config = this.createMultiSelectConfig();
  // }
  // createMultiSelectConfig(): any {
  //     var config =
  //     {
  //         search: true,
  //         displayKey: "Text", //if objects array passed which key to be displayed defaults to description
  //         placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
  //         noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
  //         searchPlaceholder: 'Search', // label thats displayed in search input,
  //     }
  //     setTimeout(() => {
  //         this.translateService.get("SELECT").subscribe(msg => {
  //             config.placeholder = msg;
  //         });
  //         return config;
  //     });

  //     setTimeout(() => {
  //         this.translateService.get("NO_RESULT_FOUND").subscribe(msg => {
  //             config.noResultsFound = msg;
  //         });
  //         return config;
  //     });

  //     setTimeout(() => {
  //         this.translateService.get("SEARCH").subscribe(msg => {
  //             config.searchPlaceholder = msg;
  //         });
  //         return config;
  //     });

  //     return config;

  //     // this.minDate.setDate(this.todayDate.getDate() - 1);
  // }


  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };

  //TODO: add contact model
  contactsList:ContactDetails[];
  gridModel: ContactDetails;
  gridcols: GridColumn[] = [{
    header: "PlanApproval.Name",
    field: "Name",
    typeConfig: {
      type: ColumnFieldType.Text
          }
    },{
      header: "PlanApproval.Email",
      field: "Email",
      typeConfig: {
        type: ColumnFieldType.Text
            }
      },{
        header: "PlanApproval.Mobile",
        field: "Mobile",
        typeConfig: {
          type: ColumnFieldType.Text
              }
        }
  ];


  contactDetailsfromContract:ContactDetails[];

  CROwnerGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Nationality",field:"Nationality",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];
  

  formStructure: FormHierarchyBase[] = [
    {index:1,label:"PlanApproval.PlanApprovalRequest",type:NodeType.Parent,children:
      [
        {index:1, label:"PlanApproval.RequestMainInfoStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.RequestMainInfo", type: NodeType.Section, data:"RequestMainInfoSection"},
          ]
        },
        {index:2, label:"PlanApproval.ChooseOfficeOrBiddingStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.ChooseOfficeOrBidding", type: NodeType.Section, data:"ChooseOfficeOrBiddingSection"},
          ]
        },
        {index:3, label:"PlanApproval.PriceOfferStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.GeneralAttachments", type: NodeType.Section, data:"GeneralAttachmentsSection"},
            {index:2, label:"PlanApproval.PriceOffer", type: NodeType.Section, data:"PriceOfferSection"},
          ]
        },
        {index:4, label:"PlanApproval.GeneralPlanStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.PublicInfo", type: NodeType.Section, data:"PublicInfoSection"},
            {index:2, label:"PlanApproval.GeneralPlanSafetyPlan", type: NodeType.Section, data:"GeneralPlanSection"}
          ]
        },
        {index:5, label:"PlanApproval.DetailedPlanStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.DetailedPlan", type: NodeType.Section, data:"DetailedPlanSection"},
          ]
        }
      ]
    }
  ];

  ngAfterViewInit()
  {
    this.viewInitialized = true;
  }


  onSelect = (node: FormHierarchyBase) => {
    //debugger;
    if(node.type == NodeType.Parent){
       this.ActiveLevelOne = node.index;
    }
    else{

    // this.selectedNode = node;
    this.ActiveLevelTwo = node.index;
    }
  }


  protected getQueryStringNames(): string[] {
    return ["Id"]
  }

  protected TApplicationNewInstance(): PlanApprovalModel {
    return new PlanApprovalModel();
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      //{EntityName:"account",CachingKey:"account",Mode: LookupRequestMode.LookupWithId},
      {EntityName:"ldv_plantype",CachingKey:"ldv_plantype_LookupWithId",Mode: LookupRequestMode.LookupWithId},
      {EntityName:"ldv_planapproval",CachingKey:"ldv_planapproval_ldv_planelements_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_planelements" },
      {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_constructioncontractstatus_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_constructioncontractstatus" },
      {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_legalstatus_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_legalstatus" },
      {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_pricingdate_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_pricingdate" },

    ];
  }

  ngOnInit() {
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.translateService.get('moreValues').subscribe(
                  moreValues =>{
                    this.config['placeholder'] = sel;
                    this.config['noResultsFound'] = no;
                    this.config['searchPlaceholder'] = search;
                    this.config['moreText'] = moreValues;
                  }
                )
              });
          }); 
    });
    // this.isGeneralInfoSatgeActive = true;
    // this.isGeneralInfoSatgeActive = true;
    // // this.isDetiledDocActive = true;
    // // this.isGeneralDocActive = true;

    // this.isBiddingComActive = true;   
    // this.isPriceOfferComActive = true;  
    // this.isDetiledDocReadOnly = false;
    // this.isGeneralDocReadOnly = false;

    this.serviceType = ServiceTypeEnum.PlanApproval;
    // this.BidderId = this.activatedRoute.snapshot.queryParams["BidderId"];
    // this.InvestorId = this.activatedRoute.snapshot.queryParams["InvestorId"];
    //this.currentUser = this.activatedRoute.snapshot.queryParams["CurrentUser"];
    // debugger;
    // if(!this.BidderId){

    //   // this.BidderId = "D7FC569B-8B6E-EA11-A96F-000D3AAB0880";
    //   // this.BidderId = "097CE017-086D-EA11-A966-000D3AAB0880"; // QC
    //   this.BidderId = "068A631B-F31F-EA11-A98E-000D3A46F0D9"; // New
    // }

    if(!this.InvestorId ){

      this.InvestorId = "98F1DF10-1395-EA11-A9E4-000D3AAB0880"; // New
      //this.InvestorId = "E702F6CD-266D-EA11-A966-000D3AAB0880"; //QC
      //this.InvestorId = "90b6fed5-ee4b-ea11-a9b6-000d3a46f0d9";

    }

    // if(!this.currentUser){

    //   this.currentUser = this.testUserEnum.Investor;
    //   //this.currentUser = this.testUserEnum.Bidder;
    // }


    this.PlanApprovalId = this.activatedRoute.snapshot.queryParams["Id"];
    this.CurrentContract = new ContractInfoModel();
   
    //this.isDraftSatgeReadOnly=true;
    
    // var x = this.Application.Request;
    //  console.log("X = "+ this.Application);
    this.IsRequestValid = true;
    this.isCurrentCR=false;
    this.isCurrentContract=true;
    
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

  public cRChanged(){
    // debugger;
    this.IsRequestValid=true;
    this.isSubmit = false;
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != ""){
      this.GetValidateCRContractsBalances();
      this.GetContractsRelatedToCR();
      this.GetContactDetailsByCR();
      this.getCRInfo();
      this.isContractNumberReadOnly = false;
      this.isPlanTypeReadOnly = true;
      this.Application.Request.ContractNumberId = undefined;
      this.Application.Request.PlanTypeId = undefined;
    }
  }

  protected GetContractsRelatedToCR() {
    if (!this.getContract) {
      this.getContract = true

      this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
      this.requestService.GetContractsRelatedToCR(this.Application.Request.CRId).subscribe(
        res => {
          this.getContract = false;
          if (res.ResponseCode === ResponseCode.Success)
            this.lookupService.handleRetrievedLookup(res.Content);
        }
      );

    }
  }

  protected GetContactDetailsByCR() {
    if (!this.getContact) {
      this.getContact = true

      this.requestService.getCRContacts(this.Application.Request.CRId).subscribe(
        res => {
          this.getContact = false;
          if (res.ResponseCode === ResponseCode.Success){

            this.lookupService.handleRetrievedLookup(res.Content);
            if(this.Application.Request.Contacts != null && 
              this.Application.Request.Contacts.length > 0){
              this.onContactChange(this.Application.Request.Contacts);
                }
          }

        }
      );

    }
  }

  protected afterFormReady(): void {
    //debugger;
    if(this.Application.Request){
      this.GetCurrentUserType(this.Application.Request.CRId, 0);
    }
    if(this.Application.Request && this.Application.Request.ConsultingOfficeId){
      this.BidderId = this.Application.Request.ConsultingOfficeId;
    }
    if(this.Application.Request && this.Application.Request.PlanTypeId){
      if (this.Application.Request.PlanTypeId && //Safety Plan 
        this.Application.Request.PlanTypeId.toLowerCase() === "e8f09cd2-c15e-ea11-a9d7-000d3a46f0d9"){
          this.requestType = RequestTypeEnum.SafetyMainBranch;
        }
    }
    //this.Application.Request.InvestorId = this.InvestorId;
    if(this.Application.Request.Requirefees){
      
      this.formStructure[0].children.push(
        {index:6, label:"PlanApproval.PaymentStage", type:NodeType.Child , children:
          [
            {index:1, label:"PlanApproval.Payment", type: NodeType.Section, data:"PaymentSection"},
          ]
        }
      );
    }
    //this.getDynamicLookups();
    
    this.setStages();
    this.PlanTyepChanged();
    //debugger;
    // if(this.Application.Request.CRId){
    //   this.cRChanged();
    // }
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != ""){
      this.GetContactDetailsByCR();
      this.GetContractsRelatedToCR();
      this.getCRInfo();
      
      //this.GetCurrentUserType(this.Application.Request.CRId, 0);
      this.lookupService.lookupEntities['account_CRsByTypeInvestor'] = [
        { Text: this.Application.Request.CRName, Value: this.Application.Request.CRId }
      ];
      if(this.Application.Request.ContractNumberId!=Guid.EMPTY){
        // debugger;
        this.getContractInfo();
      }
    }
    else{
      this.GetCRsByTypeByContactId(CrTypeEnum.Investor);
    }



    //debugger;
    if(this.Application.Request.OfficeOrBidding == BiddingOrOffice.Office){
      this.isSpasifice = true;
      this.spacificPriceOffer = new PriceOfferModel();
      this.spacificPriceOffer.PriceOfferValue = this.Application.Request.PriceOfferValue != 0?this.Application.Request.PriceOfferValue:undefined;
      this.spacificPriceOffer.Comment = this.Application.Request.OfficeComment;
      if(this.currentUser ==this.testUserEnum.Investor ){

        this.formStructure[0].children.splice(2,1);
        if(this.ActiveLevelTwo == 3){

          this.ActiveLevelTwo = 2;
          }
      }
      else if(this.currentUser ==this.testUserEnum.Bidder){
        
        this.formStructure[0].children.splice(1,1);
      }
    }

    if(this.Application.Request.Contacts != null &&
       this.Application.Request.Contacts.length > 0 && 
       this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']){
      this.onContactChange(this.Application.Request.Contacts);
    }
    if(this.Application.Request){
      this.isCadastralPlanDocReadOnly = this.Application.Request.IsContractHasCadastralDocument;
        this.isPreviousPlanDocReadOnly = this.Application.Request.IsContractHasPreviousDocument;
    }

  }

  // protected getDynamicLookups() {
  //   this.requestService.getDynamicLookups().subscribe(
  //     res => {
  //       if (res.ResponseCode === ResponseCode.Success)
  //         this.lookupService.handleRetrievedLookup(res.Content);
  //     }
  //   )
  // }

  protected GetCRsByTypeByContactId(crType: number) {
    this.requestService.GetCRsByTypeByContactId(crType).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }

  protected GetFilteredOfficeByTypeByContactId() {
    this.requestService.GetFilteredOfficeByTypeByContactId(this.Application.Request.IndustrialCityId,
      this.requestType).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }

  // protected GetCurrentUserType(CRId: string) {
  //   this.requestService.GetCurrentUserType(CRId).subscribe(
  //     res => {
  //       if (res.ResponseCode ===  ResponseCode.Success){
  //         this.currentUser =  res.Content;//TestUser[res.Content];
  //       }
  //     }
  //   )
  // }

  protected GetCurrentUserType(CRId: string, Counter: number) {
    // Counter = 1 means check if contact related to CR
    // Counter = 2 means check if contact related to Consulting Office
    Counter += 1;
    this.requestService.GetCurrentUserType(CRId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          this.currentUser = res.Content;
          if (this.currentUser == -1) {
            if (Counter == 1) {
              if (this.Application.Request.ConsultingOfficeId != undefined 
                && this.Application.Request.ConsultingOfficeId != Guid.EMPTY) {
                this.GetCurrentUserType(this.Application.Request.ConsultingOfficeId, Counter);
              }

            // Contact Not Related to CR Or Consulting Office So check if we are on bidding Status
              if (this.Application.ApplicationHeader.CRMStatusCode == 
                this.cRMStatusCodeEnum.CreateBidding.toString()) {
                this.currentUser = 1;
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

  protected setStages(){
   debugger;
    //console.log("Naglaa " + this.Application.Request.ActiveBidding);
    if(this.PlanApprovalId != undefined && this.PlanApprovalId != Guid.EMPTY){
      this.checked = true;
      if(this.Application.ApplicationHeader.CRMStatusCode ==
        this.cRMStatusCodeEnum.Draft.toString()){ 
          this.isBiddingComReadOnly = false;

          this.ActiveLevelTwo = 2;
     }
      else  if(this.Application.ApplicationHeader.CRMStatusCode ==
       this.cRMStatusCodeEnum.CreateBidding.toString() || 
       this.Application.ApplicationHeader.CRMStatusCode ==
       this.cRMStatusCodeEnum.InvestorDecision.toString() ||
       this.Application.ApplicationHeader.CRMStatusCode ==
       this.cRMStatusCodeEnum.PendingOfficeDecision.toString()){ 

        this.isDraftSatgeReadOnly = true;
        this.isBiddingComReadOnly = true;
        this.isPriceOfferComReadOnly = false;
        this.ActiveLevelTwo = 3;
        this.isCadastralPlanDocReadOnly = true;
        this.isPreviousPlanDocReadOnly = true;

        if (this.currentUser == 1) {
          this.GetFilteredOfficeByTypeByContactId();
          this.BidderId = this.Application.Request.ConsultingOfficeId;
        }
        if((this.Application.ApplicationHeader.CRMStatusCode == 
          this.cRMStatusCodeEnum.PendingOfficeDecision.toString()) &&
          this.currentUser == 0){
            this.isPriceOfferComReadOnly = true;
          }
        //this.isSubmit = true;
      }
      else if((this.Application.ApplicationHeader.CRMStatusCode == 
        this.cRMStatusCodeEnum.PendingOnIndustrialCityAdmin.toString() && 
        this.Application.Request.Isdetailedplansubmitted == false 
        &&  this.Application.Request.Isgeneralplansubmitted == true ) ||
      this.Application.ApplicationHeader.CRMStatusCode ==
      this.cRMStatusCodeEnum.PendingAddingGeneraPlan.toString() ||
      this.Application.ApplicationHeader.CRMStatusCode ==
       this.cRMStatusCodeEnum.PendingOnOfficeToEditGeneralPlans.toString()){
         if(this.Application.ApplicationHeader.CRMStatusCode == 
          this.cRMStatusCodeEnum.PendingOnIndustrialCityAdmin.toString()){
            this.isGeneralDocReadOnly = true;
          }
          else{
            this.isGeneralDocReadOnly = false;
          }
        this.isDraftSatgeReadOnly = true;
        this.isBiddingComReadOnly = true;
        this.ActiveLevelTwo = 4;
        this.isCadastralPlanDocReadOnly = true;
        this.isPreviousPlanDocReadOnly = true;
        //this.isSubmit = true;
      }
      else if((this.Application.ApplicationHeader.CRMStatusCode == 
        this.cRMStatusCodeEnum.PendingOnIndustrialCityAdmin.toString() && 
        this.Application.Request.Isdetailedplansubmitted == true 
        &&  this.Application.Request.Isgeneralplansubmitted == true ) ||
        this.Application.ApplicationHeader.CRMStatusCode ==
        this.cRMStatusCodeEnum.PendingAddingDetailedPlan.toString() ||
        this.Application.ApplicationHeader.CRMStatusCode ==
         this.cRMStatusCodeEnum.PendingOnOfficeToEditDetailedPlans.toString()){
           if(this.Application.ApplicationHeader.CRMStatusCode == 
            this.cRMStatusCodeEnum.PendingOnIndustrialCityAdmin.toString()){
              this.isDetiledDocReadOnly = true;
            }
            else{
              this.isDetiledDocReadOnly = false;
            }
          this.isDraftSatgeReadOnly = true;
          this.isBiddingComReadOnly = true;
          this.ActiveLevelTwo = 5;
          this.isCadastralPlanDocReadOnly = true;
        this.isPreviousPlanDocReadOnly = true;
        //this.isSubmit = true;
      }
      else if(this.Application.ApplicationHeader.CRMStatusCode ==
        this.cRMStatusCodeEnum.PendingPayment.toString()){
          this.isPaymentSatgeReadOnly = true;
          this.isDraftSatgeReadOnly = true;
          this.isBiddingComReadOnly = true;
          this.isGeneralDocReadOnly = true;
          this.isDetiledDocReadOnly = true;
          //this.isSubmit = true;
          this.ActiveLevelTwo = 6;
      }else{
          this.isDraftSatgeReadOnly = true;
          this.isCadastralPlanDocReadOnly = true;
          this.isPreviousPlanDocReadOnly = true;
          this.isPaymentSatgeReadOnly = true;
          this.isDraftSatgeReadOnly = true;
          this.isBiddingComReadOnly = true;
          this.isGeneralDocReadOnly = true;
          this.isDetiledDocReadOnly = true;
        //  this.isSubmit = true;
      }
      if(this.Application.ApplicationHeader.CRMStatusCode !=
        this.cRMStatusCodeEnum.Draft.toString() && !this.isFirstSetStageVisit ){//&& this.currentUser == 0){
          // this.formStructure[0].children.push(
          //   {index:6, label:"PlanApproval.PaymentStage", type:NodeType.Child , children:
          //     [
          //       {index:1, label:"PlanApproval.Payment", type: NodeType.Section, data:"PaymentSection"},
          //     ]
          //   }
          // );
          this.formStructure.push(
            {index:2,label:"PlanApproval.RequestComments",type:NodeType.Parent,children:[]}
          );
        }    
    }
    this.isFirstSetStageVisit = true;
  }

  OnSubmitPriceOffer(priceOfferModel:PriceOfferModel){
    //debugger;
    if(priceOfferModel.ChoosePriceOfferOrRejectAll == true){//Investor Approve Bidding
      this.Application.Request.ConsultingOfficeId = priceOfferModel.BidderNameId;
      this.Application.Request.Investorbiddingdecision = InvestorBiddingDecision.Chooseconsultingoffice;
    }
    else if(priceOfferModel.ChoosePriceOfferOrRejectAll == false){//Investor Reject All 
      this.Application.Request.Investorbiddingdecision = InvestorBiddingDecision.Rejectall;
    }
    else if(priceOfferModel.ApprovedRejectSpacifice == true){//المكتب وافق
      this.Application.Request.ConsultingOfficeDecision = ConsultingofficeDecision.Approve;
      this.Application.Request.PriceOfferValue = priceOfferModel.PriceOfferValue;
      this.Application.Request.OfficeComment = priceOfferModel.Comment;
    }
    else if(priceOfferModel.ApprovedRejectSpacifice == false){//المكتب رفض
      this.Application.Request.ConsultingOfficeDecision = ConsultingofficeDecision.Reject;
      this.Application.Request.OfficeComment = priceOfferModel.Comment;
    }
    //debugger;
    if(priceOfferModel.ErrorMessage){
      //alert(priceOfferModel.ErrorMessage);

      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = priceOfferModel.ErrorMessage;
      SharedHelper.scrollToBody();
      SharedHelper.hideLoader();
      // this.alertService.error(priceOfferModel.ErrorMessage,"","");
    }
    else{
      //alert("Submit");
      this.submitForm();
    }
  }


  SaveAsDraft(){
    //this.isSubmit = true;
    // if(this.isNeedPreviousPlan || this.isNeedSafetyPlan){
    //   var isvalidDoc = this.validateDocuments();
    //   if(isvalidDoc){
    //     this.saveApplication();
    //   }
    // }
    // else{
    //   this.saveApplication();
    // }
    if(this.checked){
    this.saveApplication();
    this.isPlanTypeReadOnly = true;
    this.isContractNumberReadOnly = true;
    }
    
  }

  Next() {
    this.SaveAsDraft();
    this.ActiveLevelTwo = 2;
    this.isBiddingComReadOnly = false;

    //this.submitPlanApproval();
   // this.validateForm(this.stageOne);
  }

  OnSubmitBidding(biddingData: BiddingModel){

    //console.log(biddingData);
    //this.isSubmit = true;
    this.Application.Request.Issubmitted = true;
    this.Application.Request.OfficeOrBidding = biddingData.officeorbidding;
    this.Application.Request.AddScopOfWork = biddingData.AddScopOfWork;
    this.Application.Request.ConsultingOfficeId =  biddingData.ConsultingOfficeId;
    this.Application.Request.InvestorId = this.InvestorId;

    // var x = this.Application.Request.ActiveBidding;
    //debugger;
    if(this.validateDocuments() &&
     this.checked &&
     this.Application.Request.Contacts &&
     this.Application.Request.Contacts.length > 0 && 
      this.Application.Request.PlanElements && 
      this.Application.Request.PlanElements.length > 0 &&
      (!this.Application.Request.ActiveBidding ||
        this.Application.Request.ActiveBidding == Guid.EMPTY)){
          this.isSubmit = true;
      this.submitForm();

    }
    else {

      this.ActiveLevelTwo = 1;
      this.isSubmit = true;
    }
  }


  SubmitDocuments(){
    var isvalidDoc = this.validateDocuments();
    if(isvalidDoc){
      this.submitForm();
    }
  }

  PlanTyepChanged(){
    // debugger;
    //  if(!this.Application.ApplicationHeader || this.Application.ApplicationHeader.CRMStatusCode ==
    //   this.cRMStatusCodeEnum.Draft.toString()){
        this.isSubmit = false;
        if(this.Application.Request.PlanTypeId && //Modification of a scheme or expansion
          this.Application.Request.PlanTypeId.toLowerCase() === "699cbdc4-c15e-ea11-a9d7-000d3a46f0d9"){
          this.isNeedPreviousPlan = true;
          this.isNeedSafetyPlan = false;
          this.ShowSapceRow = true;
          this.requestType = RequestTypeEnum.GeneralMainBranch;

        }else if (this.Application.Request.PlanTypeId && //Safety Plan 
           this.Application.Request.PlanTypeId.toLowerCase() === "e8f09cd2-c15e-ea11-a9d7-000d3a46f0d9"){
          this.isNeedSafetyPlan = true;
          this.isNeedPreviousPlan = false;
          this.ShowSapceRow = false;
          this.requestType = RequestTypeEnum.SafetyMainBranch;
        }
        else{
          this.isNeedPreviousPlan = false;
          this.isNeedSafetyPlan = false;
          this.ShowSapceRow = false;
          this.requestType = RequestTypeEnum.GeneralMainBranch;
        }
        if((!this.Application.ApplicationHeader || this.Application.ApplicationHeader.CRMStatusCode ==
          this.cRMStatusCodeEnum.Draft.toString()) &&
           this.Application.Request.PlanTypeId != undefined && 
           this.Application.Request.PlanTypeId != null){
          if (!this.getRequestValidation) {
            this.getRequestValidation = true;
            this.requestService.ValidatePlanApprovalRequest(this.Application.Request.PlanTypeId, 
              this.Application.Request.ContractNumberId, this.Application.Request.CRId,
              this.Application.Request.Id).subscribe(
              res => {
                this.getRequestValidation = false;
                if (res.ResponseCode === ResponseCode.Success){
                  this.Application.Request.ScopeOfWork = res.Content.PlanTypeScopOfWork;
                  this.IsRequestValid = res.Content.IsValid;
                    this.Application.Documents = res.Content.Documents;
                    this.Application.Request.IsContractHasCadastralDocument = res.Content.IsContractHasCadastralDocument;
                    this.Application.Request.IsContractHasPreviousDocument = res.Content.IsContractHasPreviousDocument;
                    this.isCadastralPlanDocReadOnly = res.Content.IsContractHasCadastralDocument;
                    this.isPreviousPlanDocReadOnly = res.Content.IsContractHasPreviousDocument;

                  this.Application.Request.IndustrialCityId = res.Content.IndustrialCity;
                }
                if (res.ResponseCode === ResponseCode.Error){
                  this.IsRequestValid = false;
                  this.Application.Request.ScopeOfWork = undefined;
                  this.isContractNumberReadOnly = true;
                  this.isPlanTypeReadOnly = true;
                  this.requestValidMsg = res.FriendlyResponseMessage;
                  this.Application.Request.IndustrialCityId = undefined;
               }
              }
            )
          } 
        }
    //}
      
  }

  submitGeneralPlans(){
    var isvalidDoc = this.validateDocuments();
    if(isvalidDoc){

      this.submitForm();
    }
  }

  OnContractChange(){
    if(this.Application.Request.ContractNumberId != undefined && 
      this.Application.Request.ContractNumberId != ""){
        this.isPlanTypeReadOnly = false;
        this.Application.Request.Contractmeternumber = undefined;
        this.Application.Request.PlanTypeId = undefined;
        this.requestService.GetContractMeterNumberByContract(this.Application.Request.ContractNumberId).subscribe(
          res => {
            if (res.ResponseCode === ResponseCode.Success){
              this.Application.Request.Contractmeternumber = res.Content;
              this.IsContractMeternNmberHasValue = true;
              this.getContractInfo();
            }
            if (res.ResponseCode === ResponseCode.Error){
              this.IsContractMeternNmberHasValue = false;
              this.contractMeternNmberValidMsg = res.FriendlyResponseMessage;
              // this.IsRequestValid = false;
              //     this.Application.Request.ScopeOfWork = undefined;
              //     this.isContractNumberReadOnly = true;
              //     this.isPlanTypeReadOnly = true;
              //     this.requestValidMsg = res.FriendlyResponseMessage;
           }
          }
        )
      }
      else{
        this.isPlanTypeReadOnly = true;
      }
    // if(this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != ""){
    //   this.isPlanTypeReadOnly = false;
    // }
  }

  onContactChange(contacts:string[]){
    this.isSubmit = false;
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
        
        if(contactDet['Value']==contactId){
          this.contactsList.push(contactDet);
          
        }
      }

      this.contactsList[i].IsDeleted = false;
      this.contactsList[i].IsUpdated = false;
    }
  }

 // SetPlanElementValue(){
    // if(this.Application.Request.PlanElementsString != undefined && 
    //   this.Application.Request.PlanElementsString != ""){
    //   this.Application.Request.PlanElements = this.Application.Request.PlanElementsString;
    // }
 // }


  getCRInfo(){
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
      if(results.ResponseCode === ResponseCode.Success)
      {
        this.CurrentCR = results.Content.CR;
      }
    this.isCurrentCR = false;

    });
  }

  getContractInfo(){
    this.isCurrentContract = true;
    this.requestService.GetContractInfo(this.Application.Request.ContractNumberId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success){
          //Add Here ya Omar :D 
          this.CurrentContract = res.Content;
          let constructionStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_constructioncontractstatus_OptionSet"];
          let legalStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_legalstatus_OptionSet"];
          let PricingDateOS = this.lookupService.lookupEntities["ldv_contract_ldv_pricingdate_OptionSet"];

          this.CurrentContract.ConstructionContractStatus = constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0]?constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0].Text:null;
          this.CurrentContract.LegalStatus = legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0]?legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0].Text:null;
          this.CurrentContract.Pricingdate = PricingDateOS.filter(c => c.Value ==this.CurrentContract.Pricingdate)[0]?PricingDateOS.filter(c => c.Value ==this.CurrentContract.Pricingdate)[0].Text:null;

          if(this.CurrentContract.Contacts && this.CurrentContract.Contacts.length > 0){
            this.contactDetailsfromContract = this.CurrentContract.Contacts[0].Result;
            this.contactDetailsfromContract.forEach(x=>{
              x.IsDeleted=false;
              x.IsUpdated=false;
            })
          }
          else{
            this.contactDetailsfromContract = null;
          }

        }

        this.isCurrentContract = false;

      }
    );
  }
  openPopup(){
    this.modalService.open(this.popUpTemplate, {size: 'lg', backdrop: 'static' });
  }
}
