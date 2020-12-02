import { Component, OnInit, ViewChild } from '@angular/core';
import { PermitsLetterService } from '../service/permits-letter.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { PermitLetterModel } from '../Model/PermitLetterModel';
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
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-permits-letter',
  templateUrl: './permits-letter.component.html',
  styleUrls: ['./permits-letter.component.css']
})
export class PermitsLetterComponent extends EServicesBase<PermitLetterModel> implements OnInit {
  isCurrentCR: boolean;
  submit: boolean = false;
  getContract: any;
  IsRequestValid: boolean;
  requestValidMsg :string;
  IsDuplicated: boolean;
  contractValidationMsg: string;
  isSubmit: boolean;
  LockBasicFields: boolean;
  NotValidDuraton: boolean;
  isContractNumberReadOnly: boolean;
  CurrentCR: CRModel={};
  isCurrentContract:boolean;
  CurrentContract:ContractInfoModel;
  yesText: string = "Yes";
  NoText: string = "No";
  ActiveLevelOne : number = 1;
  contactContracts: RetrieveOptionsRequest[];
  CRNameText : string;
  contactDetailsfromContract:ContactDetails[];
  getContact: any;
  contactsList:ContactDetails[];
  gridModel: ContactDetails;
  @ViewChild('PermitsLetterForm') form: NgForm;
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

  constructor(public permitLetterService: PermitsLetterService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public modalService: NgbModal,
    private titleService:Title,
    public router: Router,
    public contractSubmissionService: ContractSubmissionService ) 
    {
      super(permitLetterService, lookupService, activatedRoute, alertService, translateService, modalService, router);
     // router.events.subscribe((val) =>  window.location.reload());
     
     router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => { debugger; if(e["id"] != 1) window.location.reload()} )
    }
  
     public TApplicationNewInstance(): PermitLetterModel {
      return new PermitLetterModel();
    }
    public getQueryStringNames(): string[] {
      debugger;
      return ["Id"];
    }
    formStructure: FormHierarchyBase[]=
    [
       {index:1,label:"PermitLetter.RequestDetails",type:NodeType.Parent,children:[]},
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
  ExportingPercentageValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage0-100'}
  Required_1_75Validations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage1-75'}
  Required_1_100Validations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage1-100'}
  Required_WholeNumberValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.WholeNumber'}
  Required_GreaterThanZeroValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.GreaterThanZero'}
  Required_MobileValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.Mobile'}
  //#endregion
  ngOnInit()
   {
    this.translateService.get('SELECT').subscribe(      sel => {        this.translateService.get('NO_RESULT_FOUND').subscribe(          no => {            this.translateService.get('SEARCH').subscribe(              search => {                this.translateService.get('moreValues').subscribe(                  moreValues =>{                    this.config['placeholder'] = sel;                    this.config['noResultsFound'] = no;                    this.config['searchPlaceholder'] = search;                    this.config['moreText'] = moreValues;                  }                )              });          });     });
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.config['placeholder'] = sel;
            this.config['noResultsFound'] = no;
          }
        )
      })
      this.GetRelatedContracts();
      this.IsRequestValid = true;
      
  }
  onSelect = (node: FormHierarchyBase) => 
  {
    if(node.type == NodeType.Parent)
    this.ActiveLevelOne = node.index;
  }
  public GetRelatedContracts()
  {
   
    this.permitLetterService.GetContractsRelatedToContact().subscribe(res => 
      {
      this.contactContracts = res.Content;
      if(this.contactContracts.length == 0 || this.contactContracts[0].Result.length == 0)
          this.goToErrorPage("PermitLetter.RequestDetails");
          
      this.lookupService.handleRetrievedLookup(this.contactContracts);
      if(this.Application.Request.ContractNumberId != "" && this.Application.Request.ContractNumberId != undefined)
      {
       var selectedContractObj = this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"].filter(c=>c.Value == this.Application.Request.ContractNumberId);
       this.CRNameText = selectedContractObj[0]["CRName"] +"-"+selectedContractObj[0]["CRNumber"];
      }
    }, error => {
      debugger;
      console.log("GetContracts error");
    });
  }
  public getDynamicLookups() {
    this.permitLetterService.getDynamicLookups().subscribe(
      res => {
        
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }
  public getLookupTypes(): RetrieveOptionsRequest[] 
  {
    this.translateService.get('Yes').subscribe(res => {
      this.yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          this.NoText = res;
          let d: RetrieveOptionsRequest[] = [{CachingKey:"YesNo",EntityName:"",Mode:1,Result:[{Text: this.yesText, Value: 'true'},{Text: this.NoText, Value: 'false'}]}]
          this.lookupService.handleRetrievedLookup(d);
        }
      )
    })
    return [
      {EntityName:"ldv_permitstype",CachingKey:"ldv_permitstype_PermitsType",Mode: LookupRequestMode.PermitsType},
      {EntityName:"ldv_permit",CachingKey:"ldv_permit_Permits",Mode: LookupRequestMode.Permits},
      {EntityName:"ldv_permitrequest",CachingKey:"ldv_permitrequest_ldv_requesttype_OptionSet",Mode: LookupRequestMode.OptionSet,OptionSetName:"ldv_requesttype"},
      {EntityName:"ldv_permitrequest",CachingKey:"ldv_permitrequest_ldv_requestedpermitduration_OptionSet",Mode: LookupRequestMode.OptionSet,OptionSetName:"ldv_requestedpermitduration"},
      {EntityName:"ldv_permitrequest",CachingKey:"ldv_permitrequest_ldv_includedworkstypes_OptionSet",Mode: LookupRequestMode.OptionSet,OptionSetName:"ldv_includedworkstypes"},
      {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_constructioncontractstatus_OptionSet",
      Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_constructioncontractstatus" },
    {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_legalstatus_OptionSet",
      Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_legalstatus" },
    {EntityName:"ldv_contract",CachingKey:"ldv_contract_ldv_pricingdate_OptionSet",
      Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_pricingdate" },
    ];
  }
  public afterFormReady(): void 
  {
    this.getDynamicLookups(); 
    this.GetPermitType();
    //Check status and add second tab for request comments
    if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1')
    {
      this.formStructure.push({index:2,label:"PermitLetter.RequestComments",type:NodeType.Parent});
      //this.ActiveLevelOne = 2;
    }
    ////////
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != "")
    {
      this.getCRInfo();
      this.GetContactDetailsByCR();
    }
    if(this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != "")
    {
      
      this.getContractInfo();
    }
    this.LockFields();
  }
  public GetContactDetailsByCR() {
    if (!this.getContact) {
      this.getContact = true
debugger;
      this.permitLetterService.getCRContacts(this.Application.Request.CRId).subscribe(
        res => {
          debugger
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
  onContactChange(contacts:string[]){
    debugger;
    this.isSubmit = false;
    this.contactsList = [];
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
  public GetContractsRelatedToCR() {
    if (!this.getContract) {
      this.getContract = true

      this.lookupService.lookupEntities['ldv_contract_LookupWithId'] = [];
      this.permitLetterService.GetContractsRelatedToCR(this.Application.Request.CRId).subscribe(
        res => {
          this.getContract = false;
          if (res.ResponseCode === ResponseCode.Success)
            this.lookupService.handleRetrievedLookup(res.Content);
        }
      );

    }
  }
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
    this.permitLetterService.GetContractInfo(this.Application.Request.ContractNumberId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success){
          this.CurrentContract = res.Content;
          let constructionStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_constructioncontractstatus_OptionSet"];
          let legalStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_legalstatus_OptionSet"];
          let PricingDateOS = this.lookupService.lookupEntities["ldv_contract_ldv_pricingdate_OptionSet"];
          debugger;
        if(constructionStatusOS)
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

  public AnyDocumentsToShow():boolean {
  //  debugger;
    if(this.Application.Documents)
    {  return this.Application.Documents.filter(x => x.IsVisible).length > 0;}
    else
      {return false;}
  }

  OnRequestTypeChange()
  {
    if(this.Application.Request.RequestType === "2")
    {
   this.permitLetterService.GetOldPermit(this.Application.Request.ContractNumberId,this.Application.Request.PermitTypeId).subscribe(
     res => 
     {
        if(res.ResponseCode = ResponseCode.Success)
        {
          this.Application.Request.OldPermitId = res.Content;
        }
        else
        {
          this.Application.Request.OldPermitId = null;
        }
     }
   )
    }
    else
    this.Application.Request.OldPermitId = null;
  }
OnPermitTypeChange()
{
  debugger
  if(this.Application.Request.PermitTypeId != undefined)
  {
    var selectedTypeObj =this.lookupService.lookupEntities["ldv_permitstype_PermitsType"].filter(x=>x.Value === this.Application.Request.PermitTypeId)
    this.Application.Request.PermitDefaultDuration = selectedTypeObj[0]["PermitDurationInDays"];
    //Validate Request
    this.permitLetterService.ValidateDuplicateRequest(this.Application.Request.ContractNumberId,this.Application.Request.PermitTypeId).subscribe(
      res=>
      {
        if(res.ResponseCode == ResponseCode.Error)
        {
          this.requestValidMsg = res.FriendlyResponseMessage;
          this.IsRequestValid = false;
        }
        else
        {
          this.requestValidMsg = "";
          this.IsRequestValid = true;
        }
      }
      )
  }
  else
  {
    this.Application.Request.PermitDefaultDuration = undefined;    
  }
}

public GetPermitType()
{
  this.activatedRoute.queryParams.subscribe(p => {
    let GUID = p['GUID'];
    if(GUID)
    {
      this.Application.Request.PermitTypeId  = GUID;
     
    }
  })

}
OnRequestedPermitDurationChange()
{
  //debugger;
  //alert(this.Application.Request.RequestedPermitDuration)
}
  public cRChanged(){
    // debugger;
    this.IsRequestValid=true;
    this.isSubmit = false;
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != ""){
      this.getCRInfo();
      this.GetContactDetailsByCR();
      //this.isContractNumberReadOnly = false;
      //this.Application.Request.ContractNumberId = undefined;
    }
  }
  SaveAsDraft(){
    this.saveApplication();
    this.isContractNumberReadOnly = true;
    
  }
  submitRequest()
  {
    
    if(this.form.valid)
    {
      this.submitForm();
    }
    else
    {
      this.submit = true;
    }
    
  }
  LockFields(){
    debugger;

 if(this.Application.ApplicationHeader === undefined|| this.Application.ApplicationHeader &&  this.Application.ApplicationHeader.PortalStatusCode === null)
 {this.LockBasicFields =false;}
 if(this.Application.ApplicationHeader && (this.Application.ApplicationHeader.PortalStatusCode === '112' || this.Application.ApplicationHeader.PortalStatusCode === '6') )
 {this.LockBasicFields =true;} 
// Draft -- this.Application.ApplicationHeader.PortalStatusCode === '1'   
}
  
  CheckRequestedDuration(){
    debugger;

 if(this.Application.Request.PermitDefaultDuration >= this.Application.Request.RequestedPermitDurationInDays)
 {this.NotValidDuraton =true;}
 else{this.NotValidDuraton = false;}
  }
  
  ContractChanged()
  {
     debugger
     if(this.Application.Request.ContractNumberId)
     {
      this.permitLetterService.ValidateContract(this.Application.Request.ContractNumberId).subscribe(
        res=>
        {
          if(res.ResponseCode == ResponseCode.Error)
          {
            this.contractValidationMsg = res.FriendlyResponseMessage;
            this.IsRequestValid = false;
          }
          else
          {
            this.contractValidationMsg = "";
            this.IsRequestValid = true;
          }
        }
        )
      var selectedContractObj = this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"].filter(c=>c.Value == this.Application.Request.ContractNumberId);
      this.Application.Request.CRId = selectedContractObj[0]["CRId"];
      this.CRNameText = selectedContractObj[0]["CRName"] +"-"+selectedContractObj[0]["CRNumber"];
     this.cRChanged();
     this.getContractInfo();
     }
     else
     {
       this.Application.Request.CRId = undefined;
       this.CRNameText = "";
     }
     
  }

}