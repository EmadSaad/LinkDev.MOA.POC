import { SplitContractModel } from "./../interfaces/split-contrat-model";
import { SplitRequestModel } from "./../interfaces/split-request-model";
import { SplitRequestService } from "./../services/split-request.service";
import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupService } from "src/modules/shared/Services/lookup.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { EServicesBase } from "src/modules/shared/EService-Base/eService-base";
import { AlertService } from "src/modules/shared/services";
import { Title } from "@angular/platform-browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedHelper } from "src/modules/shared/services/shared-helper";
import { FormHierarchyBase } from "src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model";
import { NodeType } from "src/modules/shared/form-guide/form-hierarchy/node-type-enum";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { LookupRequestMode } from "src/modules/shared/Enums/lookup-request-mode.enum";
import { ColumnFieldType, GridColumn } from "src/modules/shared/form-guide/gridEmmitter/models/GridColumn";
import { Guid } from "guid-typescript";
import { ProductsCode } from "../Enums/product-code.enum";
import { NgForm, NgModel } from "@angular/forms";
import { ILVersion } from "src/modules/shared/Common/IL-version/interfaces/il-version-model";
import { ApiGenericResponse, ResponseCode } from "src/modules/shared/Models/api-generic-response";
import { forkJoin } from "rxjs";
import { CRVersion } from "src/modules/shared/Common/CR-version/interfaces/cr-version-model";


@Component({
  selector: 'app-split-request',
  templateUrl: './split-request.component.html',
  styleUrls: ['./split-request.component.css']
})
export class SplitRequestComponent extends EServicesBase<SplitRequestModel> implements OnInit {
  protected TApplicationNewInstance(): SplitRequestModel {
   return new SplitRequestModel();

  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }

  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;  
  mainProdutOldContract : string;
  subProdutOldContract : string;
  ProdutOldContract : string;
  submit : boolean;
  CRVersionModel : CRVersion;
  showCRVersionInfo : boolean;
  ILVersionModel :ILVersion;
  showILVersionInfo : boolean;

  constructor(public SplitRequestService: SplitRequestService, 
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,

    protected router: Router) {
    super(SplitRequestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
      this.titleService.setTitle("ECZA | Split Request");

      this.mainProdutOldContract = this.subProdutOldContract = this.ProdutOldContract ="";
      this.submit = false;

      this.showCRVersionInfo = false;
      this.CRVersionModel = { Id:"",CRActivity:"",Owners:[],Activities:[],Name:"",IssuanceCity:"",
      IssueDate:"",ExpiryDate:"",CRType:"",CRName:""};

      this.showILVersionInfo = false;
      this.ILVersionModel ={ILName:"",ILNumber:"",ILActivities:[],ILProducts:"",ILProductsList:[],
      ILSource:"",ILStatus:"",ILId:"",ILType:"" , InvestmentType:"", OwnerName:"",FactoryName:"",CityName:"",
      IssueDate:"", ExpiryDate:"",CRName:""}
    
  }


  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };

  splitContractGridModel : SplitContractModel = {ProductMainFamilyId:null};
  splitContractGridcols: GridColumn[] = [
    {header:"SplitRequest.CR",field:"CRId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'account_CRsByTypeInvestor'}},
    {header:"SplitRequest.ProductMainFamily",field:"ProductMainFamilyId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}},
    {header:"SplitRequest.ProductSubFamily",field:"ProductSubFamilyId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}},
    {header:"SplitRequest.Product",field:"ProductId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}}
    ];

  OwnerGridcols: GridColumn[] = [
    {header:"SplitRequest.OwnerName",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}}
   // {header:"SplitRequest.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];

  
  ActivitiesGridcols: GridColumn[] = [
    {header:"SplitRequest.ActivityName",field:"ActivityName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"SplitRequest.ClassName",field:"ClassName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"SplitRequest.DivisionName",field:"DivisionName",typeConfig: {type:ColumnFieldType.Text}}

    
  ];

  ILProductsgridcols: GridColumn[] = [
    {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}}
    
  ];

  ILActivityGridcols: GridColumn[] = [
    {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}}
    
  ];
  

  formStructure: FormHierarchyBase[] = [
    {index:1,label:"SplitRequest.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"SplitRequest.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"SplitRequest.OldContract", type: NodeType.Section, data:"OldContract"},
            {index:2, label:"SplitRequest.SplitContracts", type: NodeType.Section, data:"SplitContracts"}
          ]
        }
      ]
    }
  ];

  @ViewChild('FirstStage') firstStage: NgForm;
  @ViewChild('splitContractGridForm') splitContractGridForm: NgForm;

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


}

afterFormReady(){

  if(!this.Application.Request.Id){
   this.Application.Request.ContractId =
   this.Application.Request.CRId = null;
  }

  if(this.Application.Request.ContractId == Guid.EMPTY.toString()){
    this.Application.Request.ContractId = null;
  }

  if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1')
  this.formStructure.push({index:2,label:"SplitRequest.RequestComments",type:NodeType.Parent})

  if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '4')
  this.formStructure.push({index:3,label:"SplitRequest.PaymentStage",type:NodeType.Parent})
  
}

onSelect = (node: FormHierarchyBase) => {
  switch (node.type) {
    case NodeType.Parent:
      this.ActiveLevelOne = node.index;
      break;
    case NodeType.Child:
      this.ActiveLevelTwo = node.index
      break;
  }
  SharedHelper.scrollToBody();
}

public getLookupTypes(): RetrieveOptionsRequest[] {
  this.translateService.get('Yes').subscribe(res => {
    var yesText = res;
    this.translateService.get('No').subscribe(
      res => {
        var NoText = res;
        let twoOptionSet: RetrieveOptionsRequest[] = [{CachingKey:"YesNo",EntityName:"",Mode:1,Result:[{Text: yesText, Value: 'true'},{Text: NoText, Value: 'false'}]}]
        this.lookupService.handleRetrievedLookup(twoOptionSet);
      }
    )
  })
  return [
    {EntityName:"product",CachingKey:"product_Product",Mode: LookupRequestMode.Product}
    
    ];
}

public getProductMainFamily():any[] {

  if (this.lookupService.lookupEntities['product_Product']) {

    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === Guid.EMPTY.toString() || x['ParentProductId'] === null);
    var index;

    if(Number(this.ProdutOldContract) == 700){
      this.splitContractGridModel.ProductId = this.ProdutOldContract ;
      this.splitContractGridModel.ProductSubFamilyId = this.subProdutOldContract;
      this.splitContractGridModel.ProductMainFamilyId = this.mainProdutOldContract;
    }
    else
    {
      if(Number(this.mainProdutOldContract) == ProductsCode.Logistic){
        index = x.findIndex(p => Number(p["Value"]) == ProductsCode.Services);
        if(index != -1) x.splice(index , 1);
      }
      else if(Number(this.mainProdutOldContract) == ProductsCode.Services){
         index = x.findIndex(p => Number(p["Value"]) == ProductsCode.Industrial);
         if(index != -1) x.splice(index , 1);
         index = x.findIndex(p => Number(p["Value"]) == ProductsCode.Logistic);
         if(index != -1) x.splice(index , 1);
  
      }
    }
   
  
    if(!this.splitContractGridModel.ProductSubFamilyId){
    this.splitContractGridForm.controls["SubProduct"].markAsPristine();
    }
    //this.splitContractGridForm.controls["MainProduct"].markAsPristine();
      
  

     return x;
  }
  else return [];

  
}

public getProductSubFamily():any[]{
  if (this.lookupService.lookupEntities['product_Product'] && this.splitContractGridModel.ProductMainFamilyId) {
    let productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.splitContractGridModel.ProductMainFamilyId)['Id'];
    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid)

    if(Number(this.subProdutOldContract) == ProductsCode.ReadyUnits){
      var index = x.findIndex(p => Number(p["Value"]) == ProductsCode.IndustrialLand);
      if(index != -1) x.splice(index , 1);
    }

    // if(this.splitContractGridModel.ProductSubFamilyId == null)
    // this.splitContractGridForm.controls["SubProduct"].markAsUntouched();

    return x;
  }else return [];
  
}

public getProduct() :any[]{
  if (this.lookupService.lookupEntities['product_Product'] && this.splitContractGridModel.ProductSubFamilyId) {
    let productSubFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.splitContractGridModel.ProductSubFamilyId)['Id'];
    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productSubFamilyGuid);

    if(this.splitContractGridModel.ProductId == null)
    this.splitContractGridForm.controls["Product"].markAsPristine();

    return x;
  }else return [];
  
}

onChangeMainProduct(){
  if(this.splitContractGridModel.ProductMainFamilyId != '1'){
    this.splitContractGridModel.ILVersionId = this.splitContractGridModel.ILId = null;
    this.splitContractGridModel.hasIL = null;
  }

 
}

saveRequest(){

  // remove deleted record from the grid
  if (this.Application.Request.Id && this.Application.Request.SplitContracts != null && this.Application.Request.SplitContracts.length > 0)
  {this.Application.Request.SplitContracts = this.Application.Request.SplitContracts.filter(s => s.IsDeleted == false);}
  
   this.saveForm();
  
}

submitRequest(){
  this.submit = true;
  debugger;

  // remove deleted record from the grid
  if (this.Application.Request.SplitContracts != null && this.Application.Request.SplitContracts.length > 0)
  {this.Application.Request.SplitContracts = this.Application.Request.SplitContracts.filter(s => s.IsDeleted == false);}

  let isDocumentsValid = this.validateDocuments();
  
  if(this.firstStage.valid && isDocumentsValid
    && this.Application.Request.SplitContracts.length >= 2 && this.Application.Request.SplitContracts.length <=5 ){
     this.submitForm();
  }
  
}

onCRChange(isFormLoad:boolean){

  // if(this.Application.Request.CRId == null || this.Application.Request.CRId == undefined 
  //   || this.Application.Request.CRId === Guid.EMPTY.toString()){
debugger;
  if(!isFormLoad){
     // reset split contracts
     this.Application.Request.SplitContracts = [];
     this.Application.Request.ContractId = null;
  }
     
      
  // }
}

onOldContractChange(isFormLoad : boolean){

  debugger;
  
  if(!isFormLoad){
    
    //reset split contracts
    this.Application.Request.SplitContracts = [];

   

  }

  this.getCodesOfProduct();

}

getCodesOfProduct(){

  if (this.Application.Request.ContractId != null && this.Application.Request.ContractId != undefined 
    && this.Application.Request.ContractId !== Guid.EMPTY.toString() && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']) {
   
    this.mainProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id == this.Application.Request.ContractId)["ProductMainFamilyCode"];

    this.subProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
    .find(c => c.Id == this.Application.Request.ContractId)["ProductSubFamilyCode"];

    this.ProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
    .find(c => c.Id == this.Application.Request.ContractId)["ProductCode"];

    

  }

}

onChangeCRVersion(isFormLoad:boolean){
  
  if(!isFormLoad){
    this.splitContractGridModel.ContactDetailsIds = [];
    this.splitContractGridModel.ILVersionId = 
    // this.splitContractGridModel.CRVersionId = 
    // this.splitContractGridModel.CRId = 
    this.splitContractGridModel.ILId = null;
    this.splitContractGridModel.ModonProducts =[];
  }
  
  if(this.splitContractGridModel.CRId != null && this.splitContractGridModel.CRId != undefined
    && this.splitContractGridModel.CRId != Guid.EMPTY.toString()){
    
      let Contacts = this.SplitRequestService.GetContactDetailsByCR(this.splitContractGridModel.CRId);
      let ILs = this.SplitRequestService.GetILsByCR(this.splitContractGridModel.CRId);
      let modonProducts = this.SplitRequestService.GetModonProductsRelatedToCR(this.splitContractGridModel.CRId);
      forkJoin([Contacts, ILs, modonProducts]).subscribe(results => {
      
      let ContactsResult = results[0] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      let ILsResult = results[1] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      let productResult = results[2] as ApiGenericResponse<RetrieveOptionsRequest[]>;
  
      if(ContactsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(ContactsResult.Content);
  
      if(ILsResult.ResponseCode === ResponseCode.Success)
       this.lookupService.handleRetrievedLookup(ILsResult.Content);
  
       if(productResult.ResponseCode === ResponseCode.Success)
       this.lookupService.handleRetrievedLookup(productResult.Content);
  
  
      
      })
  }
  
}

toggleCRVersionInfo(){
  this.showCRVersionInfo = ! this. showCRVersionInfo;
}

toggleILVersionInfo(){
  this.showILVersionInfo = ! this. showILVersionInfo;
}

popUpOpened(event:boolean){

  debugger;
  this.showILVersionInfo = this.showCRVersionInfo = false;
  console.log("this.splitContractGridModel.ProductMainFamilyId   "+this.splitContractGridModel.ProductMainFamilyId)
}


//emitts the child controls
CRControlReady(control: NgModel) {
  this.firstStage.addControl(control);
}

ContractControlReady(control: NgModel) {
  this.firstStage.addControl(control);
 }

CRVersionControlReady(control: NgModel) {
  this.splitContractGridForm.addControl(control);
 }

ILVersionControlReady(control: NgModel) {
  this.splitContractGridForm.addControl(control);
 }

 SplitContractLength():number{
  
    return this.Application.Request.SplitContracts != null ? this.Application.Request.SplitContracts.filter(s => s.IsDeleted == false).length : 0;
 }

}
