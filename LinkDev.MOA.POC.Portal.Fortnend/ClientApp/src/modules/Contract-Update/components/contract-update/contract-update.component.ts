import { Component, OnInit, ViewChild } from '@angular/core';
import { EServicesBase } from '../../../shared/EService-Base/eService-base';
import { LookupService } from '../../../shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { ContractUpdateModel } from '../../Interfaces/Contract-Update-Model';
import { ContractUpdateService } from '../../Services/contract-update.service'
import { FormHierarchyBase } from '../../../shared/form-guide/form-hierarchy/form-hierarchy-model';
import { ApiGenericResponse, ResponseCode } from '../../../shared/Models/api-generic-response';
import { NodeType } from '../../../shared/form-guide/form-hierarchy/node-type-enum';
import { PortalStatusCode } from '../../../Contract-Edit/enums/portal-status-code.enum';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { debug } from 'console';
import { NgForm, NgModel } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GridColumn, ColumnFieldType } from '../../../shared/form-guide/grid/models/GridColumn';
import { CRVersion } from '../../../shared/Common/CR-version/interfaces/cr-version-model';
import { ILVersion } from '../../../shared/Common/IL-version/interfaces/il-version-model';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent extends EServicesBase<ContractUpdateModel> implements OnInit {

  yesText: string = "Yes";
  NoText: string = "No";
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };
  submit: boolean;
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  IsAreaUpdated: boolean;

  CRVersionModel: CRVersion;
  ILVersionModel: ILVersion;


  ActivitiesGridcols: GridColumn[] = [
    { header: 'SplitRequest.ActivityName', field: 'ActivityName', typeConfig: { type: ColumnFieldType.Text } },
    { header: 'SplitRequest.ClassName', field: 'ClassName', typeConfig: { type: ColumnFieldType.Text } },
    { header: 'SplitRequest.DivisionName', field: 'DivisionName', typeConfig: { type: ColumnFieldType.Text } }
  ];
  OwnerGridcols: GridColumn[] = [
    { header: 'SplitRequest.OwnerName', field: 'OwnerName', typeConfig: { type: ColumnFieldType.Text } },
    { header: 'SplitRequest.SharingPercentage', field: 'SharingPercentage', typeConfig: { type: ColumnFieldType.Text } }
  ];

  ILProductsgridcols: GridColumn[] = [
    { header: 'SplitRequest.Name', field: 'Name', typeConfig: { type: ColumnFieldType.Text } }
  ];

  ILActivityGridcols: GridColumn[] = [
    { header: 'SplitRequest.Name', field: 'Name', typeConfig: { type: ColumnFieldType.Text } }
  ];

  @ViewChild('ContractForm') ContractForm: NgForm;

  constructor(public ContractUpdateService: ContractUpdateService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService: Title,
    protected router: Router) {
    super(ContractUpdateService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.titleService.setTitle("Modon | Update Contract");
    this.submit = false;
    this.IsAreaUpdated = false;

    this.CRVersionModel = {
      Id: '', CRActivity: '', Owners: [], Activities: [], Name: '', IssuanceCity: '',
      IssueDate: '', ExpiryDate: '', CRType: '', CRName: ''
    };

    this.ILVersionModel = {
      ILName: '', ILNumber: '', ILActivities: [], ILProducts: '', ILProductsList: [],
      ILSource: '', ILStatus: '', ILId: '', ILType: '', InvestmentType: '', OwnerName: '', FactoryName: '', CityName: '',
      IssueDate: '', ExpiryDate: '', CRName: ''
    };
  }

  ngOnInit() {
    //SharedHelper.hideLoader();
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
                )
              });
          });
      });
  }

  //#region Implement eservice base
  public TApplicationNewInstance(): ContractUpdateModel {
    return new ContractUpdateModel();
  }
  public getQueryStringNames(): string[] {
    return ["Id"];
  }

  public afterFormReady(): void {
    debugger;

    if (!this.Application.Request.Id) {
      this.Application.Request.ContractId =
        this.Application.Request.CRId = null;
    }

    if (this.Application.Request.ContractId == Guid.EMPTY.toString()) {
      this.Application.Request.ContractId = null;
    }

    if (this.Application.Request.NewCRId == Guid.EMPTY.toString()) {
      this.Application.Request.NewCRId = null;
    }

    if (this.Application.Request.NewILId == Guid.EMPTY.toString()) {
      this.Application.Request.NewILId = null;
    }

    //this.getDynamicLookups();
    // Check status and add second tab for request comments
    if (this.Application.ApplicationHeader && this.Application.ApplicationHeader.PortalStatusCode !== PortalStatusCode.Submitted) {
      this.formStructure.push({ index: 2, label: 'UpdateContract.RequestComments', type: NodeType.Parent });
    }
  }

  public getDynamicLookups() {
    this.ContractUpdateService.getDynamicLookups().subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          this.lookupService.handleRetrievedLookup(res.Content);
          console.log(this.lookupService.lookupEntities);
        }
      });
  }

  public getLookupTypes(): RetrieveOptionsRequest[] {
    this.translateService.get('Yes').subscribe(res => {
      var yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          var NoText = res;
          let twoOptionSet: RetrieveOptionsRequest[] = [{ CachingKey: "YesNo", EntityName: "", Mode: 1, Result: [{ Text: yesText, Value: 'true' }, { Text: NoText, Value: 'false' }] }]
          this.lookupService.handleRetrievedLookup(twoOptionSet);
        }
      )
    })

    return [
      { EntityName: 'ldv_ldv_updaterequest', CachingKey: 'ldv_ldv_updaterequest_ldv_updatetype_OptionSet', Mode: LookupRequestMode.OptionSet, OptionSetName: 'ldv_updatetype' },
    ];
  }


  formStructure: FormHierarchyBase[] = [
    {
      index: 1, label: "UpdateContract.RequestDetails", type: NodeType.Parent, children:
        [
          {
            index: 1, label: "UpdateContract.FirstStage", type: NodeType.Child, children:
              [
                { index: 1, label: "UpdateContract.ContractInfo", type: NodeType.Section, data: "RequestMainInfoSection" },
                { index: 2, label: "UpdateContract.UpdatedContractInfo", type: NodeType.Section, data: "RequestSubbMainInfoSection" }
              ]
          }
        ]
    }
  ];

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

  submitRequest() {
    this.setFocus();
    this.submit = true;
    debugger;
    console.log(this.Application.Request);
    this.submit = true;
    let isDocumentsValid = this.validateDocuments();
    if (this.ContractForm.valid && isDocumentsValid) {
      this.submitForm();
    }


  }

  public onCRChange(IsFormLoad) {
    //IsFormLoad --> onload false onchange true

    debugger;
    const IL = this.ContractUpdateService.GetFinalILsByCR(this.Application.Request.NewCRId);
    const products = this.ContractUpdateService.GetProductsRelatedToCR(this.Application.Request.NewCRId);

    forkJoin([IL, products]).subscribe(results => {

      const ILResult = results[0] as ApiGenericResponse<RetrieveOptionsRequest[]>;
      const productsResult = results[1] as ApiGenericResponse<RetrieveOptionsRequest[]>;;

      if (ILResult.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(ILResult.Content);
      }

      if (productsResult.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(productsResult.Content);
      }
      console.log(this.lookupService);
    });
  }
  onOldCRChange(IsFormLoad) {
    debugger;
    if (!IsFormLoad) {
      if ((this.Application.Request.UpdateCurrentCRIL).toString() == 'true' && this.Application.Request.UpdateType_ == "2") {
        this.Application.Request.NewCRId = this.Application.Request.CRId;
        this.onCRChange(true);
      }
    }
    else {
      if ((this.Application.Request.UpdateCurrentCRIL).toString() == 'true' && this.Application.Request.UpdateType_ == "2")
        this.onCRChange(true);
    }
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

  OnChangeUpdateCurrentCRIL() {
    if ((this.Application.Request.UpdateCurrentCRIL).toString() == 'false') {
      //// reset fields
      this.Application.Request.NewCRId = null;
      if ((this.Application.Request.HasIl).toString() == 'true')
        this.Application.Request.NewILId = null;
      else
        this.Application.Request.Products = null;
      this.Application.Request.HasIl = null;
    }
  }

  setFocus() {
    setTimeout(() => {
      //document.querySelectorAll(".required.class2");
      const firstElementWithError = document.querySelector('.required');
      if (firstElementWithError) {
        const firstElementWithErrorParent = document.querySelector('.required').parentElement.parentElement;
        SharedHelper.scrollTo(firstElementWithErrorParent);
      }
      else
        SharedHelper.scrollToBody();
    }, 0);
  }

}


