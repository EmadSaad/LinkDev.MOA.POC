import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { ProductMainFamily } from 'src/modules/Contract-Edit/enums/product-main-family.enums';
import { ProductSubFamily } from 'src/modules/Contract-Edit/enums/product-subfamily.enums';
import { ContractModel } from 'src/modules/shared/Common/old-cr-and-contract/interfaces/Contract-model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { AlertService } from 'src/modules/shared/services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { MergeContractModel } from '../../interfaces/merge-contract-model';
import { MergeRequestModel } from '../../interfaces/merge-request-model';
import {MergeRequestService} from '../../services/merge-request.service';
import { ColumnFieldType, GridColumn } from "src/modules/shared/form-guide/gridEmmitter/models/GridColumn";
import { forkJoin } from 'rxjs';
import { CRVersion } from 'src/modules/shared/Common/CR-version/interfaces/cr-version-model';
import { CrVersionComponent } from 'src/modules/shared/Common/CR-version/cr-version/cr-version.component';
import { ILVersion } from 'src/modules/shared/Common/IL-version/interfaces/il-version-model';
import { IlVersionComponent } from 'src/modules/shared/Common/IL-version/il-version/il-version.component';


@Component({
  selector: 'app-contract-merge',
  templateUrl: './contract-merge.component.html',
  styleUrls: ['./contract-merge.component.css']
})
export class ContractMergeComponent extends EServicesBase<MergeRequestModel> implements OnInit {
  protected TApplicationNewInstance(): MergeRequestModel {
   return new MergeRequestModel();

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
  oldContract: ContractModel;
  contracts : any[];
  getContact: boolean = false;

  @ViewChild('ContractForm') ContractForm: NgForm;
  @ViewChild('mergeContractGridForm') mergeContractGridForm: NgForm;
  @ViewChild('CRVersionChild' /* #name or Type*/) CRVersionChild : CrVersionComponent;
  @ViewChild('IlVersionChild') IlVersionChild: IlVersionComponent;

  constructor(public MergeRequestService: MergeRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,

    protected router: Router) {super(MergeRequestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
      this.titleService.setTitle("Modon | Merge Request");
      this.oldContract = { ContactDetails: [],
        CRDetailsModel: {CROwners: [], CRActivities: [], CRType: 'crtype'},
        ILDetailsModel: {ILSource: '', ILStatus: '', ILType: '', ILProducts: '', FactoryName: '', CityName: ''}};
        this.CRVersionModel = { Id: '', CRActivity: '', Owners: [], Activities: [], Name: '', IssuanceCity: '',
        IssueDate: '', ExpiryDate: '', CRType: '', CRName: ''};
        this.ILVersionModel = {ILName: '', ILNumber: '', ILActivities: [], ILProducts: '', ILProductsList: [],
      ILSource: '', ILStatus: '', ILId: '', ILType: '' , InvestmentType: '', OwnerName: '', FactoryName: '', CityName: '',
      IssueDate: '', ExpiryDate: '', CRName: ''};

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
  mergeContractGridModel : MergeContractModel ={CRId:null};
  mergeContractGridcols: GridColumn[] = [

    {header:"MergeRequest.Contract",field:"Id",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contract_ContractOptionModel'}},
    {header:"MergeRequest.ProductMainFamily",field:"ProductMainFamilyId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}},
    {header:"MergeRequest.ProductSubFamily",field:"ProductSubFamilyId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}},
    {header:"MergeRequest.Product",field:"ProductId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'product_Product'}}
    ];
    OwnerGridcols: GridColumn[] = [
      {header:"MergeRequest.OwnerName",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"MergeRequest.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
    ];
    ActivitiesGridcols: GridColumn[] = [
      {header:"MergeRequest.ActivityName",field:"ActivityName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"MergeRequest.ClassName",field:"ClassName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"MergeRequest.DivisionName",field:"DivisionName",typeConfig: {type:ColumnFieldType.Text}}
    ];
    ILProductsgridcols: GridColumn[] = [
      {header: 'MergeRequest.Name', field: 'Name', typeConfig: {type: ColumnFieldType.Text}}
    ];
    ILActivityGridcols: GridColumn[] = [
      {header: 'MergeRequest.Name', field: 'Name', typeConfig: {type: ColumnFieldType.Text}}
    ];
  formStructure: FormHierarchyBase[] = [
    {index:1,label:"MergeRequest.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"MergeRequest.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"MergeRequest.OldContract", type: NodeType.Section, data:"OldContract"},
            {index:2, label:"MergeRequest.MergeContracts", type: NodeType.Section, data:"MergeContracts"},
            {index:3, label:"MergeRequest.NewContract", type: NodeType.Section, data:"NewContract"}
          ]
        }
      ]
    }
  ];

  @ViewChild('FirstStage') firstStage: NgForm;


ngOnInit() {


 debugger;

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

get listLength(){
  if(this.Application && this.Application.Request && this.Application.Request.MergeContracts)
    return this.Application.Request.MergeContracts.filter(x => x.IsDeleted !== true).length;

    return 0;
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
    {EntityName:"product",CachingKey:"product_Product",Mode: LookupRequestMode.Product},
    {EntityName:"ldv_contract",CachingKey:"ldv_contract_ContractOptionModel",Mode: LookupRequestMode.ContractOptionModel}

    ];
}


public getProductMainFamily(): any[] {
  if (this.lookupService.lookupEntities['product_Product']) {
    const mainFamily  = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === Guid.EMPTY.toString() || x['ParentProductId'] === null);

    if(this.Application.Request.ContractId &&this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'] &&
     this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'].find(c => c.Id === this.Application.Request.ContractId)) {

      let ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
      .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

      let ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
      .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];

      let ProductId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
      .find(c => c.Id === this.Application.Request.ContractId)['ProductCode'];
    }
    return mainFamily;
  } else {
   return [];
  }

}
public getProductSubFamily() {
  if (this.lookupService.lookupEntities['product_Product'] && this.mergeContractGridModel.ProductMainFamilyId) {
    let productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.mergeContractGridModel.ProductMainFamilyId)['Id'];
    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid)
    return x;
  }else return [];

}
public getProduct(): any[] {
  if (this.lookupService.lookupEntities['product_Product'] && this.mergeContractGridModel.ProductSubFamilyId) {
    let productSubFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.mergeContractGridModel.ProductSubFamilyId)['Id'];
    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productSubFamilyGuid)
    return x;
  }else return [];


}

public getContractProductSubFamily(): any[] {
  if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductMainFamilyId) {
    let productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.Application.Request.ProductMainFamilyId)['Id'];
    var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid)
    return x;
  }else return [];
}

public getContractProduct(): any[] {

  if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductSubFamilyId) {
   // let productSubFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.Application.Request.ProductSubFamilyId)['Id'];
    let ProductId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
    .find(c => c.Id === this.Application.Request.ContractId)['ProductCode'];

    this.Application.Request.ProductId =ProductId;
    var x = this.lookupService.lookupEntities['product_Product'];//.filter(k => k['Value'] === ProductId);

    return x;
  }else return [];

}

submitRequest(){
  this.submit = true;
  debugger;
  let isDocumentsValid = this.validateDocuments();

  if(this.listLength>0&&this.listLength<5&&this.ContractForm.valid && isDocumentsValid ){
    this.submitForm();
  }

}

onCRChange(){
  SharedHelper.showLoader();
console.log(this.Application.Request);
console.log(this.mergeContractGridForm);
  debugger;
  if (this.Application.Request.NewCRId != null && this.Application.Request.NewCRId != undefined
    && this.Application.Request.NewCRId !== Guid.EMPTY.toString()) {

     // if(!this.Application.Request.Id || this.Application.ApplicationHeader.PortalStatusCode == PortalStatusCode.SendBack) {
     //   this.Application.Request.ILId = null;
     // }

     this.MergeRequestService.GetProductsRelatedToCR(this.Application.Request.NewCRId).subscribe(results => {

      let productsResult = results as ApiGenericResponse<RetrieveOptionsRequest[]>;


      if(productsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(productsResult.Content);

    });

    this.MergeRequestService.GetContactDetailsByCR(this.Application.Request.NewCRId).subscribe(results => {

      let contactsResult = results as ApiGenericResponse<RetrieveOptionsRequest[]>;


      if(contactsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(contactsResult.Content);

    });

    this.MergeRequestService.GetILsByCR(this.Application.Request.NewCRId).subscribe(results => {

      let ILsResult = results as ApiGenericResponse<RetrieveOptionsRequest[]>;


      if(ILsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(ILsResult.Content);

    });

    SharedHelper.hideLoader();

   console.log(this.Application.Request);
}
}
onOldContractChange(){

  if(this.Application.Request.ContractId == null || this.Application.Request.ContractId == undefined
    || this.Application.Request.ContractId === Guid.EMPTY.toString()){

      this.Application.Request.MergeContracts = [];
    }


  if (this.Application.Request.ContractId != null && this.Application.Request.ContractId != undefined
    && this.Application.Request.ContractId !== Guid.EMPTY.toString() && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']) {

   /* this.mainProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id == this.Application.Request.ContractId)["ProductMainFamilyCode"];

  this.subProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id == this.Application.Request.ContractId)["ProductSubFamilyCode"];

  this.ProdutOldContract = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id == this.Application.Request.ContractId)["ProductCode"];*/
  }
}



ContractControlReady(control: NgModel) {
  debugger;
  this.ContractForm.addControl(control);

  console.log(control);
 }
 CRControlReady(control: NgModel) {
  this.ContractForm.addControl(control);
 }

 public onContractChange(isFormLoad: boolean) {
  debugger;


  if (this.Application.Request !== undefined && this.Application.Request.ContractId != null
    && this.Application.Request.ContractId != Guid.EMPTY.toString()
  && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'] &&
   this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id === this.Application.Request.ContractId)) {

   this.Application.Request.ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
 .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

  this.Application.Request.ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
  .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];
 if (this.Application.Request.ProductSubFamilyId === ProductSubFamily.ReadyUnits) {
   this.Application.Request.ProductId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
   .find(c => c.Id === this.Application.Request.ContractId)['ProductCode'];
 }

 }
 debugger;
  console.log(this.Application.Request);
}

public onMergeCRChange() {


   this.Application.Request.ILId = this.oldContract.ILId;
  this.Application.Request.NewCRId = this.Application.Request.CRId;


}


getContractsRelatedToUser(){

  let Contracts = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'];
if(Contracts !== null && Contracts !==undefined){
Contracts = Contracts.filter(x => x['Id'] !==this.Application.Request.ContractId);
  let request=this.Application.Request;
  Contracts=Contracts.filter(f=>f['ProductMainFamilyCode']===request.ProductMainFamilyId)//&&f['ProductSubFamilyCode']===request.ProductSubFamilyId&&f['ProductCode']===request.ProductId)
  if(this.Application.Request.MergeContracts!==null)

  this.Application.Request.MergeContracts.forEach(h=>Contracts=Contracts.filter(y=>y['Id']!==h.Id) );
}

  return Contracts;
}

popUpOpened(event){

  this.showILVersionInfo = this.showCRVersionInfo = false;
}

onChangeMainProduct(){
  if(this.mergeContractGridModel.ProductMainFamilyId !== '1'){
    this.mergeContractGridModel.ILVersionId = this.mergeContractGridModel.ILId = "";
    this.mergeContractGridModel.hasIL = null;
  }
}

CRVersionControlReady(control: NgModel) {
  this.ContractForm.addControl(control);
 }



 OnMergeContractsChange(){
  this.mergeContractGridModel.ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
 .find(c => c.Id === this.mergeContractGridModel.Id)['ProductMainFamilyCode'];

 this.mergeContractGridModel.ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
 .find(c => c.Id === this.mergeContractGridModel.Id)['ProductSubFamilyCode'];

 this.mergeContractGridModel.ProductId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
   .find(c => c.Id === this.mergeContractGridModel.Id)['ProductCode'];

   this.mergeContractGridModel.CRId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
   .find(c => c.Id === this.mergeContractGridModel.Id)['CRCode'];

 }


 onChangeCRVersion(isFormLoad:boolean){

   debugger;

   if(!isFormLoad){
     this.mergeContractGridModel.ContactDetailsIds = [];
     this.mergeContractGridModel.ILVersionId =

     this.mergeContractGridModel.ILId = null;
     this.mergeContractGridModel.ModonProducts =[];
   }

   if(this.Application.Request.NewCRId != null && this.Application.Request.NewCRId != undefined
     && this.Application.Request.NewCRId != Guid.EMPTY.toString()){

       let Contacts = this.MergeRequestService.GetContactDetailsByCR(this.mergeContractGridModel.CRId);
       let ILs = this.MergeRequestService.GetILsByCR(this.mergeContractGridModel.CRId);
       let modonProducts = this.MergeRequestService.GetModonProductsRelatedToCR(this.mergeContractGridModel.CRId);
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



       });
   }

 }

 toggleCRVersionInfo(){
  this.showCRVersionInfo = ! this. showCRVersionInfo;
}

toggleILVersionInfo(){
  this.showILVersionInfo = ! this. showILVersionInfo;
}


onOldCRChange(isFormLoad: boolean) {
  debugger;



  if (!isFormLoad) {
     // this.Application.Request.NewCRId = this.Application.Request['undefined'];
    }

  setTimeout(() => {

    this.CRVersionChild.onChangeCRVersion(false, false);
  }, 0);


}

saveRequest(){
debugger;
//this.Application.Request.MergeContracts=this.mergeContractGridForm
let isDocumentsValid = this.validateDocuments();
  // remove deleted record from the grid
  if (isDocumentsValid&&this.Application.Request.Id && this.Application.Request.MergeContracts != null && this.Application.Request.MergeContracts.length > 0)
  {this.Application.Request.MergeContracts = this.Application.Request.MergeContracts; }
   this.saveForm();

}

ILVersionControlReady(control: NgModel) {
  this.ContractForm.addControl(control);
 }
 afterFormReady(){
  if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1')
  this.formStructure.push({index:2,label:"MergeRequest.RequestComments",type:NodeType.Parent})
  if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '4')
      this.formStructure.push({index:3,label:"MergeRequest.PaymentStage",type:NodeType.Parent})

      this.MergeRequestService.getContractsRelatedToUser().subscribe(results => {

        let contactsResult = results as ApiGenericResponse<RetrieveOptionsRequest[]>;


        if(contactsResult.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(contactsResult.Content);


        this.getContact = false;
      });

  }
}
