
import { Component, OnInit, ViewChild } from'@angular/core'
import { ActivatedRoute, Router } from'@angular/router';
import { AlertService } from'src/modules/shared/services';
import { TranslateService } from'@ngx-translate/core';
import { NgbModal } from'@ng-bootstrap/ng-bootstrap';
import { Title } from'@angular/platform-browser';
import { EServicesBase } from'src/modules/shared/EService-Base/eService-base';
import { ResponseCode } from'src/modules/shared/Models/api-generic-response';
import { CRModel } from'src/modules/Contract-Submission/interfaces/CR-model';
import { ContractInfoModel } from'src/modules/Plan-Approval/Model/ContractInfoModel';
import { ContractSubmissionService } from'src/modules/Contract-Submission/services/contract-submission.service';
import { LookupRequestMode } from'src/modules/shared/Enums/lookup-request-mode.enum';
import { RetrieveOptionsRequest } from'src/modules/shared/Models/lookup-request.model';
import { LookupService } from'src/modules/shared/Services/lookup.service';
import { FormHierarchyBase } from'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ContactDetails } from'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { debug } from'console';
import { ColumnFieldType, GridColumn } from'src/modules/shared/form-guide/grid/models/GridColumn';
import { NgForm } from'@angular/forms';
import { CoordinationLetterModel } from '../Model/CoordinationLetterModel';
import { CoordinationLetterService } from '../service/coordination-letter.service';




@Component({
  selector: 'app-coordination-letter',
  templateUrl: './coordination-letter.component.html',
  styleUrls: ['./coordination-letter.component.css']
})
export class CoordinationLetterComponent extends EServicesBase<CoordinationLetterModel> implements OnInit {
  contactContracts: RetrieveOptionsRequest[];
  IsRequestValid: boolean;
  requestValidMsg :string;
  submit: boolean = false;
  isSubmit: boolean;
  CRNameText : string;
  isCurrentContract:boolean;
  CurrentContract:ContractInfoModel;
  contactDetailsfromContract:ContactDetails[];
  isCurrentCR: boolean;
  CurrentCR: CRModel={};
  getContact: any;
  ActiveLevelOne : number = 1;
  isContractNumberReadOnly: boolean;
  @ViewChild('PermitsLetterForm') form: NgForm;
  

  protected TApplicationNewInstance(): CoordinationLetterModel {
    return new CoordinationLetterModel();
  }
  protected getQueryStringNames(): string[] {
    return["Id"];
  }

  constructor(public contractSubmissionService: ContractSubmissionService,
    protected coordinationLetterService: CoordinationLetterService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
      super(coordinationLetterService,lookupService,activatedRoute,alertService,translateService,modalService,router);
     }
 
     config = {
      displayKey: "Text", //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
      noResultsFound: "No results found!", // text to be displayed when no items are found while searching
      searchPlaceholder: "Search", // label thats displayed in search input,
      searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };

    formStructure: FormHierarchyBase[]=
    [
       {index:1,label:"CoordinationLetter.RequestDetails",type:NodeType.Parent,children:[]},
    ];
  
   
    public getLookupTypes(): RetrieveOptionsRequest[] {
      return [
        {EntityName:"ldv_correspondencedestination",CachingKey:"ldv_correspondencedestination_RequestDestination",Mode: LookupRequestMode.RequestDestination}
         
        
         
      ];
    }

  onSelect = (node: FormHierarchyBase) => 
  {
    debugger;
    if(node.type == NodeType.Parent)
    this.ActiveLevelOne = node.index;
  }

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
    this.GetRelatedContracts();
  }
 
  protected GetRelatedContracts()
  {
   
    this.coordinationLetterService.GetContractsRelatedToContact().subscribe(res => 
      {
      this.contactContracts = res.Content;
      if(this.contactContracts.length == 0 || this.contactContracts[0].Result.length == 0)
          this.goToErrorPage("PermitLetter.RequestDetails");
          
      this.lookupService.handleRetrievedLookup(this.contactContracts);
      if(this.Application.Request.ContractNumberId != "" && this.Application.Request.ContractNumberId != undefined)
      {
        debugger;
       var selectedContractObj = this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"].filter(c=>c.Value == this.Application.Request.ContractNumberId);
       this.CRNameText = selectedContractObj[0]["CRName"] +"-"+selectedContractObj[0]["CRNumber"];
      }
    }, error => {
      console.log("GetContracts error");
    });
  }

  DestinationChanged()
  {
    debugger;
    if(this.Application.Request.DestinationId != '5c124377-b9d1-ea11-aa52-000d3a46f0d9')
     {
      this.Application.Request.SpecifyDestination = "";
     }
  }
  ContractChanged()
  {
     debugger;
    // this.Application.Request.CRId = "";
     if(this.Application.Request.ContractNumberId)
     {
      
        this.coordinationLetterService.ValidateRequest(this.Application.Request.ContractNumberId).subscribe(
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
          debugger;
        if(this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"] != undefined)
        {
          debugger;
            var selectedContractObj = this.lookupService.lookupEntities["ldv_contract_PermitRequestContracts"].filter(c=>c.Value == this.Application.Request.ContractNumberId);
            this.Application.Request.CRId = selectedContractObj[0]["CRId"];
            this.CRNameText = selectedContractObj[0]["CRName"] +"-"+selectedContractObj[0]["CRNumber"];
        }
          this.cRChanged();
          this.getContractInfo();
     }
     else
     {
          this.Application.Request.CRId = undefined;
          this.CRNameText = "";
     }
     
  }
  public cRChanged(){
    debugger;
    this.IsRequestValid=true;
    this.isSubmit = false;
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != ""){
      this.getCRInfo();
     // this.GetContactDetailsByCR();
      //this.isContractNumberReadOnly = false;
      //this.Application.Request.ContractNumberId = undefined;
    }
  }
  getContractInfo(){
    debugger;
    this.isCurrentContract = true;
    this.coordinationLetterService.GetContractInfo(this.Application.Request.ContractNumberId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success){
          this.CurrentContract = res.Content;
          let constructionStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_constructioncontractstatus_OptionSet"];
          let legalStatusOS = this.lookupService.lookupEntities["ldv_contract_ldv_legalstatus_OptionSet"];
          let PricingDateOS = this.lookupService.lookupEntities["ldv_contract_ldv_pricingdate_OptionSet"];
          debugger;
        if(constructionStatusOS)
          this.CurrentContract.ConstructionContractStatus = constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0]?constructionStatusOS.filter(c => c.Value ==this.CurrentContract.ConstructionContractStatus)[0].Text:null;

          if(legalStatusOS)
          this.CurrentContract.LegalStatus = legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0]?legalStatusOS.filter(c => c.Value ==this.CurrentContract.LegalStatus)[0].Text:null;

          if(PricingDateOS)
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
  getCRInfo(){
    debugger;
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
      if(results.ResponseCode === ResponseCode.Success)
      {
        this.CurrentCR = results.Content.CR;
      }
    this.isCurrentCR = false;

    });
  }

  public afterFormReady(): void 
  {
    debugger;
    if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1')
    {
      this.formStructure.push({index:2,label:"PermitLetter.RequestComments",type:NodeType.Parent});
      //this.ActiveLevelOne = 2;
    }
    if(this.Application.Request.CRId != undefined && this.Application.Request.CRId != "")
    {
      this.getCRInfo();
       
    }
    if(this.Application.Request.ContractNumberId != undefined && this.Application.Request.ContractNumberId != "")
    {
      this.getContractInfo();
      this.ContractChanged();
    }
  }

  submitRequest()
  {
    debugger;
    if(this.form.valid && this.Application.Request.Regarding && this.Application.Request.Regarding.trim().length >0)
    {
      this.submitForm();
    }
    else
    {
      this.submit = true;
    }
    
  }
  SaveAsDraft(){
    this.saveApplication();
    this.isContractNumberReadOnly = true;
    this.submit = false;
  } 
}
