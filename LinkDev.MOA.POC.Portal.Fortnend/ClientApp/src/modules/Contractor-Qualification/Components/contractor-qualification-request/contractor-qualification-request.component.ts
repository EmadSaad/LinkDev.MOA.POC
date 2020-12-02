import { Component, OnInit, ViewChild } from '@angular/core';

import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { ResponseCode, ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { Title } from '@angular/platform-browser';
import{ContractorQualificationRequestModel, CRMStatusCodeEnum} from '../../models/Contractor-Qualification-Request-Model'
import { ContractorQualificationRequestService } from '../../Service/Contractor-qualification-request.service';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { Projects } from '../../models/Projects';
import { EntityReferenceItem } from 'src/modules/shared/Models/EntityReferenceItem.model';
import { ldv_certificatestatus, ldv_certificatetype } from '../../models/ContractorCertificateModel';
import { ConsultingOfficeQualificationService } from 'src/modules/Consulting-Office-Qualification/Service/ConsultingOfficeQualification.service';

@Component({
  selector: 'app-contractor-qualification-request',
  templateUrl: './contractor-qualification-request.component.html',
  styleUrls: ['./contractor-qualification-request.component.css']
})
export class ContractorQualificationRequestComponent extends EServicesBase<ContractorQualificationRequestModel> implements OnInit {
 //properties
requestTypeCode:string;
showOldCertificateLookup:boolean = false;
isAlwaysReadOnlyAfterSubmit:boolean = false;
isDraftSatgeReadOnly:boolean = false;
  Qualifyrenewbuildingguid: string = "f8d551f7-01b0-ea11-aa2c-000d3aab0880";
  Qualifyrenewsafetyguid: string = "a2c46d31-02b0-ea11-aa2c-000d3aab0880";
  ChangeClassification:string = "5cf6eb62-02b0-ea11-aa2c-000d3aab0880";
  CurrentCR: CRModel={};
  isCurrentCR: boolean = false;
  getContact: boolean = false;
  isSubmit:boolean=false;
  isSaveDraft:boolean=false;
  isOldCertificateData:boolean = false;
  requestValidMsg :string;
  IsRequestValid:boolean = true;
  CertificateStatus:string;
  CertificateType:string;
  contactsList: ContactDetails[];
  projectsList:Projects[];
  // Grid
  gridModel: ContactDetails;
  prModel:Projects[];
  projectModel :Projects={};
  gridconfig = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search" // label thats displayed in search input,
    //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  // CurrentContract: ContractInfoModel;
  
  // contactDetailsfromContract: ContactDetails[];
  gridcols: GridColumn[] = [
    { header: "PlanApproval.Name", field: "Name", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Email", field: "Email", typeConfig: { type: ColumnFieldType.Text } },
    { header: "PlanApproval.Mobile", field: "Mobile", typeConfig: { type: ColumnFieldType.Text } }
  ];

  pr_gridcols: GridColumn[] = [
    { header: "ContractorQualification.Name", field: "ProjectName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractorQualification.Investor", field: "InvestorName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "ContractorQualification.Date", field: "ProjectDate", typeConfig: { type: ColumnFieldType.Date } }
  ];
  constructor(public RequestService: ContractorQualificationRequestService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,
    protected router: Router,
    public ConsultingQualification: ConsultingOfficeQualificationService) {
    super(RequestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.configureMutliSelectConfiguration(); 
    this.titleService.setTitle("Modon | Contractor Qualification");
    
  }
  //EServicesBase inherited Methods
  protected TApplicationNewInstance(): ContractorQualificationRequestModel {
    return new ContractorQualificationRequestModel
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }

  //Retrieve lookups
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [

      { EntityName: "ldv_contractorcertificate", CachingKey: "ldv_contractorcertificate_ldv_certificatestatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificatestatus" },
      { EntityName: "ldv_contractorcertificate", CachingKey: "ldv_contractorcertificate_ldv_certificatetype_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificatetype" },
      { EntityName: "ldv_service", CachingKey: "ldv_service_ContractorRequestTypes", Mode: LookupRequestMode.ContractorRequestTypes },
      { EntityName: "ldv_ksacity", CachingKey: "ldv_ksacity_KSACity", Mode: LookupRequestMode.KSACity },
      { EntityName: "ldv_contractorratingcategory", CachingKey: "ldv_contractorratingcategory_ContractorOldRatingCategory", Mode: LookupRequestMode.ContractorOldRatingCategory },

    ];
  }
  private LoadLookups() {
    var lookups = this.getLookupTypes();
    // 
    this.lookupService.loadLookups(lookups).subscribe(result => {
      // 
      var isLookupsLoaded = result;

    });
  }
//Dropdown Lookups Configuration
  config = {}
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

  ngOnInit() {
    // Fill Grid
    debugger;
 if (this.Application.Request.Contacts != null &&
  this.Application.Request.Contacts.length > 0 &&
  this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
  this.onContactChange(this.Application.Request.Contacts);
}
// if (this.Application.Request.Projects != null &&
//   this.Application.Request.Projects.length > 0 &&
//   this.lookupService.lookupEntities['ldv_project_Projects']) {
//   this.GetRequestProjects(this.Application.Request.Id);
// }
    this.loadLookups();
    this.GetCRsByTypeByContactId(7);//enum
   
   
  }
  cRChanged(event:any)
  {
    
    this.GetContactDetailsByCR();
    //this.ValidateRequest();
    if (this.Application.Request.CRId) {
      this.getCRInfo();
    }
    if(this.requestTypeCode != "" && this.Application.Request.CRId){
      if(this.requestTypeCode == this.ChangeClassification || this.requestTypeCode == this.Qualifyrenewbuildingguid || this.requestTypeCode == this.Qualifyrenewsafetyguid){
       // this.showOldCertificateLookup = true;
        this.GetOldCertificateByCRIdandRequestTypeId(this.Application.Request.CRId,this.requestTypeCode);
        }
        else{
          this.showOldCertificateLookup = false;

        }
       
        this.ConsultingQualification.GetDocumentSettingByQualificationType(Guid.parse(this.Application.Request.RequestTypeId)).subscribe(
          res => {
            if (res.ResponseCode === ResponseCode.Success) {
              
              if (res.Content) {
                this.Application.Documents = res.Content;
              } 
            }
            
          }
          );
       // this.ValidateRequest();
    }
  }
  
  protected afterFormReady(): void {
    debugger;
    console.log(this.Application.Documents);
    this.GetContactDetailsByCR();
    this.SetStages();
    if (this.Application.Request.CRId) {
      this.getCRInfo();
    }
    debugger;
    if(this.Application.Request.GeneratedCertificate != null){

    
   let CertificateStatusOS = this.lookupService.lookupEntities["ldv_contractorcertificate_ldv_certificatestatus_OptionSet"];
   let CertificateTypeOS = this.lookupService.lookupEntities["ldv_contractorcertificate_ldv_certificatetype_OptionSet"];
   this.CertificateStatus = CertificateStatusOS.filter(c => c.Value == this.Application.Request.GeneratedCertificate.CertificateStatus)[0] ? CertificateStatusOS.filter(c => c.Value == this.Application.Request.GeneratedCertificate.CertificateStatus)[0].Text : null;
   this.CertificateType = CertificateTypeOS.filter(c => c.Value == this.Application.Request.GeneratedCertificate.CertificateType)[0] ? CertificateTypeOS.filter(c => c.Value == this.Application.Request.GeneratedCertificate.CertificateType)[0].Text : null;
   // console.log(this.Application.Request.Projects);
   // this.GetRequestProjects(this.Application.Request.Id);
    //console.log(this.Application.Request.Id);
  }
  // if(this.Application.ApplicationHeader.PortalStatusCode == "57"){
  //   this.ActiveLevelOne = 2;
  // }
  }

  private SetStages() {
    debugger;
    if(this.Application.ApplicationHeader != null){
    if(this.Application.Request.IsFeesPaid || this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingonContractorToPay.toString()){
             //push Payment Tab
         this.formStructure.push(
          { index: 2, label: "ContractorQualification.PaymentStage", type: NodeType.Parent }
          );
       }

   if(this.Application.Request.GeneratedCertificate){
     // Push Generated Certificate
     this.formStructure.push(
      { index: 3, label: "ContractorQualification.CertificateDetails", type: NodeType.Parent }
       );
   }
  }
  }
// Side Bar
ActiveLevelOne: number = 1;
ActiveLevelTwo: number = 1;
formStructure: FormHierarchyBase[] = [
  { index: 1, label: "ContractorQualification.MainRequestInformation", type: NodeType.Parent },
  { index: 4, label: "ContractorQualification.ModonComments", type: NodeType.Parent },

];

//Side Bar
onSelect = (node: FormHierarchyBase) => {
  // debugger;
  // this.selectedNode = node;
  this.ActiveLevelOne = node.index;
}
//get CR of type Contractors
  protected GetCRsByTypeByContactId(crType: number) {
    this.RequestService.GetCRsByTypeByContactId(crType).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
      }
    )
  }

  OnChangeOldCertificate(event:any){
    //this.ValidateRequest();
   this.BindOldCertificateData(event);
  }
  public CROrQualificationTypeChanged() {
    if(this.Application.Request.CRId != null && this.Application.Request.RequestTypeId != null){
      this.ValidateRequest();
    }
    else{
      this.requestValidMsg = "";
    }
  }
 OnChangeRequestType(event:any){
 this.requestTypeCode = event; 
 this.Application.Request.OldQualificationCertificateId = "";
debugger;
if(this.requestTypeCode == this.ChangeClassification ||this.requestTypeCode == this.Qualifyrenewbuildingguid || this.requestTypeCode == this.Qualifyrenewsafetyguid){
//this.showOldCertificateLookup = true;
this.GetOldCertificateByCRIdandRequestTypeId(this.Application.Request.CRId,this.requestTypeCode);
}
else{
  this.showOldCertificateLookup = false;

}


this.ConsultingQualification.GetDocumentSettingByQualificationType(Guid.parse(this.Application.Request.RequestTypeId)).subscribe(
  res => {
    if (res.ResponseCode === ResponseCode.Success) {
      
      if (res.Content) {
        this.Application.Documents = res.Content;
      } 
    }
    
  }
  );
//this.ValidateRequest();
}

onContactChange(contacts: string[]) {
  this.contactsList = [];
  // contacts.forEach(contactId => {
  //   this.contactsList.push((this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'])
  //   .filter(
  //     ele =>ele['Value'] == contactId) as ContactDetails)
  // });
  for (let i = 0; i < contacts.length; i++) {
    const contactId = contacts[i];
    for (let j = 0; j < this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'].length; j++) {
      const contactDet = this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'][j];
     console.log("test "+ contactDet['Value']+"---"+contactId );
      if (contactDet['Value'] == contactId) {
        this.contactsList.push(contactDet);
       
      }
    }

    this.contactsList[i].IsDeleted = false;//need to ask mhrez
    this.contactsList[i].IsUpdated = false;
  }
}

BindProjects(projects:string[]){
  debugger;
  this.projectsList = [];
  for (let i = 0; i < projects.length; i++) {
    const contactId = projects[i];
    for (let j = 0; j < this.lookupService.lookupEntities['ldv_project_Projects'].length; j++) {
      const contactDet = this.lookupService.lookupEntities['ldv_project_Projects'][j];
     console.log("test "+ contactDet['Value']+"---"+contactId );
      if (contactDet['Value'] == contactId) {
        this.projectsList.push(contactDet);
       
      }
    }

    this.projectsList[i].IsDeleted = false;//need to ask mhrez
    this.projectsList[i].IsUpdated = false;
    }
}
protected GetContactDetailsByCR() {
  if (!this.getContact) {
    this.getContact = true
    this.RequestService.getCRContacts(this.Application.Request.CRId).subscribe(
      res => {
        this.getContact = false;
        if (res.ResponseCode === ResponseCode.Success) {

          this.lookupService.handleRetrievedLookup(res.Content);
          if (this.Application.Request.Contacts != null &&
            this.Application.Request.Contacts.length > 0) {
            this.onContactChange(this.Application.Request.Contacts);
          }
        }

      }
    )
  }
}

protected getCRInfo() {
    
  this.isCurrentCR = true;
  this.RequestService.GetCRDetailsAndRelatedILs(this.Application.Request.CRId).subscribe(results => {
    if (results.ResponseCode === ResponseCode.Success) {
      //debugger;
      if(this.Application.Request.CRId != null){
        this.CurrentCR = results.Content.CR;
      }

    }
    this.isCurrentCR = false;

  });
}

protected GetOldCertificateByCRIdandRequestTypeId(CrId , RequestTypeId) {
    
  this.RequestService.GetOldCertificateByCRIdandRequestTypeId(CrId,RequestTypeId).subscribe(results => {
    if (results.ResponseCode === ResponseCode.Success) {
      //debugger;
      if(results.Content[0].Result["length"] > 0){
        this.lookupService.handleRetrievedLookup(results.Content);
        this.showOldCertificateLookup = true;

      }
      else{
        this.translateService.get("ContractorQualification.NotQualified").subscribe(msg => {
          this.requestValidMsg = msg;
          this.IsRequestValid = false;
          this.showOldCertificateLookup = false;
          window.scroll(0, 0);
          // setTimeout(() => {
          //   this.displayMessage = "";
          // },4500)
        });
      }
    }
  });
}

protected BindOldCertificateData(oldId) {
    // this.Application.Request.OldQualificationCertificateId = oldId;
    // this.Application.Request.OldQualificationCertificate = new EntityReferenceItem();
    // this.Application.Request.OldQualificationCertificate.Value = oldId;
    // console.log(oldId);
    debugger;
    if(this.Application.Request.OldQualificationCertificateId == null){
     // this.Application.Request.CRId = null;
      this.Application.Request.ContractorArabicName = null;
      this.Application.Request.ContractorEnglishName = null;
      this.Application.Request.MainBranchAddress = null;
      this.Application.Request.CityId = null;
      this.Application.Request.Note = null;
    }
  this.RequestService.BindOldCertificateData(oldId,this.Application.Request.RequestTypeId).subscribe(results => {
    if (results.ResponseCode === ResponseCode.Success) {
      //debugger;
       //this.lookupService.handleRetrievedLookup(results.Content);
      this.Application.Request = results.Content.Request;
      //this.isOldCertificateData = true;
    }
  });
}

// protected GetRequestProjects(Id) {
//     debugger;
//   this.RequestService.GetRequestProjects(Id).subscribe(results => {
//     if (results.ResponseCode === ResponseCode.Success) {
//       //debugger;
//        this.lookupService.handleRetrievedLookup(results.Content);

//     }
//   });
// }

ValidateRequest(){
  debugger;
  this.RequestService.ValidateContractorRequest(this.Application.Request.CRId,this.Application.Request.RequestTypeId,this.Application.Request.OldQualificationCertificateId).subscribe(
    res => {
      if (res.ResponseCode === ResponseCode.Success){
       
        this.IsRequestValid = true;
     }
      if (res.ResponseCode === ResponseCode.Error){
        this.IsRequestValid = false;
        this.requestValidMsg = res.FriendlyResponseMessage;
     }
    }
  )
}
SaveAsDraft() {
  this.isSaveDraft = true;
  if(this.requestTypeCode == this.ChangeClassification || this.requestTypeCode == this.Qualifyrenewbuildingguid || this.requestTypeCode == this.Qualifyrenewsafetyguid){
    if(this.Application.Request.CRId && this.Application.Request.RequestTypeId && this.Application.Request.OldQualificationCertificateId){
      this.saveApplication();
  
    }
    else{
      this.translateService.get("ConsultingOfficeQualification.PleaseFillAllFields").subscribe(msg => {
        this.requestValidMsg = msg;
        this.IsRequestValid = false;
        window.scroll(0, 0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
  
    }
  }
  else{
    if(this.Application.Request.CRId && this.Application.Request.RequestTypeId){
      this.saveApplication();
  
    }
    else{
      this.translateService.get("ConsultingOfficeQualification.PleaseFillAllFields").subscribe(msg => {
        this.requestValidMsg = msg;
        this.IsRequestValid = false;
        window.scroll(0, 0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
  
  }
}
  //this.ValidateRequest();
  //var isvalidDoc = this.validateDocuments();
  //if (isvalidDoc) {
  //}
}

Submit() {
  //this.ValidateRequest();
  this.isSubmit = true;
  if(this.requestTypeCode == this.ChangeClassification || this.requestTypeCode == this.Qualifyrenewbuildingguid || this.requestTypeCode == this.Qualifyrenewsafetyguid){
    if(this.Application.Request.CRId && this.Application.Request.RequestTypeId && this.Application.Request.OldQualificationCertificateId && this.Application.Request.ContractorArabicName && this.Application.Request.ContractorEnglishName && this.Application.Request.CityId){
      this.Application.IsSubmitted = true;
      this.isSubmit = false;
      this.submitForm();
  
    }
    else{
      this.translateService.get("ConsultingOfficeQualification.PleaseFillAllFields").subscribe(msg => {
        this.requestValidMsg = msg;
        this.IsRequestValid = false;
        window.scroll(0, 0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
  
    }
  }
  else{
    if(this.Application.Request.CRId && this.Application.Request.RequestTypeId&& this.Application.Request.ContractorArabicName && this.Application.Request.ContractorEnglishName && this.Application.Request.CityId){
      this.Application.IsSubmitted = true;
      this.isSubmit = false;
      this.submitForm();
  
    }
    else{
      this.translateService.get("ConsultingOfficeQualification.PleaseFillAllFields").subscribe(msg => {
        this.requestValidMsg = msg;
        this.IsRequestValid = false;
        window.scroll(0, 0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
  
  }
}
 //this.isSubmit = false;
  
 

}
 ClearValidationMsg() {
  this.IsRequestValid = true;
  this.requestValidMsg="";
} 
}
