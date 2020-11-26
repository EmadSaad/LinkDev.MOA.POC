import { Component, OnInit, ViewChild } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { ContractSubmissionModel } from '../../interfaces/contract-submission-model';
import { ContractSubmissionService } from '../../services/contract-submission.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { Guid } from 'guid-typescript';
import { ResponseCode, ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { Product } from '../../interfaces/product';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { RawMaterial } from '../../interfaces/raw-material';
import { Equipment } from '../../interfaces/equipment';
import { Factory } from '../../interfaces/factory';
import { ImportingDetails } from '../../interfaces/importing-details';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CRAndRelatedILsModel } from '../../interfaces/CRAndRelatedILsModel';
import { IndustrialLicenseModel } from '../../interfaces/industrial-license-model';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { SAGIAModel } from '../../interfaces/SAGIAModel';
import { Title } from '@angular/platform-browser';
import { CRModel } from '../../interfaces/CR-model';

@Component({
  selector: 'app-contract-submission',
  templateUrl: './contract-submission.component.html',
  styleUrls: ['./contract-submission.component.css']
})
export class ContractSubmissionComponent extends EServicesBase<ContractSubmissionModel> implements OnInit {
  showDetails: boolean =false;

  constructor(public contractSubmissionService: ContractSubmissionService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,
    protected router: Router) {
    super(contractSubmissionService, lookupService, activatedRoute, alertService, translateService, modalService, router);
      this.titleService.setTitle("Modon | Contract submission");
  }
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  submit: boolean = false;
  isLoading: boolean = true;
  getContact: boolean = false;
  submitText: string = "Next";
  yesText: string = "Yes";
  NoText: string = "No";
  getIL: boolean = false;
  getSAGIA: boolean = false;
  SAGIAError: string;
  FactoryError: string;

  enableSubmit: boolean = false;
  enablePrevious: boolean = false;

  CurrentCR: CRModel={};
  CurrentIL: IndustrialLicenseModel={};
  CurrentSAGIADetails: SAGIAModel={};
  pendingOnCREnabled: boolean = false;
  pendingOnILEnabled: boolean = false;
  mobilePattern: string="";

  isProductsEnabled: boolean = true;
  isMainProductEnabled: boolean = true;

  //#region Grids
  productsGridcols: GridColumn[] = [
    {header:"ContractSubmission.FinalProduct",field:"FinalProduct",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.ProductionVolume",field:"ProductionVolume",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Unit",field:"Unit",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contractsubmissionproduct_ldv_productionunit_OptionSet'}},
    {header:"ContractSubmission.Symbol",field:"Symbol",typeConfig: {type:ColumnFieldType.Text}}
  ];
  productGridModel: Product={};
  rawMaterialGridcols: GridColumn[] = [
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contractsubmission_ldv_exporttingcountries_OptionSet'}},
    {header:"ContractSubmission.Type",field:"Type",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Quantity",field:"Quantity",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.MeasuringUnit",field:"Unit",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_rawmaterial_ldv_measuringunit_OptionSet'}},
  ];
  rawMaterialGridModel: RawMaterial={};
  equipmentGridcols: GridColumn[] = [
    {header:"ContractSubmission.ProductionLinesNumber",field:"ProductionLinesNumber",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contractsubmission_ldv_exporttingcountries_OptionSet'}},
  ];
  equipmentGridModel: Equipment={};
  factoryGridcols: GridColumn[] = [
    {header:"ContractSubmission.FactoryLocation",field:"Location",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_previousfactory_ldv_location_OptionSet'}},
    {header:"ContractSubmission.FactoryCode",field:"FactoryCode",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.ArabicName",field:"ArabicName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.EnglishName",field:"EnglishName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Address",field:"Address",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.MainActivity",field:"MainActivity",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.FactoryStatus",field:"FactoryStatus",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.ContractNumberId",field:"ContractNumberId",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contract_LookupWithId'}},
  ];
  factoryGridModel: Factory={};
  importingDetailsGridcols: GridColumn[] = [
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown,lookupKey:'ldv_contractsubmission_ldv_exporttingcountries_OptionSet'}},
    {header:"ContractSubmission.YearlyGoodVolume",field:"YearlyGoodVolume",typeConfig: {type:ColumnFieldType.Text}},
  ];
  importingDetailsGridModel: ImportingDetails={};
  CROwnerGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];
  ActivityGridcols: GridColumn[] = [
    {header:"ContractSubmission.Activity",field:"ActivityName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Division",field:"DivisionName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Class",field:"ClassName",typeConfig: {type:ColumnFieldType.Text}},
  ];
  PartnersGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.PartnershipPercentage",field:"PartnershipPercentage",typeConfig: {type:ColumnFieldType.Text}},
  ];



  ILProductsgridcols: GridColumn[] = [
    { header: "CRManagement.ProductName", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
  ];
 


  //#endregion
  
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
  //#region Validation messages
  ExportingPercentageValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage0-100'}
  Required_1_75Validations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage1-75'}
  Required_1_100Validations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.ValidPercentage1-100'}
  Required_WholeNumberValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.WholeNumber'}
  Required_GreaterThanZeroValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.GreaterThanZero'}
  Required_MobileValidations :{[index: string] : string}={'required':'Validations.Required','pattern':'Validations.Mobile'}
  //#endregion
  //#region Form Structures
  formStructure: FormHierarchyBase[]=[];
  IndustrialFormStructure: FormHierarchyBase[] = [
    {index:1,label:"ContractSubmission.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"ContractSubmission.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.RequestMainInfo", type: NodeType.Section, data:"RequestMainInfoSection"},
            {index:2, label:"ContractSubmission.AuthorizedSignatorySection", type: NodeType.Section, data:"AuthorizedSignatorySection"}
          ]
        },
        {index:2, label:"ContractSubmission.SecondStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.IndustryGoal", type: NodeType.Section, data:"IndustryGoalSection"},
            {index:2, label:"ContractSubmission.ProductsDetails", type: NodeType.Section, data:"ProductsSection"},
            {index:3, label:"ContractSubmission.RawMaterialsDetails", type: NodeType.Section, data:"RawMaterialsSection"},
            {index:4, label:"ContractSubmission.EquipmentDetails", type: NodeType.Section, data:"EquipmentSection"},
            {index:5, label:"ContractSubmission.ConsumersAgreementInfo", type: NodeType.Section, data:"ConsumersAgreementSection"},
            {index:6, label:"ContractSubmission.TechPartnerInfo", type: NodeType.Section, data:"TechPartnerInfoSection"},
          ]
        },
        {index:3, label:"ContractSubmission.ThirdStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.InternalProduction", type: NodeType.Section, data:"InternalProductionSection"},
            {index:2, label:"ContractSubmission.Exporting", type: NodeType.Section, data:"ExportingSection"},
            {index:3, label:"ContractSubmission.IndustryType", type: NodeType.Section, data:"IndustryTypeSection"}
          ]
        },
        {index:4, label:"ContractSubmission.FourthStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.FundingInfo", type: NodeType.Section, data:"FundingInfoSection"},
            {index:2, label:"ContractSubmission.TotalProjectManPower", type: NodeType.Section, data:"TotalProjectManPowerSection"},
            {index:3, label:"ContractSubmission.SaudiTotalProjectManPower", type: NodeType.Section, data:"SaudiTotalProjectManPowerSection"}
          ]
        },
        {index:5, label:"ContractSubmission.FifthStage", type:NodeType.Child, children:[{index:1,label:"ContractSubmission.FifthStage",type: NodeType.Section}]},
        {index:6, label:"ContractSubmission.SixthStage", type:NodeType.Child, children:
          [
            {index:1,label:"ContractSubmission.RequestedDimensionsWithoutSetbacks",type: NodeType.Section,data:"RequestedDimensionsWithoutSetbacks"},
            {index:2,label:"ContractSubmission.Areas",type: NodeType.Section, data:"RequestedAreas"},
            {index:3,label:"ContractSubmission.PowerAndWater",type: NodeType.Section, data:"PowerAndWater"}
          ]
        }
      ]
    }
  ];
  IndustrialReadyUnitsFormStructure: FormHierarchyBase[] = [
    {index:1,label:"ContractSubmission.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"ContractSubmission.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.RequestMainInfo", type: NodeType.Section, data:"RequestMainInfoSection"},
            {index:2, label:"ContractSubmission.AuthorizedSignatorySection", type: NodeType.Section, data:"AuthorizedSignatorySection"}
          ]
        },
        {index:2, label:"ContractSubmission.SecondStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.IndustryGoal", type: NodeType.Section, data:"IndustryGoalSection"},
            {index:2, label:"ContractSubmission.ProductsDetails", type: NodeType.Section, data:"ProductsSection"},
            {index:3, label:"ContractSubmission.RawMaterialsDetails", type: NodeType.Section, data:"RawMaterialsSection"},
            {index:4, label:"ContractSubmission.EquipmentDetails", type: NodeType.Section, data:"EquipmentSection"},
            {index:5, label:"ContractSubmission.ConsumersAgreementInfo", type: NodeType.Section, data:"ConsumersAgreementSection"},
            {index:6, label:"ContractSubmission.TechPartnerInfo", type: NodeType.Section, data:"TechPartnerInfoSection"},
          ]
        },
        {index:3, label:"ContractSubmission.ThirdStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.InternalProduction", type: NodeType.Section, data:"InternalProductionSection"},
            {index:2, label:"ContractSubmission.Exporting", type: NodeType.Section, data:"ExportingSection"},
            {index:3, label:"ContractSubmission.IndustryType", type: NodeType.Section, data:"IndustryTypeSection"}
          ]
        },
        {index:4, label:"ContractSubmission.FourthStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.FundingInfo", type: NodeType.Section, data:"FundingInfoSection"},
            {index:2, label:"ContractSubmission.TotalProjectManPower", type: NodeType.Section, data:"TotalProjectManPowerSection"},
            {index:3, label:"ContractSubmission.SaudiTotalProjectManPower", type: NodeType.Section, data:"SaudiTotalProjectManPowerSection"}
          ]
        },
        {index:5, label:"ContractSubmission.FifthStage", type:NodeType.Child, children:[{index:1,label:"ContractSubmission.FifthStage",type: NodeType.Section}]},
        {index:6, label:"ContractSubmission.SixthStage", type:NodeType.Child, children:
          [
            {index:1,label:"ContractSubmission.SiteNeeds",type: NodeType.Section,data:"SiteNeeds"},
            {index:2,label:"ContractSubmission.PowerAndWater",type: NodeType.Section, data:"PowerAndWater"}
          ]
        }
      ]
    }
  ];
  ServicesFormStructure: FormHierarchyBase[] = [
    {index:1,label:"ContractSubmission.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"ContractSubmission.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.RequestMainInfo", type: NodeType.Section, data:"RequestMainInfoSection"},
            {index:2, label:"ContractSubmission.AuthorizedSignatorySection", type: NodeType.Section, data:"AuthorizedSignatorySection"}
          ]
        },
        {index:2, label:"ContractSubmission.SecondStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.FundingInfo", type: NodeType.Section, data:"FundingInfo"}
          ]
        }
      ]
    }
  ];
  //#endregion
  //#region Forms
  @ViewChild('FirstStage') firstStage: NgForm;
  @ViewChild('SecondStage') secondStage: NgForm;
  @ViewChild('ThirdStage') thirdStage: NgForm;
  @ViewChild('FourthStage') fourthStage: NgForm;
  @ViewChild('FifthStage') fifthStage: NgForm;
  @ViewChild('SixthStageIndustrial') sixthStageIndustrial: NgForm;
  @ViewChild('SixthStageReadyUnits') sixthStageReadyUnits: NgForm;
  @ViewChild('SecondStageServicesAndLogistics') secondStageServicesAndLogistics: NgForm;
  @ViewChild('SecondStageLogistics') secondStageLogistics: NgForm;
  //#endregion

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
    this.mobilePattern = ConfigService.MobileValidationPattern;
  }
  

  //#region Implement eservice base
  public TApplicationNewInstance(): ContractSubmissionModel {
    return new ContractSubmissionModel();
  }
  public getQueryStringNames(): string[] {
    return ["Id"];
  }
  public getLookupTypes(): RetrieveOptionsRequest[] {
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
      {EntityName:"product",CachingKey:"product_Product",Mode: LookupRequestMode.Product},
      {EntityName:"ldv_ksacity",CachingKey:"ldv_ksacity_KSACity",Mode: LookupRequestMode.KSACity},
      {EntityName:"ldv_modonproduct",CachingKey:"ldv_modonproduct_ModonProducts",Mode: LookupRequestMode.ModonProducts},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_requestreason_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_requestreason"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_ldv_numberofunits_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_ldv_numberofunits"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_requestedarea_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_requestedarea"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_industrytype_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_industrytype"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_industrymethodology_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_industrymethodology"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_manufacturingtechnology_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_manufacturingtechnology"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_fundingsources_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_fundingsources"},
      {EntityName:"ldv_contractsubmissionproduct",CachingKey:"ldv_contractsubmissionproduct_ldv_productionunit_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_productionunit"},
      {EntityName:"ldv_previousfactory",CachingKey:"ldv_previousfactory_ldv_location_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_location"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_exporttingcountries_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_exporttingcountries"},
      {EntityName:"ldv_rawmaterial",CachingKey:"ldv_rawmaterial_ldv_measuringunit_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_measuringunit"},
    ];
  }
  public afterFormReady(): void {
    debugger;
    this.getDynamicLookups();
    this.setStages();
    this.setProductsDllsStatus();
    if(this.Application.Request.CRId && this.Application.Request.CRId.toString() !== Guid.EMPTY.toString())
      this.getChangesByCR(true);
    else
      this.Application.Request.CRId = null;
    if(this.Application.Request.ILId && this.Application.Request.ILId.toString() !== Guid.EMPTY.toString())
      this.getChangesByIL(true);
    else
      this.Application.Request.ILId = null;
    if(this.Application.Request.OldContractId && this.Application.Request.OldContractId.toString() === Guid.EMPTY.toString())
      this.Application.Request.OldContractId = null;
    if(this.Application.Request.IndustrialCityCode && this.Application.Request.IndustrialCityCode.toString() === Guid.EMPTY.toString())
      this.Application.Request.IndustrialCityCode = null;
      
    this.getAllIndustrialCities();
  }
  public setProductsDllsStatus()
  {
    if(this.Application && this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '6')
      this.isProductsEnabled = false;
    
    else
    {
      this.activatedRoute.queryParams.subscribe(p => {
        let type = p['Type'];
        if(type)
        {
          this.Application.Request.ProductMainFamilyId = type;
          this.isMainProductEnabled = false;
          this.getAllIndustrialCities();
        }
      })
    }
  }
  public preSaveApplication(): void { 
    // const { IDExpiryDays,IDExpiryMonths,IDExpiryYears,LetterDateDays,LetterDateMonths,LetterDateYears,...rest } = this.Application.Request;

    // this.Application.Request = rest;
    //this.setIslamicDate('Id');
    //this.setIslamicDate('Letter');
  }
  //#endregion
  
  public getProductMainFamily(): any[] {
    if (this.lookupService.lookupEntities['product_Product']) {
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === Guid.EMPTY.toString() || x['ParentProductId'] === null)
      return x;
    }
    else
     return [];
  }
  public getProductSubFamily(): any[] {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductMainFamilyId) {
      let productMainFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.Application.Request.ProductMainFamilyId)['Id'];
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productMainFamilyGuid)
      return x;
    }
    else
      return[];
  }
  public getProduct(): any[] {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductSubFamilyId) {
      let productSubFamilyGuid = this.lookupService.lookupEntities['product_Product'].find(x => x['Value'] === this.Application.Request.ProductSubFamilyId)['Id'];
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === productSubFamilyGuid)
      return x;
    }
    else
      return[];
  }
  
  public getChangesByCR(isAfterLoad: boolean = false)
  {
    this.pendingOnCREnabled = false;
    if(!isAfterLoad)
    {
      this.resetContacts();
      this.resetIL();
      this.ILQuestion();
      this.resetModonProducts();
    }

    this.getContact = true;
    let contacts = this.contractSubmissionService.getCRContacts(this.Application.Request.CRId);
    let contracts = this.contractSubmissionService.getCRContracts(this.Application.Request.CRId);
    let crDetailsAndILs = this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId);
    let CRContacts = this.contractSubmissionService.getContactsByCR(this.Application.Request.CRId);
    let CRModonProducts = this.contractSubmissionService.getCRModonProducts(this.Application.Request.CRId);

    forkJoin([contacts, contracts, crDetailsAndILs, CRContacts, CRModonProducts]).subscribe(results => {
      
      let contactsResult = results[0] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      let contractsResult = results[1] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      let crDetailsResult = results[2] as ApiGenericResponse<CRAndRelatedILsModel>;
      let crContactsResult = results[3] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      let CRModonProductsResult = results[4] as ApiGenericResponse<RetrieveOptionsRequest[]>;

      if(contactsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(contactsResult.Content);

      if(contractsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(contractsResult.Content);

      if(crDetailsResult.ResponseCode === ResponseCode.Success)
      {
        debugger;
        this.lookupService.handleRetrievedLookup(crDetailsResult.Content.ILs);
        this.CurrentCR = crDetailsResult.Content.CR;
      }

      if(crContactsResult.ResponseCode === ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(crContactsResult.Content);

      if (CRModonProductsResult.ResponseCode == ResponseCode.Success)
        this.lookupService.handleRetrievedLookup(CRModonProductsResult.Content);

      this.getContact = false;
      this.pendingOnCREnabled = true;
    });
  }
  public getChangesByIL(isAfterLoad: boolean = false)
  {
    this.pendingOnILEnabled = false;
    if(!isAfterLoad)
    {
      this.resetIndustrialCity();
    }
    this.contractSubmissionService.GetILDetailsAndRelatedIndustrialCities(this.Application.Request.ILId).subscribe(
      res => {
        if(res.ResponseCode === ResponseCode.Success)
        {
          this.CurrentIL = res.Content.IndustrialLicense;
          this.lookupService.handleRetrievedLookup(res.Content.IndustrialCities);
          this.pendingOnILEnabled = true;
        }
      }
    )
  }
  public getAllIndustrialCities()
  {
    debugger;
    this.pendingOnILEnabled = false;
    if(this.Application.Request && this.Application.Request.ProductMainFamilyId && (this.Application.Request.ProductMainFamilyId.toString() !== '1' || (this.Application.Request.ProductMainFamilyId.toString() === '1' && this.Application.Request.HasIl.toString() === 'false' && this.Application.Request.CRId)))
    {
      this.contractSubmissionService.getAllIndustrialCities().subscribe(
        res => {
          if(res.ResponseCode === ResponseCode.Success)
          {
            this.pendingOnILEnabled = true;
            this.lookupService.handleRetrievedLookup(res.Content);
          }
        }
      )
    }
  }

  public ILQuestion()
  {
    debugger;
    if (this.Application.Request.HasIl.toString() === 'false') {
      this.resetIL();
      this.getAllIndustrialCities();
    }
    else {
      this.resetModonProducts();
    }
  }
  public resetModonProducts() {
    this.Application.Request.ModonProducts = null;
    if (!this.Application.Request.CRId)
      this.lookupService.lookupEntities['ldv_modonproduct_ModonProducts'] = [];
  }
  public resetSubFamily() {
    
    if (this.Application && this.Application.Request && this.Application.Request.ProductSubFamilyId)
      this.Application.Request.ProductSubFamilyId = null;
     debugger; 
    this.resetProduct();
    this.resetIL();
    this.getAllIndustrialCities();
  }
  public resetProduct() {
    if (this.Application && this.Application.Request && this.Application.Request.ProductId)
      this.Application.Request.ProductId = null;
    if(this.Application && this.Application.Request && this.Application.Request.RequestReason)
    {
      this.Application.Request.RequestReason = null;
      this.requestReasonChange();
    }
    this.setStages();
  }
  public getFactoryDetails()
  {
    this.FactoryError = null;
    this.contractSubmissionService.GetFactoryDetails(this.factoryGridModel.FactoryCode).subscribe(
      res =>{
        if(res.ResponseCode === ResponseCode.Success)
        {
          this.factoryGridModel.Address=res.Content.Address;
          this.factoryGridModel.ArabicName=res.Content.ArabicName;
          this.factoryGridModel.EnglishName=res.Content.EnglishName;
          this.factoryGridModel.FactoryStatus=res.Content.FactoryStatus;
          this.factoryGridModel.MainActivity=res.Content.MainActivity;
          this.showDetails = true;
        }
        else
        {
          this.FactoryError = res.FriendlyResponseMessage;
          this.factoryGridModel.Address=null;
          this.factoryGridModel.ArabicName=null;
          this.factoryGridModel.EnglishName=null;
          this.factoryGridModel.FactoryStatus=null;
          this.factoryGridModel.MainActivity=null;
          this.showDetails = false;
        }
      },
      err =>{
        this.FactoryError = err.error.FriendlyResponseMessage;
        this.factoryGridModel.Address=null;
        this.factoryGridModel.ArabicName=null;
        this.factoryGridModel.EnglishName=null;
        this.factoryGridModel.FactoryStatus=null;
        this.factoryGridModel.MainActivity=null;
      }
    )
  }
  public resetFactory()
  {
    debugger;
    if(this.factoryGridModel)
    {
      if(this.factoryGridModel.Location.toString() === '2')
      {
        this.factoryGridModel.ContractNumberId = null
      }
      else if(this.factoryGridModel.Location.toString() === '1')
      {
        this.factoryGridModel.FactoryCode = null;
        this.factoryGridModel.Address = null;
        this.factoryGridModel.ArabicName = null;
        this.factoryGridModel.EnglishName = null;
        this.factoryGridModel.FactoryStatus = null;
        this.factoryGridModel.MainActivity = null;
      }
    }
  }
  public getSAGIADetails(fromNext: boolean)
  {
    this.SAGIAError = null;
    this.getSAGIA = false;
    if(this.Application.Request.SAGIANumber)
    {
      this.contractSubmissionService.GetSAGIADetails(this.Application.Request.SAGIANumber).subscribe(
        res =>{
          if(res.ResponseCode === ResponseCode.Success)
          {
            this.CurrentSAGIADetails = res.Content;
            this.getSAGIA = true;
            if(fromNext)
              this.Next();
          }
          else
          {
            this.SAGIAError = res.FriendlyResponseMessage;
            this.ActiveLevelTwo = 1;
            this.enablePrevious = false;
          }
        },
        err =>{
          this.SAGIAError = err.error.FriendlyResponseMessage;
        }
      )
    }
    else
      this.getSAGIA = true;
  }

  // public setIslamicDate(date: string)
  // {
  //   if(date === 'Id' && this.Application.Request.AuthorizedSignatoryIDExpiry)
  //   {
  //     this.Application.Request.IDExpiryDays = this.Application.Request.AuthorizedSignatoryIDExpiry.day;
  //     this.Application.Request.IDExpiryMonths = this.Application.Request.AuthorizedSignatoryIDExpiry.month;
  //     this.Application.Request.IDExpiryYears = this.Application.Request.AuthorizedSignatoryIDExpiry.year;
  //   }
  //   else if(date === 'Letter' && this.Application.Request.AuthorizationLetterDate)
  //   {
  //     this.Application.Request.LetterDateDays = this.Application.Request.AuthorizationLetterDate.day;
  //     this.Application.Request.LetterDateMonths = this.Application.Request.AuthorizationLetterDate.month;
  //     this.Application.Request.LetterDateYears = this.Application.Request.AuthorizationLetterDate.year;
  //   }
  // }
  public resetContacts()
  {
    this.Application.Request.Contacts = null;
    if(!this.Application.Request.CRId)
      this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']=[];
  }
  public resetIL()
  {
    if(this.Application.Request && this.Application.Request.ProductMainFamilyId === '1')
    {
      this.pendingOnILEnabled = false;
      this.resetIndustrialCity();
      this.Application.Request.ILId = null;
      if(!this.Application.Request.CRId)
        this.lookupService.lookupEntities['ldv_industriallicense_LookupWithId']=[];
    }
  }
  public requestReasonChange()
  {
    debugger;
    if(this.Application.Request.RequestReason && this.Application.Request.RequestReason.toString() !== '2')
    {
      this.Application.Request.OldContractId = null;
    }
  }
  public resetIndustrialCity()
  {
    this.Application.Request.IndustrialCityCode = null;
    if(!this.Application.Request.ILId)
      this.lookupService.lookupEntities['ldv_industrialcity_LookupWithId']=[]
  }
  
  public convertToObjectList(list: string[]): any[]
  {
    if(list)
      return list.map(x => this.convertStringToObject(x));
    else
      return[];
  }
  public convertToStringList(list: any[]): string[]
  {
    if(list)
      return list.map(x => this.convertToString(x));
    else
      return[];
  }
  public convertStringToObject(s: string)
  {
    return {"Name": s};
  }
  public convertToString(i: any)
  {
    return i.toString();
  }
  public getDynamicLookups() {
    this.contractSubmissionService.getDynamicLookups().subscribe(
      res => {
        
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }
  public setStages() {
    this.formStructure =[]
    if(this.Application.Request && this.Application.Request.ProductMainFamilyId === '1' && this.Application.Request.ProductSubFamilyId !== '2')
    {
      this.formStructure = Object.assign([],this.IndustrialFormStructure);
    }
    else if(this.Application.Request && this.Application.Request.ProductMainFamilyId === '1' && this.Application.Request.ProductSubFamilyId === '2')
    {
      this.formStructure = Object.assign([],this.IndustrialReadyUnitsFormStructure);
    }
    else
    {
      this.formStructure = Object.assign([],this.ServicesFormStructure);
    }
    this.addStructureParents();
   }
   addStructureParents()
   {
     if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '49')
     {
      this.formStructure.push({index:2,label:"ContractSubmission.Interview",type:NodeType.Parent})
      this.ActiveLevelOne = 2;
      this.ActiveLevelTwo = 1;
     }
    else if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode === '4')
    {
      this.formStructure.push({index:3,label:"ContractSubmission.PriceOffer",type:NodeType.Parent})
      this.ActiveLevelOne = 3;
      this.ActiveLevelTwo = 1;
    }
    
    if(this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== '1')
      this.formStructure.push({index:4,label:"ContractSubmission.RequestComments",type:NodeType.Parent})
   }
  Next() {
    debugger;
    this.submit = true;
    let isDocumentsValid = this.validateDocuments();
    
    this.setFocus();
    switch(this.ActiveLevelTwo)
    {
      case 1:
        debugger;
        if(!this.getSAGIA)
          this.getSAGIADetails(true);
        if(this.firstStage.valid && isDocumentsValid && !this.SAGIAError && this.getSAGIA)
        {
          this.submit = false;
          this.getSAGIA = false;
          // if(this.Application.Request.IsAuthorizedSignatory.toString() === 'false' || this.Application.Request.IsElectronicAuthorizedSignatory === 'true')
          // {
          //   this.Application.Documents.find(x => x.SectionName === 'AuthorizedSignatory').Files = [];
          // }
          this.ActiveLevelTwo++;
          if(this.Application.Request.ProductMainFamilyId !== '1')
            this.enableSubmit = true;
          
          this.enablePrevious = true;
        }
        return;
      case 2:
        debugger;
        if(this.Application.Request.ProductMainFamilyId === '1')
        {
          if(this.secondStage.valid && isDocumentsValid && this.ProductsLength() > 0 && this.RawMaterialsLength() > 0 && this.EquipmentLength() > 0)
          {
            this.submit = false;
            if(this.Application.Request.IsConsumersAgreement.toString() !== 'true')
            {
              this.Application.Documents.find(x => x.SectionName === 'ConsumersAgreement').Files = [];
            }
            if(this.Application.Request.HasTechPartnership.toString() !== 'true')
            {
              this.Application.Documents.find(x => x.SectionName === 'PartnershipDocument').Files = [];
            }
            this.ActiveLevelTwo++;
          }
          return;
        }
        if(this.Application.Request.ProductMainFamilyId === '7' || this.Application.Request.ProductMainFamilyId === '36')
        {
          if(this.secondStageServicesAndLogistics.valid && isDocumentsValid)
          {
            debugger;
            if(this.Application.Request.ProductMainFamilyId === '36' && this.Application.Request.ProductId !== '43' && !this.secondStageLogistics.valid)
              return;
            
            this.submitForm();
          }
        }
        return;
      case 3:
        if(this.Application.Request.IsInternalproduction.toString() === 'false')
        {
          this.thirdStage.controls['Areas'].setErrors(null);
          this.thirdStage.controls['Distributors'].setErrors(null);
        }
        if(this.thirdStage.valid && isDocumentsValid)
        {
          this.submit = false;
          if(this.Application.Request.IsRelatedToIndustry.toString() !== 'true')
          {
              this.Application.Documents.find(x => x.SectionName === 'RelationDocument').Files = [];
          }
          this.ActiveLevelTwo++;
        }
        return;
      case 4:
        if(this.fourthStage.valid && this.TotalPercentage() <= 100 && this.SDBPercentageValid())
        {
          this.submit = false;
          this.ActiveLevelTwo++;
        }
        return;
      case 5:
        if(this.fifthStage.valid &&((this.Application.Request.HaveOtherFactories.toString() === 'true' && this.FactoriesLength() > 0) || this.Application.Request.HaveOtherFactories.toString() === 'false') && !this.isFactoriesDuplication())
        {
          this.submit = false;
          this.enableSubmit = true;
          this.ActiveLevelTwo++;
        }
        return;
      case 6:
        if(this.Application.Request.ProductMainFamilyId === '1' && this.Application.Request.ProductSubFamilyId !== '2' && this.getTotalRequestedArea() >= 3000)
        {
          if(this.sixthStageIndustrial.valid)
            this.submitForm();
        }
        else if(this.Application.Request.ProductMainFamilyId === '1' && this.Application.Request.ProductSubFamilyId === '2')
        {
          if(this.sixthStageReadyUnits.valid)
            this.submitForm();
        }
        return;
    }
    //this.ActiveLevelTwo++;
  }

  Previous() {
    if (this.ActiveLevelTwo > 1)
    {
      window.scroll(0,0);
      this.enableSubmit = false;
      this.ActiveLevelTwo--;
    }
    if(this.ActiveLevelTwo === 1)
      this.enablePrevious = false;
  }

  onSelect = (node: FormHierarchyBase) => {
    switch (node.type) {
      case NodeType.Parent:
        this.ActiveLevelOne = node.index;
        break;
      case NodeType.Child:
        if(!this.Application.IsReadOnly)
        {
          if(node.index < this.ActiveLevelTwo)
          {
            this.ActiveLevelTwo = node.index
            this.enableSubmit = false;
          }
          // else
          //   this.Next();
          if(node.index === 1)
            this.enablePrevious = false;
        }
        else
        {
          
          this.ActiveLevelTwo = node.index
          if(node.index > 1)
            this.enablePrevious = true;
          else
            this.enablePrevious = false;
          if(node.index === this.formStructure[0].children.length)
            this.enableSubmit = true;
          else
            this.enableSubmit = false;
        }
        break;
    }
    SharedHelper.scrollToBody();
  }

  setFocus()
  {
    setTimeout(() => {
      
      const firstElementWithError = document.querySelector('.form-validation');
      if(firstElementWithError)
      {
        const firstElementWithErrorParent = document.querySelector('.form-validation').parentElement.parentElement;
        SharedHelper.scrollTo(firstElementWithErrorParent);
      }
      else
        SharedHelper.scrollToBody();
    }, 0);
  }

  public getContractsDDL()
  {
    if(this.lookupService.lookupEntities['ldv_contract_LookupWithId'] && this.Application.Request.Factories && this.Application.Request.Factories.length > 0)
    {
      return this.lookupService.lookupEntities['ldv_contract_LookupWithId'].filter(x => this.Application.Request.Factories.findIndex(y => y.ContractNumberId === x.Value) === -1);
    }
    else
      return this.lookupService.lookupEntities['ldv_contract_LookupWithId']

  }

  //#region Validation functions
  ProductsLength(): number{
    return this.Application.Request.ProductsDetails ? this.Application.Request.ProductsDetails.filter(x => !x.IsDeleted).length : 0;
  }
  FactoriesLength(): number{
    return this.Application.Request.Factories ? this.Application.Request.Factories.filter(x => !x.IsDeleted).length : 0;
  }
  RawMaterialsLength(): number{
    return this.Application.Request.RawMaterialsDetails ? this.Application.Request.RawMaterialsDetails.filter(x => !x.IsDeleted).length : 0;
  }
  EquipmentLength(): number{
    return this.Application.Request.EquipmentDetails ? this.Application.Request.EquipmentDetails.filter(x => !x.IsDeleted).length : 0;
  }
  getTotalInvestmentAmount(): number {
        return (this.Application.Request.InvestmentAmountValue ? Number(this.Application.Request.InvestmentAmountValue): 0)+
        (this.Application.Request.ConstructionAmountValue ? Number(this.Application.Request. ConstructionAmountValue): 0)+
        (this.Application.Request.EquipmentAmountValue ? Number(this.Application.Request.EquipmentAmountValue): 0);
  }
  SDBPercentageValid(): boolean{
    return ((this.Application.Request.SDBPercentage && Number(this.Application.Request.SDBPercentage) > 0 && Number(this.Application.Request.SDBPercentage)<76) || !this.Application.Request.SDBPercentage || this.convertToStringList(this.Application.Request.FundingSources).indexOf('1') === -1);
  }
  TotalPercentage(): number {
    return (this.Application.Request.SelfFundingPercentage && this.convertToStringList(this.Application.Request.FundingSources).indexOf('5') !== -1 ? Number(this.Application.Request.SelfFundingPercentage): 0)+
    (this.Application.Request.SDBPercentage && this.convertToStringList(this.Application.Request.FundingSources).indexOf('1') !== -1 ? Number(this.Application.Request. SDBPercentage): 0)+
    (this.Application.Request.LendingBankPercentage && this.convertToStringList(this.Application.Request.FundingSources).indexOf('3') !== -1 ? Number(this.Application.Request. LendingBankPercentage): 0)+
    (this.Application.Request.OtherFundingPercentage && this.convertToStringList(this.Application.Request.FundingSources).indexOf('4') !== -1 ? Number(this.Application.Request. OtherFundingPercentage): 0)+
    (this.Application.Request.BanksPercentage && this.convertToStringList(this.Application.Request.FundingSources).indexOf('2') !== -1 ? Number(this.Application.Request.BanksPercentage): 0);
  }
  getTotalManPower(): number {
    return (this.Application.Request.TechnicianNumber ? Number(this.Application.Request.TechnicianNumber): 0)+
    (this.Application.Request.AdministratorsNumber ? Number(this.Application.Request. AdministratorsNumber): 0)+
    (this.Application.Request.EngineersNumbers ? Number(this.Application.Request. EngineersNumbers): 0)+
    (this.Application.Request.OperatorsNumber ? Number(this.Application.Request.OperatorsNumber): 0);
  }
  getSaudiTotalManPower(): number {
    return (this.Application.Request.SaudiTechnicianNumber ? Number(this.Application.Request.SaudiTechnicianNumber): 0)+
    (this.Application.Request.SaudiAdministratorsNumber ? Number(this.Application.Request. SaudiAdministratorsNumber): 0)+
    (this.Application.Request.SaudiEngineersNumbers ? Number(this.Application.Request. SaudiEngineersNumbers): 0)+
    (this.Application.Request.SaudiOperatorsNumber ? Number(this.Application.Request.SaudiOperatorsNumber): 0);
  }
  getTotalRequestedArea(): number{
    return Math.floor(((this.Application.Request.RequestedAreaWithSetbacks ? Number(this.Application.Request.RequestedAreaWithSetbacks): 0)+
    (this.Application.Request.RawMaterialWarehouseArea ? Number(this.Application.Request. RawMaterialWarehouseArea): 0)+
    (this.Application.Request.FinalProductWarehouseArea ? Number(this.Application.Request. FinalProductWarehouseArea): 0)+
    (this.Application.Request.ProductionArea ? Number(this.Application.Request. ProductionArea): 0)+
    (this.Application.Request.ServicesArea ? Number(this.Application.Request.ServicesArea): 0))/ Number(0.6));
  }
  isFactoriesDuplication(): boolean{
    debugger;
    if(this.Application.Request.Factories && this.Application.Request.Factories.length > 1)
    {
      for (let i = 0; i < this.Application.Request.Factories.length; i++) {
        const item = this.Application.Request.Factories[i];
        if(item.Location.toString() === '2') //outside modon
        {
          if(this.Application.Request.Factories.filter(x => x.FactoryCode === item.FactoryCode).length > 1)
            return true;
        }
        else
        {
          if(this.Application.Request.Factories.filter(x => x.ContractNumberId === item.ContractNumberId).length > 1)
            return true;
        }
      }

    }
    return false;
  }

//#endregion
  
}
