import { Component, OnInit } from '@angular/core';
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
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { Product } from '../../interfaces/product';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { RawMaterial } from '../../interfaces/raw-material';
import { Equipment } from '../../interfaces/equipment';
import { Factory } from '../../interfaces/factory';
import { ImportingDetails } from '../../interfaces/importing-details';

@Component({
  selector: 'app-contract-submission',
  templateUrl: './contract-submission.component.html',
  styleUrls: ['./contract-submission.component.css']
})
export class ContractSubmissionComponent extends EServicesBase<ContractSubmissionModel> implements OnInit {

  constructor(public contractSubmissionService: ContractSubmissionService,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
    super(contractSubmissionService, lookupService, activatedRoute, alertService, translateService, modalService, router);
  }
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  activeFirstLevel: number = 1;
  activeSecondLevel: number = 2;
  selectedNode: FormHierarchyBase;
  submit: boolean = false;
  isLoading: boolean = true;
  getContact: boolean = false;
  submitText: string = "Next";
  yesText: string = "Yes";
  NoText: string = "No";
  productsGridcols: GridColumn[] = [
    {header:"ContractSubmission.FinalProduct",field:"FinalProduct",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.ProductionVolume",field:"ProductionVolume",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Unit",field:"Unit",typeConfig: {type:ColumnFieldType.Dropdown}},
    {header:"ContractSubmission.Symbol",field:"Symbol",typeConfig: {type:ColumnFieldType.Text}}
  ];
  productGridModel: Product={};
  rawMaterialGridcols: GridColumn[] = [
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown}},
    {header:"ContractSubmission.Type",field:"Type",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Quantity",field:"Quantity",typeConfig: {type:ColumnFieldType.Text}},
  ];
  rawMaterialGridModel: RawMaterial={};
  equipmentGridcols: GridColumn[] = [
    {header:"ContractSubmission.ProductionLinesNumber",field:"ProductionLinesNumber",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown}},
  ];
  equipmentGridModel: Equipment={};
  factoryGridcols: GridColumn[] = [
    {header:"ContractSubmission.bla",field:"bla",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.bla",field:"bla",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.bla",field:"bla",typeConfig: {type:ColumnFieldType.Dropdown}},
  ];
  factoryGridModel: Factory={};
  importingDetailsGridcols: GridColumn[] = [
    {header:"ContractSubmission.Source",field:"Source",typeConfig: {type:ColumnFieldType.Dropdown}},
    {header:"ContractSubmission.YearlyGoodVolume",field:"YearlyGoodVolume",typeConfig: {type:ColumnFieldType.Text}},
  ];
  importingDetailsGridModel: ImportingDetails={};
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search" // label thats displayed in search input,
    //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  
  formStructure: FormHierarchyBase[] = [
    {index:1,label:"ContractSubmission.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"ContractSubmission.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.RequestMainInfo", type: NodeType.Section, data:"RequestMainInfoSection"},
            {index:2, label:"ContractSubmission.AuthorizedSignatorySection", type: NodeType.Section, data:"AuthorizedSignatorySection"}
          ]
        },
      ]
    }
  ];
  IndustrialFormStructure: FormHierarchyBase[]=
  [
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
        {index:5, label:"ContractSubmission.FifthStage", type:NodeType.Child}
  ]
  ServicesFormStructure: FormHierarchyBase[]=
  [
    {index:2, label:"ContractSubmission.SecondStage", type:NodeType.Child, children:
          [
            {index:1, label:"ContractSubmission.FundingInfo", type: NodeType.Section, data:"FundingInfo"}
          ]
    }
  ]
  ngOnInit() {
  }


  protected TApplicationNewInstance(): ContractSubmissionModel {
    return new ContractSubmissionModel();
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    this.translateService.get('Yes').subscribe(res => {
      this.yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          this.NoText = res;
          let d: RetrieveOptionsRequest[] = [{CachingKey:"YesNo",EntityName:"",Mode:1,Result:[{Text: this.yesText, Value: true},{Text: this.NoText, Value: false}]}]
          this.lookupService.handleRetrievedLookup(d);
        }
      )
    })
    
    return [
      {EntityName:"product",CachingKey:"product_Product",Mode: LookupRequestMode.Product},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_requestreason_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_requestreason"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_industrytype_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_industrytype"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_industrymethodology_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_industrymethodology"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_manufacturingtechnology_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_manufacturingtechnology"},
      {EntityName:"ldv_contractsubmission",CachingKey:"ldv_contractsubmission_ldv_fundingsources_OptionSet",Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_fundingsources"}
    ];
  }
  protected getProductMainFamily(): any[] {
    debugger;
    if (this.lookupService.lookupEntities['product_Product']) {
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === Guid.EMPTY.toString() || x['ParentProductId'] === null)
      return x;
    }
  }
  protected getProductSubFamily(): any[] {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductMainFamilyId) {
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === this.Application.Request.ProductMainFamilyId.toString())
      return x;
    }
  }
  protected getProduct(): any[] {
    if (this.lookupService.lookupEntities['product_Product'] && this.Application.Request.ProductSubFamilyId) {
      var x = this.lookupService.lookupEntities['product_Product'].filter(x => x['ParentProductId'] === this.Application.Request.ProductSubFamilyId.toString())
      return x;
    }
  }
  protected getContacts() {
    if (!this.getContact) {
      this.getContact = true
      this.contractSubmissionService.getCRContacts(this.Application.Request.CRId).subscribe(
        res => {
          debugger;
          this.getContact = false;
          if (res.ResponseCode === ResponseCode.Success)
            this.lookupService.handleRetrievedLookup(res.Content);
        }
      )
    }
  }
  protected resetSubFamily() {
    debugger;
    if (this.Application && this.Application.Request && this.Application.Request.ProductSubFamilyId)
      this.Application.Request.ProductSubFamilyId = null;
    this.resetProduct();
  }
  protected resetProduct() {
    if (this.Application && this.Application.Request && this.Application.Request.ProductId)
      this.Application.Request.ProductId = null;
  }

  protected afterFormReady(): void {
    this.getDynamicLookups();
    this.setStages();
  }
  protected getDynamicLookups() {
    this.contractSubmissionService.getDynamicLookups().subscribe(
      res => {
        debugger;
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }
  protected setStages() {
    if(this.Application.Request && this.Application.Request.ProductMainFamilyId === '1')
    {
      this.IndustrialFormStructure.forEach(x => this.formStructure[0].children.push(x));
    }
    else if(this.Application.Request && this.Application.Request.ProductMainFamilyId !== '1')
    {
      this.ServicesFormStructure.forEach(x => this.formStructure[0].children.push(x));
    }
   }
  Next() {
    this.submit = true;
    this.ActiveLevelTwo++;
  }

  Previous() {
    if (this.ActiveLevelTwo > 1)
      this.ActiveLevelTwo--;
  }

  onSelect = (node: FormHierarchyBase) => {
    this.selectedNode = node;
  }
}
