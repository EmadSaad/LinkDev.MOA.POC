import { IlVersionComponent } from './../../../shared/Common/IL-version/il-version/il-version.component';
import { OldCrAndContractComponent } from './../../../shared/Common/old-cr-and-contract/old-cr-and-contract/old-cr-and-contract.component';
import { CrVersionComponent } from './../../../shared/Common/CR-version/cr-version/cr-version.component';

import { request } from 'http';
import { EditTypeCode } from './../../enums/edit-type.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { forkJoin } from 'rxjs';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { IndustrialLicenseModel } from 'src/modules/Contract-Submission/interfaces/industrial-license-model';

import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { AlertService } from 'src/modules/shared/services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { PortalStatusCode } from '../../enums/portal-status-code.enum';
import { ContractDetails } from '../../interfaces/contract-details';
import { ContractEditModel } from '../../interfaces/contract-edit-model';
import { ContractEditService } from '../../services/contract-edit.service';
import { ContractModel } from 'src/modules/shared/Common/old-cr-and-contract/interfaces/Contract-model';
import { NgForm, NgModel } from '@angular/forms';
import { CRVersion } from 'src/modules/shared/Common/CR-version/interfaces/cr-version-model';
import { ILVersion } from 'src/modules/shared/Common/IL-version/interfaces/il-version-model';
import { ProductSubFamily } from '../../enums/product-subfamily.enums';
import { ProductMainFamily } from '../../enums/product-main-family.enums';


@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent extends EServicesBase<ContractEditModel> implements OnInit {
  submit: boolean = false;
  yesText: string = 'Yes';
  NoText: string = 'No';
  getContract: boolean = false;
  CompanyProfile: boolean = true;
  oldContract: ContractModel;
  select:string;
  
  CRVersionModel: CRVersion;
  ILVersionModel: ILVersion;

  clonedContractId = null;

  showTransferCR: boolean = false;
  showTransferIL: boolean = false;
  initILVersionModel :ILVersion;
  NewCRId: string = 'NewCRId';
  NewILId: string = 'NewILId';



  ownerShipILDictionary= new Map<string, any>();
  ownerShipCRDictionary = new Map<string, any>();
  ILValidationMessage: string;
  CRValidationMessage: string;

  @ViewChild('ContractForm') ContractForm: NgForm;
  
  //@ViewChild('CRVersionChild', {static: false}) CRVersionChild: CrVersionComponent;
  @ViewChild('CRVersionChild' /* #name or Type*/) CRVersionChild : CrVersionComponent;
  @ViewChild('IlVersionChild') IlVersionChild: IlVersionComponent;
  @ViewChild('OldContractChild') OldContractChild: OldCrAndContractComponent;


 
  config = {
    displayKey: 'Text', //if objects array passed which key to be displayed defaults to description
    search: false, //true/false for the search functionlity defaults to false,
    placeholder: 'ServicesCommon.Select', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'Text' , // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };


  ActivitiesGridcols: GridColumn[] = [
    {header: 'SplitRequest.ActivityName', field: 'ActivityName', typeConfig: {type: ColumnFieldType.Text}},
    {header: 'SplitRequest.ClassName', field: 'ClassName', typeConfig: {type: ColumnFieldType.Text}},
    {header: 'SplitRequest.DivisionName', field: 'DivisionName', typeConfig: {type: ColumnFieldType.Text}}
  ];

  ILProductsgridcols: GridColumn[] = [
    {header: 'SplitRequest.Name', field: 'Name', typeConfig: {type: ColumnFieldType.Text}}
  ];

  ILActivityGridcols: GridColumn[] = [
    {header: 'SplitRequest.Name', field: 'Name', typeConfig: {type: ColumnFieldType.Text}}
  ];
  OwnerGridcols: GridColumn[] = [
    {header:'SplitRequest.OwnerName',field:'OwnerName',typeConfig: {type:ColumnFieldType.Text}},
    {header:'SplitRequest.SharingPercentage',field:'SharingPercentage',typeConfig: {type:ColumnFieldType.Text}}
  ];

  PercentageValidations: {[index: string]: string} = {'required': 'Validations.Required', 'pattern': 'Validations.ValidPercentage0-100'}

  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  formStructure: FormHierarchyBase[] = [
    {index: 1 , label : 'ContractEditMerge.RequestDetails' , type: NodeType.Parent, children:
      [
        {index: 1 , label: 'ContractEditMerge.FirstStage', type: NodeType.Child, children:
          [
            {index: 1 , label: 'ContractEditMerge.OldContractTitle', type: NodeType.Section,
             data: 'OldContractInfoSection'},
             {index: 2 , label: 'ContractEditMerge.NewContractTitle', type: NodeType.Section,
             data: 'NewContractInfoSection'},

          ]
        }

      ]
    },
  ];

    constructor(public contractService: ContractEditService,
        public lookupService: LookupService,
        protected activatedRoute: ActivatedRoute,
        protected alertService: AlertService,
        protected translateService: TranslateService,
        protected modalService: NgbModal,
        private titleService: Title,
        protected router: Router) {
        super(contractService, lookupService, activatedRoute, alertService, translateService, modalService, router);
         this.titleService.setTitle('Modon | Contract Edit');
         this.oldContract = { ContactDetails: [],
      CRDetailsModel: {CROwners: [], CRActivities: [], CRType: 'crtype'},
      ILDetailsModel: {ILSource: '', ILStatus: '', ILType: '', ILProducts: '', FactoryName: '', CityName: ''}};

      this.CRVersionModel = { Id: '', CRActivity: '', Owners: [], Activities: [], Name: '', IssuanceCity: '',
      IssueDate: '', ExpiryDate: '', CRType: '', CRName: ''};

      this.ILVersionModel = {ILName: '', ILNumber: '', ILActivities: [], ILProducts: '', ILProductsList: [],
      ILSource: '', ILStatus: '', ILId: '', ILType: '' , InvestmentType: '', OwnerName: '', FactoryName: '', CityName: '',
      IssueDate: '', ExpiryDate: '', CRName: ''};

      this.initILVersionModel = this.ILVersionModel;
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
                  }
                );
              });
          });
    });

  }
  protected TApplicationNewInstance(): ContractEditModel {
    return new ContractEditModel();
  }
  public afterFormReady(): void  {
      debugger;
      if(this.Application.Request.EditType) {
        this.Application.Request.EditType = this.Application.Request.EditType.map(x => x.toString());
      }

    this.getDynamicLookups();
    // Check status and add second tab for request comments
    if (this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== PortalStatusCode.Submitted) {
      this.formStructure.push({index: 2 , label: 'ContractEditMerge.RequestComments', type: NodeType.Parent});
    }  if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '4') {
      this.formStructure.push({index: 3 , label: 'ContractEditMerge.PriceOffer', type: NodeType.Parent})
    }
    console.log(this.Application.Request);
      if (this.Application.Request.ContractId === Guid.EMPTY ) {
        this.Application.Request.ContractId = null;
      }
      if (this.Application.Request.CRId === Guid.EMPTY ) {
        this.Application.Request.CRId = null;
      }
      if (this.Application.Request.EditType !=null && this.Application.Request.EditType.length > 0 &&
         this.Application.Request.EditType.includes(EditTypeCode.OwnerShipTransfer)) {
        this.CheckCRTransferOwnerShip();
        this.CheckILTransferOwnerShip();
      }

  }
  public getDynamicLookups() {
    this.contractService.getDynamicLookups().subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          this.lookupService.handleRetrievedLookup(res.Content);
          console.log(this.lookupService.lookupEntities);
        }

      });
  }
  protected getQueryStringNames(): string[] {
    return ['Id'];
  }
  public getLookupTypes(): RetrieveOptionsRequest[] {
    this.translateService.get('Yes').subscribe(res => {
      this.yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          this.NoText = res;
          let d: RetrieveOptionsRequest[] = [{CachingKey: 'YesNo', EntityName: '', Mode: 1, Result: [{Text: this.yesText, Value: 'true'}, {Text: this.NoText, Value: 'false'}]}]
          this.lookupService.handleRetrievedLookup(d);
        }
      );
    });

    return [
      {EntityName: 'ldv_editcontract', CachingKey: 'ldv_editcontract_ldv_requesttype_OptionSet',
      Mode: LookupRequestMode.OptionSet, OptionSetName: 'ldv_requesttype'},

      {EntityName: 'ldv_editcontract', CachingKey: 'ldv_editcontract_ldv_edittype_OptionSet',
      Mode: LookupRequestMode.OptionSet, OptionSetName: 'ldv_edittype'},

      {EntityName: 'product', CachingKey: 'product_Product', Mode: LookupRequestMode.Product},
    ];
  }

  public getAvailableContracts(): any[] {
    this.getContract = true;
    this.contractService.getAvailableContracts();
    return [];
  }
  public requestTypeChange() {
   }
  public onContractChange(isFormLoad: boolean) {
    debugger; 
    if (!isFormLoad) {

      this.Application.Request.ILId =  this.OldContractChild.oldContract.ILId;
      this.Application.Request.NewILId =  this.OldContractChild.oldContract.ILId;



        this.Application.Request.ContactDetails = this.OldContractChild.oldContract.ContactDetails.map(c => c.ContactID);
        if ( this.Application.Request.ContactDetails && this.Application.Request.ContactDetails.length > 0 ) {
          debugger;
          let contactList = this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'];

          if (contactList) {

            for (let i = 0; i < this.Application.Request.ContactDetails.length; i++) {
              const index = contactList.findIndex(p => p['Value'] === this.Application.Request.ContactDetails[i]);
                if (index == -1) {
                  this.Application.Request.ContactDetails.splice(i , 1);
                }
            }
          } 
          }
      this.IlVersionChild.onChangeILVersion(false , isFormLoad);

    


    if (this.Application.Request !== undefined && this.Application.Request.ContractId != null
      && this.Application.Request.ContractId != Guid.EMPTY.toString()
    && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'] &&
     this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
    .find(c => c.Id === this.Application.Request.ContractId)) {

     this.Application.Request.ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
   .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

    this.Application.Request.ProductSubFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
    .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];

   if (this.Application.Request.ProductSubFamilyId !== ProductSubFamily.IndustrialLands) {
     this.Application.Request.ProductId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
     .find(c => c.Id === this.Application.Request.ContractId)['ProductCode'];
   }
  //  this.getProduct();
   }
  }

  }

  public onCRChange(isFormLoad: boolean) {
    debugger;
    if (this.Application.Request.NewCRId != null && this.Application.Request.NewCRId != undefined
      && this.Application.Request.NewCRId !== Guid.EMPTY.toString()) {
        SharedHelper.showLoader();

        if (!isFormLoad) {
            this.Application.Request.NewILId = null;
        }
      const contacts = this.contractService.GetContactDetailsByCR(this.Application.Request.NewCRId);
      const IL = this.contractService.GetFinalILsByCR(this.Application.Request.NewCRId);
      const loan = this.contractService.GetLoanStatus(this.Application.Request.NewCRId);
      const products =  this.contractService.GetProductsRelatedToCR(this.Application.Request.NewCRId);


      SharedHelper.showLoader();

    forkJoin([contacts, IL, loan, products]).subscribe(results => {

      const contactsResult = results[0] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      const ILResult = results[1] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      const loanResult =  results[2] as ApiGenericResponse<boolean>;
      const productsResult = results[3] as ApiGenericResponse<RetrieveOptionsRequest[]>;

      if (contactsResult.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(contactsResult.Content);


      }
      if (ILResult.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(ILResult.Content);
      }
      if (loanResult.ResponseCode === ResponseCode.Success) {
        this.Application.Request.HasLoan = loanResult.Content;
      }
      if (productsResult.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(productsResult.Content);
      }
      console.log(this.lookupService);
      SharedHelper.hideLoader();

    });
    }

  }
  public onHasILChange() {
    debugger
    if (!this.Application.Request.NewILId && this.Application.Request.hasIL.toString() === 'true'
    && this.Application.Request.EditCR.toString() === 'false') {

      this.Application.Request.NewILId = this.OldContractChild.oldContract.ILId;
      this.IlVersionChild.onChangeILVersion(false, false);

    }

  }
  public onOldCRChange(isFormLoad: boolean) {
    debugger;
    if (!isFormLoad) {
        this.Application.Request.NewCRId = this.Application.Request.CRId;
        //this.Application.Request.NewILId = this.Application.Request.ILId;
      }

      console.log(this.Application.Request);
  

      var x = this.CRVersionChild.Contract;
      this.CRVersionChild.onChangeCRVersion(false, false);

    // setTimeout(() => {
    //   debugger;
    //   var x = this.CRVersionChild.Contract;
    //   this.CRVersionChild.onChangeCRVersion(false, false);
    // }, 0);
    

  }
  public onILChange() {
  }
  public onEditTypeChange() {
    if (this.Application.Request.EditType && !this.Application.Request.EditType.includes(EditTypeCode.EditClassification) ) {
      this.Application.Request.ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
      .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

       this.Application.Request.ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
       .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];

      if (this.Application.Request.ProductSubFamilyId === ProductSubFamily.ReadyUnits) {
        this.Application.Request.ProductId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
        .find(c => c.Id === this.Application.Request.ContractId)['ProductCode'];
      }
    }
    if (this.Application.Request.EditType && this.Application.Request.EditType.includes(EditTypeCode.OwnerShipTransfer)) {
      this.Application.Request.ContactDetails = [];

    } else if (this.Application.Request.EditType && !this.Application.Request.EditType.includes(EditTypeCode.OwnerShipTransfer)
     && this.Application.Request.EditCR.toString() == 'false') {

       if (this.Application.Request.NewCRId !== this.Application.Request.CRId ) { // if newCR == CR we not need to call all this methods
        this.Application.Request.ContactDetails = this.OldContractChild.oldContract.ContactDetails.map(c => c.ContactID);
         this.Application.Request.ILId = this.OldContractChild.oldContract.ILId;
         this.Application.Request.NewILId = this.OldContractChild.oldContract.ILId;

         this.Application.Request.NewCRId = this.Application.Request.CRId;

         this.Application.Request.OwnerShipCR = null;
         this.Application.Request.OwnerShipIL = null;
         this.showTransferCR = false;
         this.showTransferIL = false;

         this.onCRChange(null);
         this.CRVersionChild.onChangeCRVersion(false, false);
         this.IlVersionChild.onChangeILVersion(false, false);
         
       }
    }
  }
  public onEditCRChange() {
    debugger;
    if (this.Application.Request.EditCR.toString() === 'false') {
      if( this.Application.Request.NewCRId != this.Application.Request.CRId) {

       this.Application.Request.ILId = this.OldContractChild.oldContract.ILId;
       this.Application.Request.NewILId = this.OldContractChild.oldContract.ILId;

       this.Application.Request.NewCRId = this.Application.Request.CRId;
       this.CRVersionChild.onChangeCRVersion(false, false);
       this.IlVersionChild.onChangeILVersion(false, false);
      }

    }
  }
  onSelect = (node: FormHierarchyBase) => {
    switch (node.type) {
      case NodeType.Parent:
        this.ActiveLevelOne = node.index;
        break;
      case NodeType.Child:
        this.ActiveLevelTwo = node.index;
        break;
    }
    SharedHelper.scrollToBody();
  }
  public getProductMainFamily(): any[] {
    if (this.lookupService.lookupEntities['product_Product']) {
      const mainFamily  = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === Guid.EMPTY.toString() || x['ParentProductId'] === null);

      if(this.Application.Request.ContractId && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'] &&
       this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'].find(c => c.Id === this.Application.Request.ContractId)) {

        let ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
        .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

        let ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
        .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];

        if ( ProductMainFamilyId === ProductMainFamily.Industrial &&
          ProductSubFamilyId === ProductSubFamily.ReadyUnits) {
  
            let index = mainFamily.findIndex(p => p['Value'] === ProductMainFamily.Logistic);
            if (index !== -1) {
              mainFamily.splice(index , 1);
            }
            index = mainFamily.findIndex(p => p['Value'] === ProductMainFamily.Services);
            if (index !== -1) {
              mainFamily.splice(index , 1);
            }
          }
          if (ProductMainFamilyId === ProductMainFamily.Logistic) {
            const index = mainFamily.findIndex(p => p['Value'] === ProductMainFamily.Services);
            if (index !== -1) {
              mainFamily.splice(index , 1);
            }
          }
          if (ProductMainFamilyId === ProductMainFamily.Services) {
            let index = mainFamily.findIndex(p => p['Value'] === ProductMainFamily.Logistic);
            if (index !== -1) {
              mainFamily.splice(index , 1);
            }
            index = mainFamily.findIndex(p => p['Value'] === ProductMainFamily.Industrial);
            if (index !== -1) {
              mainFamily.splice(index , 1);
            }
          }
      }
      return mainFamily;
    } else {
     return [];
    }

  }
  public getProductSubFamily() {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductMainFamilyId) {
        const productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value']
         === this.Application.Request.ProductMainFamilyId)['Id'];

        let subFamily = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid);
 
        if (this.Application.Request.ContractId &&this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'] && this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
        .find(c => c.Id === this.Application.Request.ContractId)) {

          let ProductMainFamilyId = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
          .find(c => c.Id === this.Application.Request.ContractId)['ProductMainFamilyCode'];

          let ProductSubFamilyId =this.lookupService.lookupEntities['ldv_contract_ContractOptionModel']
          .find(c => c.Id === this.Application.Request.ContractId)['ProductSubFamilyCode'];

          if (ProductMainFamilyId === ProductMainFamily.Industrial &&
            ProductSubFamilyId !== ProductSubFamily.IndustrialLands) {
              const index = subFamily.findIndex(p => p['Value'] === ProductSubFamily.IndustrialLands);
              if (index !== -1) {
                subFamily.splice(index , 1);
              }

            }
        }

        return subFamily;
      } else {
          return[];
      }


    // if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductMainFamilyId) {
    //   let productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.Application.Request.ProductMainFamilyId)['Id'];
    //   var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid)
    //   return x;
    // }
    // else
    //   return[];
  }
  public getProduct(): any[] {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductSubFamilyId) {
      const productSubFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value']
      === this.Application.Request.ProductSubFamilyId)['Id'];
      const product = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productSubFamilyGuid);
      return product;
    } else {
      return[];
    }
  }
  public resetSubFamily() {
 
    if (this.Application && this.Application.Request && this.Application.Request.ProductSubFamilyId){
      this.Application.Request.ProductSubFamilyId = null;
    }
    this.resetProduct();
  }
  public resetProduct() {
    if (this.Application && this.Application.Request && this.Application.Request.ProductId){

      this.Application.Request.ProductId = null;
    }
  }
  public get editTypeCode(): typeof EditTypeCode {
    return EditTypeCode;
  }
  public get productSubFamily(): typeof ProductSubFamily {
    return ProductSubFamily;
  }
  public get productMainFamily(): typeof ProductMainFamily {
    return ProductMainFamily;
  }

  submitRequest() {
    debugger;
    console.log(this.Application.Request);
    this.submit = true;
    let isDocumentsValid = this.validateDocuments();

    if (this.ContractForm.valid && isDocumentsValid) {
      SharedHelper.showLoader();

      if (this.Application.Request.EditType.includes(EditTypeCode.OwnerShipTransfer)) {
       let OwnerShipRespnse = [];
       

       OwnerShipRespnse.push(this.contractService.CheckCRTransferOwnerShip(this.Application.Request.OwnerShipCR));

       if (this.Application.Request.hasIL) {
         OwnerShipRespnse.push(this.contractService.CheckILTransferOwnerShip(this.Application.Request.OwnerShipCR ,
               this.Application.Request.OwnerShipIL));
       }

       forkJoin(OwnerShipRespnse).subscribe(results => {
         const CRResult = results[0] as ApiGenericResponse<CRVersion>;


         if (CRResult.ResponseCode === ResponseCode.Success) {
          this.Application.Request.CRVersionId = CRResult.Content.Id;
          this.Application.Request.NewCRId = CRResult.Content.CRId;

          this.contractService.GetContactDetailsByCR(this.Application.Request.NewCRId).subscribe( response => {

            if (response.ResponseCode === ResponseCode.Success) {
              this.lookupService.handleRetrievedLookup(response.Content);
              for (let index = 0; index < this.Application.Request.ContactDetails.length; index++) {
                if (!this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']
                  .find(c => c.Value === this.Application.Request.ContactDetails[index])) {
                    this.Application.Request.ContactDetails = [];
                    SharedHelper.hideLoader();
                    return;
                  }
              }
              if (this.Application.Request.hasIL) {
                debugger;
                const ILResult = results[1] as ApiGenericResponse<ILVersion>;
    
                if (ILResult.ResponseCode === ResponseCode.Success) {
    
                  this.Application.Request.ILVersionId = ILResult.Content.Id;
                  this.Application.Request.NewILId = ILResult.Content.ILId;


    
                  if (this.ContractForm.valid) {
                    console.log('submit true');
                      this.submitForm();
                  } else {
                    SharedHelper.hideLoader();
                   }
    
               } else {
                this.ILValidationMessage = ILResult.FriendlyResponseMessage;
                SharedHelper.hideLoader();
               }
    
             } else {
              if (this.ContractForm.valid) {
                console.log('submit true');
                  this.submitForm();
              } else {
                SharedHelper.hideLoader();
               }
             }
            }
          });

         

       } else {
        this.CRValidationMessage = CRResult.FriendlyResponseMessage;
        SharedHelper.hideLoader();
       }});
      } else {
        if (this.ContractForm.valid) {
          console.log('submit true');
            this.submitForm();
        } else {
          SharedHelper.hideLoader();
         }
      }
    }
  }
  public CheckCRTransferOwnerShip() {
  debugger;
  this.showTransferCR = false;
    if(this.Application.Request.OwnerShipCR){

      let ownerShipCRRecord = this.ownerShipCRDictionary.get(this.Application.Request.OwnerShipCR);
      if (ownerShipCRRecord) {

        this.MapCREachProperty(ownerShipCRRecord);
      } else {

        this.contractService.CheckCRTransferOwnerShip(this.Application.Request.OwnerShipCR).subscribe(
          res => {
              debugger;
            if (res.ResponseCode === ResponseCode.Success) {
              console.log(res);
              this.showTransferCR = true;
              this.MapCREachProperty(res);
              this.Application.Request.CRVersionId = this.CRVersionModel.Id;
              this.Application.Request.NewCRId = this.CRVersionModel.CRId;

              this.contractService.GetContactDetailsByCR(this.Application.Request.NewCRId).subscribe( response => {

                if (response.ResponseCode === ResponseCode.Success) {
                  this.lookupService.handleRetrievedLookup(response.Content);
                }
              });
              this.ownerShipCRDictionary.set(this.Application.Request.OwnerShipCR , res);
            } else {
              this.CRValidationMessage = res.FriendlyResponseMessage;
            }
    
          });
        }
      }

    
  }
  public CheckILTransferOwnerShip() {
    this.showTransferIL = false;
    let ownerShipILRecord = this.ownerShipILDictionary.get(this.Application.Request.OwnerShipIL);
    if (ownerShipILRecord) {
      this.MapILEachProperty(ownerShipILRecord);
    } else {
    this.contractService.CheckILTransferOwnerShip(this.Application.Request.OwnerShipCR, this.Application.Request.OwnerShipIL).subscribe(
      res => {
          debugger;
        if (res.ResponseCode === ResponseCode.Success) {
          this.MapILEachProperty(res);
          this.Application.Request.ILVersionId = this.ILVersionModel.Id;
          this.Application.Request.NewILId = this.ILVersionModel.ILId;
          this.showTransferIL = true;
          this.ILValidationMessage = '';
          console.log(res);
        } else{
          this.ILValidationMessage = res.FriendlyResponseMessage;
        }

      });
    }
    }
  MapILEachProperty(result:any){

    this.ILVersionModel.Id = result.Content.Id;
    this.ILVersionModel.ILId = result.Content.ILId;
    this.ILVersionModel.ILSource = result.Content.ILSource;
    this.ILVersionModel.ILStatus = result.Content.ILStatus;
    this.ILVersionModel.ILActivities = result.Content.ILActivities;
    this.ILVersionModel.ILProductsList = result.Content.ILProductsList;
    this.ILVersionModel.ILName = result.Content.ILName;
    this.ILVersionModel.ILNumber = result.Content.ILNumber;
    this.ILVersionModel.ILType = result.Content.ILType;
    this.ILVersionModel.IssueDate = result.Content.IssueDate;
    this.ILVersionModel.ExpiryDate = result.Content.ExpiryDate;
    this.ILVersionModel.Nationality = result.Content.Nationality;
    this.ILVersionModel.FactoryName = result.Content.FactoryName;
    this.ILVersionModel.CityName = result.Content.CityName;
    this.ILVersionModel.OwnerName = result.Content.OwnerName;
    this.ILVersionModel.InvestmentType = result.Content.InvestmentType;
    this.ILVersionModel.CRName = result.Content.CRName;
    this.ILVersionModel.Name = result.Content.Name;
  }
  MapCREachProperty(result:any){
    this.CRVersionModel.Id = result.Content.Id;
    this.CRVersionModel.CRActivity = result.Content.CRActivity;
    this.CRVersionModel.CRName = result.Content.CRName;
    this.CRVersionModel.Name = result.Content.Name;
    this.CRVersionModel.CRId = result.Content.CRId;
    this.CRVersionModel.CRType = result.Content.CRType;
    this.CRVersionModel.IssuanceCity = result.Content.IssuanceCity;
    this.CRVersionModel.ExpiryDate = result.Content.ExpiryDate;
    this.CRVersionModel.IssueDate = result.Content.IssueDate;
    this.CRVersionModel.Owners = result.Content.Owners;
    this.CRVersionModel.Activities = result.Content.Activities;
  }


  CRControlReady(control: NgModel) {
    this.ContractForm.addControl(control);
   }
  ContractControlReady(control: NgModel) {
    this.ContractForm.addControl(control);
   }
  CRVersionControlReady(control: NgModel) {
    this.ContractForm.addControl(control);
   }
  ILVersionControlReady(control: NgModel) {
    this.ContractForm.addControl(control);
   }

}
