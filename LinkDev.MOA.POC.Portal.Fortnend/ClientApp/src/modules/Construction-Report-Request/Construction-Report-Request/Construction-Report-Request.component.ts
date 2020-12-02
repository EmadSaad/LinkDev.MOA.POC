import { Component, OnInit } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { ConstructionReportRequestModel, CRMStatusCodeEnum } from './Model/ConstructionReportRequest';
import { ConstructionReportRequestService } from '../Service/Construction-Report-Request.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { ConstructionStageModel } from './Model/ConstructionStage';
import { ConstructionMonthlyReportModel } from './Model/ConstructionMonthlyReport';
import { BuildingLicenseRequestService } from 'src/modules/Building-License-Request/Service/building-license-request.service';
import { BuildingLicenseRequestModel } from 'src/modules/Building-License-Request/Model/BuildingLicenseRequestModel';
import { BuildingLicenseModel } from 'src/modules/Building-License-Request/Model/BuildingLicenseModel';
import { Title } from '@angular/platform-browser';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';

@Component({
  selector: 'app-Construction-Report-Request',
  templateUrl: './Construction-Report-Request.component.html',
  styleUrls: ['./Construction-Report-Request.component.css']
})
export class ConstructionReportRequestComponent extends EServicesBase<ConstructionReportRequestModel> implements OnInit {


  constructor(protected buildingLicenseService: BuildingLicenseRequestService,
    protected requestService: ConstructionReportRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService:Title) {
    super(requestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.configureMutliSelectConfiguration();
    this.titleService.setTitle("Modon | Construction report request");
  }




  /////////////////////////////// Variables ////////////////////////////////////////////////

  displayMessage:string;
  currentUser: number;


  //Info Viewer
  buildingLicense:BuildingLicenseModel;


  //CRMBPFStages
  IsDefaultStages: boolean = false;
  IsMonthlyReport: boolean = false;
  IsAdminReview: boolean = false;
  IsReportReviewed: boolean = false;


  // Side Bar
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  formStructure: FormHierarchyBase[] = [
    { index: 1, label: "ConstructionReportRequest.SubmitTimeSchedule", type: NodeType.Parent },
    { index: 2, label: "ConstructionReportRequest.SubmitMonthlyReport", type: NodeType.Parent },
    { index: 3, label: "ConstructionReportRequest.AllPreviousMonthlyReports", type: NodeType.Parent },
  ];



  //grid
  //ConstructionStages
  gridModel: ConstructionStageModel = new ConstructionStageModel();
  isPopUpOpened: boolean;
  ConstructionStageGridcols: GridColumn[] = [
    { header: "ConstructionStage.StageName", field: "StageName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.PlannedPercentage", field: "PlannedPercentage", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.ImplementationDuration", field: "ImplementationDuration", typeConfig: { type: ColumnFieldType.Text } }
  ];

  gridModelMonth: ConstructionStageModel = new ConstructionStageModel();
  isPopUpOpenedMonth: boolean;
  MonthConstructionStageGridcols: GridColumn[] = [
    { header: "ConstructionStage.StageName", field: "StageName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.PlannedPercentage", field: "PlannedPercentage", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.ImplementationDuration", field: "ImplementationDuration", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.CurrentMonthImplementationPercentage", field: "CurrentMonthImplementationPercentage", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionStage.LastMonthImplementationPercentage", field: "LastMonthImplementationPercentage", typeConfig: { type: ColumnFieldType.Text } }
  ];


  //Monthly Reports Grid

  gridModelMonthlyReports: ConstructionMonthlyReportModel = new ConstructionMonthlyReportModel();
  isPopUpOpenedMonthlyReports: boolean;
  MonthlyReportsConstructionStageGridcols: GridColumn[] = [
    { header: "ConstructionReportRequest.MonthlyReportNumber", field: "MonthlyReportNumber", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionReportRequest.TotalImplementedPercentage", field: "TotalImplementedPercentage", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ConstructionReportRequest.ReportDate", field: "CreatedOn", typeConfig: { type: ColumnFieldType.Text } }
  ];

  StagesisPopUpOpenedMonth:boolean;
  //lookup
  config = {}

  buildingLicOptions: any[];

  configureMutliSelectConfiguration() {
    this.config = this.createMultiSelectConfig();
  }
  createMultiSelectConfig(): any {
    var config =
    {
      search: true,
      displayKey: "Text", //if objects array passed which key to be displayed defaults to description
      placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
    }
    setTimeout(() => {
      this.translateService.get("SELECT").subscribe(msg => {
        config.placeholder = msg;
      });
      return config;
    });

    setTimeout(() => {
      this.translateService.get("NO_RESULT_FOUND").subscribe(msg => {
        config.noResultsFound = msg;
      });
      return config;
    });

    setTimeout(() => {
      this.translateService.get("SEARCH").subscribe(msg => {
        config.searchPlaceholder = msg;
      });
      return config;
    });

    return config;

    // this.minDate.setDate(this.todayDate.getDate() - 1);
  }


  //////////////////////////////////////////////////////////////////////
  //////////////////////////// Enums ///////////////////////////////////



  CRMStatusCode = CRMStatusCodeEnum;



  ///////////////////////////////////////////////////////////////////////
  protected TApplicationNewInstance(): ConstructionReportRequestModel {
    return new ConstructionReportRequestModel();
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [


      { EntityName: "account", CachingKey: "account_Account", Mode: LookupRequestMode.Account },
      { EntityName: "ldv_buildinglicense", CachingKey: "ldv_buildinglicense_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_LookupWithName", Mode: LookupRequestMode.LookupWithName },

    ];
  }

  ngOnInit() {

    this.LoadLookups();

  }






  ///////////////////////// Functions //////////////////////////////////////

  //Side Bar
  onSelect = (node: FormHierarchyBase) => {
    // debugger;
    // this.selectedNode = node;
    this.ActiveLevelOne = node.index;
  }


  protected afterFormReady(): void {
    //debugger;
    if (this.Application && this.Application.Request && this.Application.ApplicationHeader) {

      this.setStages();
      this.getBuildingLicenseDetails();



      this.setPercentage();



      if(this.Application.Request.BuildingLicense){
        this.buildingLicOptions = [{ Text: this.Application.Request.BuildingLicense.Name, Value: this.Application.Request.BuildingLicense.Value}]
      }
debugger;
      if(this.Application.Request.ConsultingOfficeId || this.Application.Request.CRId){
        this.GetCurrentUserType(this.Application.Request.CRId.toString());
      }

    }
  }

  private LoadLookups() {
    var lookups = this.getLookupTypes();
    // 
    this.lookupService.loadLookups(lookups).subscribe(result => {
      // 
      var isLookupsLoaded = result;

    });
  }

  setPercentage(){
    //debugger;
    if(this.Application.Request.ConstructionMonthlyReport && this.Application.Request.ConstructionMonthlyReport.length > 0){
      this.Application.Request.ConstructionMonthlyReport.forEach(element => {
          element.TotalImplementedPercentage = element.TotalImplementedPercentage + "%";
          //debugger;

          

        });
    }

    if(this.Application.Request.CurrentConstructionMonthlyReport &&
       this.Application.Request.CurrentConstructionMonthlyReport.ConstructionStages && 
       this.Application.Request.CurrentConstructionMonthlyReport.ConstructionStages.length > 0){

      this.Application.Request.CurrentConstructionMonthlyReport.ConstructionStages.forEach(stage=>{
        if(!stage.CurrentMonthImplementationPercentage){
          stage.CurrentMonthImplementationPercentage = "0";
        }
      });
    }


  }
  private setStages() {

    if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingDefaultStages.toString()) {
      this.IsDefaultStages = true;
    }


    if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingMonthlyReport.toString()) {
      this.ActiveLevelOne = 2;
      this.IsMonthlyReport = true;
      this.Application.Request.ConstructionMonthlyReport.pop();
    } else {
      this.formStructure.splice(1, 1);
    }


    if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.AdminReviewOnMonthlyReport.toString()) {
      this.IsAdminReview = true;
    }




    debugger;
    if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.ReportReviewed.toString()) {
      this.IsReportReviewed = true;
    }





  }

SubmitStages(){
//debugger;
this.displayMessage = "";
  if(this.IsDefaultStages){
    this.SubmitDefaultStages();
  }else if(this.IsMonthlyReport){
    this.SubmitMonthlyReport();
  }
}

SaveAsDraft(){
//debugger;
this.displayMessage = "";
this.Application.Request.IsSubmitted = false;

if(this.IsDefaultStages){

  var valid = this.ValidatePlannedPercentageonDraft();
  if(valid){
  
      this.saveApplication();
  }else{
    this.translateService.get("ConstructionStage.DisplayMessage100and0Draft").subscribe(msg => {
      this.displayMessage = msg;
      window.scroll(0,0);
      // setTimeout(() => {
      //   this.displayMessage = "";
      // },4500)
    });
  }
}else if(this.IsMonthlyReport){
  var valid = this.ValidateMonthlyReport();
    if(valid){
      
      this.saveApplication();
    }else{
      this.translateService.get("ConstructionStage.DisplayMessage100and0").subscribe(msg => {
        this.displayMessage = msg;
        window.scroll(0,0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
    }

}

}




  SubmitDefaultStages() {

    var valid = this.ValidatePlannedPercentage();
    var ValidImplement = this.ValidateImplementationDuration()
    //debugger;
    if (valid) {
      if(ValidImplement){
        this.Application.Request.IsSubmitted = true;
        this.submitForm();
      }
      else{
        this.translateService.get("ConstructionStage.FillInImplementationDuration").subscribe(msg => {
          this.displayMessage = msg;
          window.scroll(0,0);
        });
      }
      
    }else{
        //TODO Display Message to inform user about 100 sum
        this.translateService.get("ConstructionStage.DisplayMessageMorethan100").subscribe(msg => {
          this.displayMessage = msg;
          window.scroll(0,0);
          // setTimeout(() => {
          //   this.displayMessage = "";
          // },4500)

        });
    }
  }


  SubmitMonthlyReport(){
    var valid = this.ValidateMonthlyReport();
    //TODO Check if he hasn't put in some values for current percentage
    // var hasValue = this.ValidateEmptyMonthlyReport();
    if(valid){
      this.Application.Request.IsSubmitted = true;
      this.submitForm();
    }else{
      //TODO Display Message to inform user that percentage must be between 0 & 100
      this.translateService.get("ConstructionStage.DisplayMessage100and0").subscribe(msg => {
        this.displayMessage = msg;
        window.scroll(0,0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
    }
  }

  ValidatePlannedPercentage(): boolean {
    var valid = false;
    var sum = 0;
    this.Application.Request.ConstructionStages.forEach(stage => {
      var temp = Number.parseInt(stage.PlannedPercentage);
      sum += temp
    });

    if (sum == 100) {
      valid = true;
    }

    return valid;


  }

  ValidatePlannedPercentageonDraft(): boolean {
    var valid = true;
    this.Application.Request.ConstructionStages.forEach(stage => {
      var temp = Number.parseInt(stage.PlannedPercentage);
      if(temp>100 || temp<0){
        valid = false;
      }
      
    });

    return valid;


  }


  ValidateMonthlyReport():boolean{
    var valid = true;
    this.Application.Request.CurrentConstructionMonthlyReport.ConstructionStages.forEach(stage => {
      var temp = Number.parseInt(stage.CurrentMonthImplementationPercentage);
      if(temp>100 || temp<0){
        valid = false;
      }
    });
    return valid;
  }

  ValidateEmptyMonthlyReport():boolean{
    var valid = true;
    this.Application.Request.CurrentConstructionMonthlyReport.ConstructionStages.forEach(stage => {
      if(stage.CurrentMonthImplementationPercentage == null ||  stage.CurrentMonthImplementationPercentage == undefined){
        valid = false;
      }
    });
    return valid;
  }


  ValidateImplementationDuration(){
    var valid = true;
    this.Application.Request.ConstructionStages.forEach(stage => {
      if(stage.ImplementationDuration == null || stage.ImplementationDuration == undefined  ){
        valid = false;
      }
    });
    return valid;
  }


  getBuildingLicenseDetails(){
      this.buildingLicenseService.GetBuildingLicenseDetails(this.Application.Request.BuildingLicenseId.toString()).subscribe(res =>{
        this.buildingLicense = res.Content;
        //debugger;
      });
  }



  protected GetCurrentUserType(CRId: string,counter = 0) {
    

    this.requestService.GetCurrentUserType(CRId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          this.currentUser = res.Content;
          //console.log(this.currentUser);
          // //None
          if (this.currentUser == -1 && counter < 1) {
            counter++;
            this.GetCurrentUserType(this.Application.Request.ConsultingOfficeId.toString(),counter);
          }
          // //Investor
          // else if (this.currentUser == 0) {
            
          // }
          // //Office
          // else if (this.currentUser == 1) {
            
          // }
        }
      }
    )




  }
  Next(){
    
  }

  Previous(){

  }

}
