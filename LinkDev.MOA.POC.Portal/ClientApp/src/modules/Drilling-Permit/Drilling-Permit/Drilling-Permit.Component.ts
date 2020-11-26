import { Component, OnInit, ViewChild } from '@angular/core';
import { DrillingPermitService } from '../service/Drilling-Permit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { debug } from 'console';
import { ColumnFieldType, GridColumn } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { NgForm } from '@angular/forms';
import { DrillingModal } from '../Model/DrillingPermitModel';
import { DrillingPermitOutputModel } from '../Model/DrillingPermitOutputModel';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import 'hijri-date';
import { truncate } from 'fs';


@Component({
  selector: 'app-Drilling-Permit',
  templateUrl: './Drilling-Permit.Component.html',
  styleUrls: ['./Drilling-Permit.Component.css']
})
export class DrillingPermitComponent extends EServicesBase<DrillingModal> implements OnInit {
  isCurrentCR: boolean;
  IsDecimalWorkDimensionsWidthm: boolean = false;
  IsDecimalWorkDimensionsHeightm: boolean = false;
  IsDecimalWorkOverallLength: boolean = false;
  IsDecimalWorkDimensionLengthm: boolean = false;
  submit: boolean = false;
  getContract: any;
  IsRequestValid: boolean;
  IsDefaultIndustrialcity: boolean = false;;
  requestValidMsg: string;
  IsDuplicated: boolean;
  contractValidationMsg: string;
  isSubmit: boolean;
  isContractNumberReadOnly: boolean;
  CurrentCR: CRModel = {};
  isCurrentContract: boolean;
  CurrentContract: ContractInfoModel;
  yesText: string = "Yes";
  NoText: string = "No";
  ActiveLevelOne: number = 1;
  contactContracts: RetrieveOptionsRequest[];
  CRNameText: string;
  isDesign: boolean = false;
  IsContract: boolean = false;
  isAutoOrManula: boolean = false;
  contactDetailsfromContract: ContactDetails[];
  getContact: any;
  contactsList: ContactDetails[];
  gridModel: ContactDetails;
  IsStartDateInThePast: boolean = false;
  IsEndDateInThePast: boolean = false;
  IsEndLessThanStart: boolean = false;
  IsOldRequest: boolean = false;
  IsNewRequest: boolean = true;
  IsOther: boolean = false;
  DateNow: Date;
  CoordinationDestinationLenght: number;
  NowYear: number;
  NowMonth: number;
  NowDay: number;
  @ViewChild('DrillingPermitForm') form: NgForm;
  gridcols: GridColumn[] = [{
    header: "PlanApproval.Name",
    field: "Name",
    typeConfig: {
      type: ColumnFieldType.Text
    }
  }, {
    header: "PlanApproval.Email",
    field: "Email",
    typeConfig: {
      type: ColumnFieldType.Text
    }
  }, {
    header: "PlanApproval.Mobile",
    field: "Mobile",
    typeConfig: {
      type: ColumnFieldType.Text
    }
  }
  ];

  constructor(public DrillingPermitService: DrillingPermitService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public modalService: NgbModal,
    private titleService: Title,
    public router: Router,
    public contractSubmissionService: ContractSubmissionService) {
    super(DrillingPermitService, lookupService, activatedRoute, alertService, translateService, modalService, router);
  }

  public TApplicationNewInstance(): DrillingModal {
    return new DrillingModal();
  }
  public getQueryStringNames(): string[] {
    debugger;
    return ["Id"];
  }
  formStructure: FormHierarchyBase[] =
    [
      { index: 1, label: "DrillingPermit.RequestDetails", type: NodeType.Parent, children: [] },
      //{index:2,label:"DrillingPermit.ManagerDetails",type:NodeType.Parent,children:[]},
    ];
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  //#region Validation messages
  ExportingPercentageValidations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.ValidPercentage0-100' }
  Required_1_75Validations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.ValidPercentage1-75' }
  Required_1_100Validations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.ValidPercentage1-100' }
  Required_WholeNumberValidations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.WholeNumber' }
  Required_GreaterThanZeroValidations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.GreaterThanZero' }
  Required_MobileValidations: { [index: string]: string } = { 'required': 'Validations.Required', 'pattern': 'Validations.Mobile' }
  //#endregion
  ngOnInit() {

    this.translateService.get('SELECT').subscribe(sel => { this.translateService.get('NO_RESULT_FOUND').subscribe(no => { this.translateService.get('SEARCH').subscribe(search => { this.translateService.get('moreValues').subscribe(moreValues => { this.config['placeholder'] = sel; this.config['noResultsFound'] = no; this.config['searchPlaceholder'] = search; this.config['moreText'] = moreValues; }) }); }); });
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.config['placeholder'] = sel;
            this.config['noResultsFound'] = no;
          }
        )
      })
    //this.GetRelatedContracts();
    this.IsRequestValid = true;
  }
  onSelect = (node: FormHierarchyBase) => {
    if (node.type == NodeType.Parent)
      this.ActiveLevelOne = node.index;
  }


  public setIslamicDate() {
    debugger;
    this.Application.Request.DrillingPermitStartingDateInhijriDays = this.Application.Request.DrillingPermitStartingDateinhijri.day;
    this.Application.Request.DrillingPermitStartingDateInhijriMonth = this.Application.Request.DrillingPermitStartingDateinhijri.month;
    this.Application.Request.DrillingPermitStartingDateInhijriYear = this.Application.Request.DrillingPermitStartingDateinhijri.year;

    this.Application.Request.DrillingPermitEndingDateInhijriDays = this.Application.Request.DrillingPermitEndingDateinhijri.day;
    this.Application.Request.DrillingPermitEndingDateInhijriMonth = this.Application.Request.DrillingPermitEndingDateinhijri.month;
    this.Application.Request.DrillingPermitEndingDateInhijriYear = this.Application.Request.DrillingPermitEndingDateinhijri.year;
  }

  // public GetRelatedContracts()
  // {

  //   this.DrillingPermitService.GetContractsRelatedToContact().subscribe(res => 
  //     {
  //     this.contactContracts = res.Content;
  //     if(this.contactContracts.length == 0 || this.contactContracts[0].Result.length == 0)
  //         this.goToErrorPage("DrillingPermit.RequestDetails");

  //     this.lookupService.handleRetrievedLookup(this.contactContracts);
  //     if(this.Application.Request.ContractNumberId != "" && this.Application.Request.ContractNumberId != undefined)
  //     {
  //    //  var selectedContractObj = this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"].filter(c=>c.Value == this.Application.Request.ContractNumberId);
  //   //   this.CRNameText = selectedContractObj[0]["CRName"] +"-"+selectedContractObj[0]["CRNumber"];
  //      this.CRNameText = this.Application.Request.ContractNumberId;
  //     }
  //   }, error => {
  //     debugger;
  //     console.log("GetContracts error");
  //   });
  // }

  public getDynamicLookups() {
    debugger;
    this.DrillingPermitService.getDynamicLookups().subscribe(
      res => {

        if (res.ResponseCode === ResponseCode.Success)
          debugger;
        this.lookupService.handleRetrievedLookup(res.Content);
      }
    )

  }
  public getLookupTypes(): RetrieveOptionsRequest[] {
    this.translateService.get('Yes').subscribe(res => {
      this.yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          this.NoText = res;
          let d: RetrieveOptionsRequest[] = [{ CachingKey: "YesNo", EntityName: "", Mode: 1, Result: [{ Text: this.yesText, Value: 'true' }, { Text: this.NoText, Value: 'false' }] }]
          this.lookupService.handleRetrievedLookup(d);
        }
      )
    })
    return [


      { EntityName: "ldv_drillingpermitrequest", CachingKey: "ldv_drillingpermitrequest_ldv_designorcontractwithinvestor_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_designorcontractwithinvestor" },

      // { EntityName: "ldv_drillingpermitrequest", CachingKey: "ldv_drillingpermitrequest_ldv_coordinationdestination_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_coordinationdestination" },

      { EntityName: "ldv_drillingpermittypes", CachingKey: "ldv_drillingpermittypes_LookupWithId", Mode: LookupRequestMode.LookupWithId },
      { EntityName: "ldv_industrialcity", CachingKey: "ldv_industrialcity_LookupWithId", Mode: LookupRequestMode.LookupWithId },
      { EntityName: "ldv_drillingpermitrequest", CachingKey: "ldv_drillingpermitrequest_ldv_drillingmethod_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_drillingmethod" },
      { EntityName: "ldv_drillingpermitrequest", CachingKey: "ldv_drillingpermitrequest_ldv_drillingtype_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_drillingtype" },
      // { EntityName: "ldv_drillingpermit", CachingKey: "ldv_drillingpermit_LookupWithId", Mode: LookupRequestMode.LookupWithId },
      //{EntityName:"account",CachingKey:"account_CRsByTypeInvestor",Mode:  LookupRequestMode.LookupWithId},
      { EntityName: "ldv_drillingpermitrequest", CachingKey: "ldv_drillingpermitrequest_ldv_requesttype_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_requesttype" },

    ];

  }
  public afterFormReady(): void {
    debugger;
    this.getDynamicLookups();
    //this.OnRequestTypeChange();
    // this.CoordinationDestinationLenght = this.Application.Request.CoordinationDestination.length;
    this.getCRInfo();
    // if (this.Application.Request.RequestType !== 2) {
    //   this.formStructure.push({ index: 2, label: "DrillingPermit.ProjectDetails", type: NodeType.Parent });
    //   //this.ActiveLevelOne = 2;
    // }
    //Check status and add second tab for request comments
    if (this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1') {
      this.formStructure.push({ index: 3, label: "DrillingPermit.RequestComments", type: NodeType.Parent });
      //this.ActiveLevelOne = 2;
    }
    if (this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '59') {
      this.Application.IsReadOnly = false;
    }

    ////////
    // if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != "")
    // {
    //   this.getCRInfo();
    //   this.GetContactDetailsByCR();
    // }
    // if(this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != "")
    // {

    //   this.getContractInfo();
    // }
  }


  public DesignNumberChange() {

    if (this.Application.Request.DesignorContractWithInvestor != undefined && this.Application.Request.DesignorContractWithInvestor == 1) {
      this.isDesign = true;
      this.IsContract = false;
      this.Application.Request.ContractNumberString = null;
      this.Application.Request.IndustrialCityId = null;
      this.IsDefaultIndustrialcity = false;
    }
    else {
      this.Application.Request.ContractNumberString = null;
      this.Application.Request.IndustrialCityId = null;
      this.isDesign = false;
      this.IsContract = true;
    }

  }

  public DrillingTyeChange() {
    this.Application.Request.DrillingPermitType;
    if (this.Application.Request.DrillingPermitTypeId != undefined && this.Application.Request.DrillingPermitTypeId == "d278cdd0-20fc-ea11-a995-000d3aaa6848") {
      this.IsOther = true;

    }
    else {
      this.IsOther = false;
    }

  }

  public DrillingMethodChange() {
    debugger;
    if (this.Application.Request.DrillingMethod != undefined && (this.Application.Request.DrillingMethod == 1 || this.Application.Request.DrillingMethod == 2)) {
      this.isAutoOrManula = true;
    }
    else {
      this.isAutoOrManula = false;
    }

  }


  //   public GetContactDetailsByCR() {
  //     if (!this.getContact) {
  //       this.getContact = true
  // debugger;
  //       this.DrillingPermitService.getCRContacts(this.Application.Request.CRId).subscribe(
  //         res => {
  //           debugger
  //           this.getContact = false;
  //           if (res.ResponseCode === ResponseCode.Success){

  //             this.lookupService.handleRetrievedLookup(res.Content);
  //             if(this.Application.Request.Contacts != null && 
  //               this.Application.Request.Contacts.length > 0){
  //               this.onContactChange(this.Application.Request.Contacts);
  //                 }
  //           }

  //         }
  //       );

  //     }
  //   }
  ValidateDateInTheFuture() {
    debugger;

    this.DateNow = new Date();
    this.DateNow = toHijri(this.DateNow);
    this.NowYear = this.DateNow.getFullYear();
    this.NowMonth = this.DateNow.getMonth();
    this.NowDay = this.DateNow.getDay();
    // this.Application.Request.CoordinationDestination=null;

    if (this.Application.Request.DrillingPermitStartingDateinhijri != undefined) {

      if (this.Application.Request.DrillingPermitStartingDateinhijri.year < this.NowYear) {
        this.IsStartDateInThePast = true;
        return;
      }

      if (this.Application.Request.DrillingPermitStartingDateinhijri.year == this.NowYear && this.Application.Request.DrillingPermitStartingDateinhijri.month < this.NowMonth) {

        this.IsStartDateInThePast = true;

        return;

      }

      if (this.Application.Request.DrillingPermitStartingDateinhijri.year != undefined && this.Application.Request.DrillingPermitStartingDateinhijri.year == this.NowYear && this.Application.Request.DrillingPermitStartingDateinhijri.month == this.NowMonth && this.Application.Request.DrillingPermitStartingDateinhijri.day < this.NowDay) {
        this.IsStartDateInThePast = true;
        return;

      }
      this.IsStartDateInThePast = false;
      this.Application.Request.hijristartdate = this.Application.Request.DrillingPermitStartingDateinhijri.day + "-" + this.Application.Request.DrillingPermitStartingDateinhijri.month + "-" + this.Application.Request.DrillingPermitStartingDateinhijri.year;

    }

    // End Date In the Past********************************************************************************************************************************************* */

    if (this.Application.Request.DrillingPermitEndingDateinhijri != undefined) {

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year < this.NowYear) {
        this.IsEndDateInThePast = true;
        return;
      }

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year == this.NowYear && this.Application.Request.DrillingPermitEndingDateinhijri.month < this.NowMonth) {

        this.IsEndDateInThePast = true;
        return;

      }

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year != undefined && this.Application.Request.DrillingPermitEndingDateinhijri.year == this.NowYear && this.Application.Request.DrillingPermitEndingDateinhijri.month == this.NowMonth && this.Application.Request.DrillingPermitEndingDateinhijri.day < this.NowDay) {
        this.IsEndDateInThePast = true;
        return;

      }
      this.IsEndDateInThePast = false;

    }

    // End Date Greater Than Start Date. ********************************************************************************************************************************************* */

    if (this.Application.Request.DrillingPermitEndingDateinhijri != undefined && this.Application.Request.DrillingPermitStartingDateinhijri != undefined) {

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year < this.Application.Request.DrillingPermitStartingDateinhijri.year) {
        this.IsEndLessThanStart = true;
        return;
      }

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year == this.Application.Request.DrillingPermitStartingDateinhijri.year && this.Application.Request.DrillingPermitEndingDateinhijri.month < this.Application.Request.DrillingPermitStartingDateinhijri.month) {

        this.IsEndLessThanStart = true;
        return;

      }

      if (this.Application.Request.DrillingPermitEndingDateinhijri.year != undefined && this.Application.Request.DrillingPermitEndingDateinhijri.year == this.Application.Request.DrillingPermitStartingDateinhijri.year && this.Application.Request.DrillingPermitEndingDateinhijri.month == this.Application.Request.DrillingPermitStartingDateinhijri.month && this.Application.Request.DrillingPermitEndingDateinhijri.day < this.Application.Request.DrillingPermitStartingDateinhijri.day) {
        this.IsEndLessThanStart = true;
        return;

      }
      this.IsEndLessThanStart = false;
      this.Application.Request.hijrienddate = this.Application.Request.DrillingPermitEndingDateinhijri.day + "-" + this.Application.Request.DrillingPermitEndingDateinhijri.month + "-" + this.Application.Request.DrillingPermitEndingDateinhijri.year;

    }

  }
  onContactChange(contacts: string[]) {
    debugger;
    this.isSubmit = false;
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
  public GetContractsRelatedToCR() {
    // if (!this.getContract) {
    //   this.getContract = true

    //   this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
    //   this.DrillingPermitService.GetContractsRelatedToCR(this.Application.Request.CRId).subscribe(
    //     res => {
    //       this.getContract = false;
    //       if (res.ResponseCode === ResponseCode.Success)
    //         this.lookupService.handleRetrievedLookup(res.Content);
    //     }
    //   );

    // }
  }
  getCRInfo() {
    // this.isCurrentCR = true;
    // this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
    //   if(results.ResponseCode === ResponseCode.Success)
    //   {
    //     this.CurrentCR = results.Content.CR;
    //   }
    // this.isCurrentCR = false;

    // });
  }
  // getContractInfo(){
  //   this.isCurrentContract = true;
  //   this.DrillingPermitService.GetContractInfo(this.Application.Request.ContractNumberId).subscribe(
  //     res => {
  //       if (res.ResponseCode === ResponseCode.Success){
  //         this.CurrentContract = res.Content;
  //         let constructionStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_constructioncontractstatus_OptionSet"];
  //         let legalStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_legalstatus_OptionSet"];
  //         let PricingDateOS = this.lookupService.lookupEntities["ldv_contract_ldv_pricingdate_OptionSet"];
  //         debugger;
  //       if(constructionStatusOS)
  //         this.CurrentContract.ConstructionContractStatus = constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0]?constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0].Text:null;


  //         this.CurrentContract.LegalStatus = legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0]?legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0].Text:null;
  //         this.CurrentContract.Pricingdate = PricingDateOS.filter(c => c.Value ==this.CurrentContract.Pricingdate)[0]?PricingDateOS.filter(c => c.Value ==this.CurrentContract.Pricingdate)[0].Text:null;

  //         if(this.CurrentContract.Contacts && this.CurrentContract.Contacts.length > 0){
  //           this.contactDetailsfromContract = this.CurrentContract.Contacts[0].Result;
  //           this.contactDetailsfromContract.forEach(x=>{
  //             x.IsDeleted=false;
  //             x.IsUpdated=false;
  //           })
  //         }
  //         else{
  //           this.contactDetailsfromContract = null;
  //         }

  //       }

  //       this.isCurrentContract = false;

  //     }
  //   );
  // }
 
  OnRequestTypeChange() {
    debugger;
   
    if (  this.Application.Request.RequestType != undefined && this.Application.Request.RequestType.toString() === "2") {
      this.IsOldRequest = true;
      this.IsNewRequest = false;
      this.DrillingPermitService.GetOldDrillingPermit(this.Application.Request.CRNameId).subscribe(
        res => {
          if (res.ResponseCode = ResponseCode.Success) {
            debugger;
            res.Content
            //this.Application.Request.OldPermitId = res.Content;
            this.lookupService.handleRetrievedLookup(res.Content)
          }
          else {

            this.Application.Request.OlddrilingPermitId = null;
            this.Application.Request.ContractNumberString = null;
            this.Application.Request.WorkDimensionLengthm = null;
            this.Application.Request.WorkDimensionsHeightm = null;
            this.Application.Request.WorkDimensionsWidthm = null;
            this.Application.Request.WorkOverallLength = null;
            this.Application.Request.WorkDescription = null;
            this.Application.Request.DesignorContractWithInvestor = null;
            this.Application.Request.IndustrialCityId = null;
            this.Application.Request.DrillingPermitTypeId = null;
            this.Application.Request.ContractNumberString = null;
            this.Application.Request.Other = null;
            this.Application.Request.DrillingMethod = null;
            this.Application.Request.DrillingType = null;
            this.Application.Request.ProjectManagerName = null;
            this.Application.Request.ProjectManaggerMail = null;
            this.Application.Request.ProjectManagerContactNumber = null;
            this.Application.Request.CoordinationDestination = null;

            this.Application.Request.DrillingPermitStartingDateInhijriDays = null;
            this.Application.Request.DrillingPermitStartingDateInhijriMonth = null;
            this.Application.Request.DrillingPermitStartingDateInhijriYear = null;
            this.IsOldRequest = false;
            this.IsNewRequest = true;
          }
        }
      )
    }
    else if (this.Application.Request.RequestType != undefined && this.Application.Request.RequestType.toString() === "1") {
      this.IsOldRequest = false; this.IsNewRequest = true;
      this.Application.Request.OlddrilingPermitId = null;
      this.Application.Request.ContractNumberString = null;
      this.Application.Request.WorkDimensionLengthm = null;
      this.Application.Request.WorkDimensionsHeightm = null;
      this.Application.Request.WorkDimensionsWidthm = null;
      this.Application.Request.WorkOverallLength = null;
      this.Application.Request.WorkDescription = null;
      this.Application.Request.DesignorContractWithInvestor = null;
      this.Application.Request.IndustrialCityId = null;
      this.Application.Request.DrillingPermitTypeId = null;
      this.Application.Request.ContractNumberString = null;
      this.Application.Request.Other = null;
      this.Application.Request.DrillingMethod = null;
      this.Application.Request.DrillingType = null;
      this.Application.Request.ProjectManagerName = null;
      this.Application.Request.ProjectManaggerMail = null;
      this.Application.Request.ProjectManagerContactNumber = null;
      this.Application.Request.CoordinationDestination = null;

      this.Application.Request.DrillingPermitStartingDateInhijriDays = null;
      this.Application.Request.DrillingPermitStartingDateInhijriMonth = null;
      this.Application.Request.DrillingPermitStartingDateInhijriYear = null;
    }
    else
      this.Application.Request.OlddrilingPermitId = null;

  }



  // public cRChanged(){
  //   // debugger;
  //   this.IsRequestValid=true;
  //   this.isSubmit = false;
  //   if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != ""){
  //     this.getCRInfo();
  //     this.GetContactDetailsByCR();
  //     //this.isContractNumberReadOnly = false;
  //     //this.Application.Request.ContractNumberId = undefined;
  //   }
  // }
  SaveAsDraft() {
    this.saveApplication();
    this.isContractNumberReadOnly = true;
  }
  submitRequest() {
    debugger;
    if (this.form.valid) {
      this.submitForm();
    }
    else {
      this.submit = true;
    }

  }
  ContractChanged() {
    debugger;
    if (this.Application.Request.ContractNumberString) {
      this.DrillingPermitService.ValidateContract(this.Application.Request.ContractNumberString).subscribe(
        res => {
          if (res.ResponseCode == ResponseCode.Error) {
            this.contractValidationMsg = res.FriendlyResponseMessage;
            this.Application.Request.IndustrialCityId = null;
            this.IsRequestValid = false;

          }
          else {
            debugger;
            this.Application.Request.IndustrialCityId = res.Content.Industrialcity;
            this.Application.Request.ContractNumberId = res.Content.ContractNumberId;
            this.contractValidationMsg = "";
            this.IsDefaultIndustrialcity = true;
            this.IsRequestValid = true;
          }
        }
      )

    }

  }

  NumbersValidation() {
    debugger;
    let regexpNumber: RegExp = /[+-]?([0-9]*[.])?[0-9]+/;
    if (!regexpNumber.test(this.Application.Request.WorkDimensionLengthm.toString())) {
      this.IsDecimalWorkDimensionLengthm = true;
    }
    else {
      this.IsDecimalWorkDimensionLengthm = false;
    }
    if (!regexpNumber.test(this.Application.Request.WorkDimensionsHeightm.toString())) {
      this.IsDecimalWorkDimensionsHeightm = true;
    }
    else {
      this.IsDecimalWorkDimensionsHeightm = false;
    }
    if (!regexpNumber.test(this.Application.Request.WorkDimensionsWidthm.toString())) {
      this.IsDecimalWorkDimensionsWidthm = true;
    }
    else {
      this.IsDecimalWorkDimensionsWidthm = false;
    }
    if (!regexpNumber.test(this.Application.Request.WorkOverallLength.toString())) {
      this.IsDecimalWorkOverallLength = true;
    }
    else {
      this.IsDecimalWorkOverallLength = false;
    }
  }

  RequestNumberChanged() {
    debugger;
    if (this.Application.Request.OlddrilingPermitId) {
      this.DrillingPermitService.GetOldDrillingPermitRquestDetails(this.Application.Request.OlddrilingPermitId).subscribe(
        res => {

          debugger;
          this.Application.Request.ContractNumberString = res.Content.ContractNumberString;
          this.Application.Request.WorkDimensionLengthm = res.Content.WorkDimensionLengthm;
          this.Application.Request.WorkDimensionsHeightm = res.Content.WorkDimensionsHeightm;
          this.Application.Request.WorkDimensionsWidthm = res.Content.WorkDimensionsWidthm;
          this.Application.Request.WorkOverallLength = res.Content.WorkOverallLength;
          this.Application.Request.WorkDescription = res.Content.WorkDescription;
          this.Application.Request.DesignorContractWithInvestor = res.Content.DesignorContractWithInvestor;
          this.Application.Request.IndustrialCityId = res.Content.IndustrialCityId;
          this.Application.Request.DrillingPermitTypeId = res.Content.DrillingPermitTypeId;
          this.Application.Request.ContractNumberString = res.Content.ContractNumberString;
          this.Application.Request.Other = res.Content.Other;
          this.Application.Request.DrillingMethod = res.Content.DrillingMethod;
          this.Application.Request.DrillingType = res.Content.DrillingType;
          this.Application.Request.ProjectManagerName = res.Content.ProjectManagerName;
          this.Application.Request.ProjectManaggerMail = res.Content.ProjectManaggerMail;
          this.Application.Request.ProjectManagerContactNumber = res.Content.ProjectManagerContactNumber;
          this.Application.Request.WorkLocation = res.Content.WorkLocation;
          this.Application.Request.SupervisingDestination = res.Content.SupervisingDestination;
          this.Application.Request.CoordinationDestination = res.Content.CoordinationDestination;

          this.Application.Request.DrillingPermitStartingDateInhijriDays = res.Content.DrillingPermitEndingDateinhijri.day;
          this.Application.Request.DrillingPermitStartingDateInhijriMonth = res.Content.DrillingPermitEndingDateinhijri.month;
          this.Application.Request.DrillingPermitStartingDateInhijriYear = res.Content.DrillingPermitEndingDateinhijri.year;


        }
      )

    }

  }
}