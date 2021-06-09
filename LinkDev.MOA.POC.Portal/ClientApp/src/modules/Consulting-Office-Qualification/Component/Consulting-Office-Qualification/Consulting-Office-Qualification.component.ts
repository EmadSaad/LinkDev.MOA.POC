import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { ConsultingOfficeQualificationModel, CRMStatusCodeEnum, QualificationTypeCodeEnum } from '../../Model/ConsultingOfficeQualificationModel';
import { ConsultingOfficeQualificationService } from '../../Service/ConsultingOfficeQualification.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { BuildingLicenseModel } from 'src/modules/Building-License-Request/Model/BuildingLicenseModel';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { DateTime } from 'src/modules/shared/form-guide/models/date-time';
import { DateModel } from 'src/modules/shared/form-guide/models/date-model';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { request } from 'http';

@Component({
  selector: 'app-Consulting-Office-Qualification',
  templateUrl: './Consulting-Office-Qualification.component.html',
  styleUrls: ['./Consulting-Office-Qualification.component.css']
})
export class ConsultingOfficeQualificationComponent extends EServicesBase<ConsultingOfficeQualificationModel> implements OnInit {

  constructor(public contractSubmissionService: ContractSubmissionService,
    protected requestService: ConsultingOfficeQualificationService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    private titleService: Title) {
    super(requestService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.configureMutliSelectConfiguration();
    this.titleService.setTitle("ECZA | Consulting Office Qualification");
  }

  /////////////////////////////// Variables ////////////////////////////////////////////////
  isSubmit:boolean = false;
  isSaveDraft:boolean = false;
  code:number;
  displayMessage: string;
  currentUser: number;
  lockOldCertificate: boolean = true;
  NewOfficeQualification: boolean = false;
  RenewMainBranch: boolean = false;
  SafteyQualification: boolean = false;
  RenewSafety: boolean = false;
  AddBranch: boolean = false;
  RenewBranch: boolean = false;
  ChangeQualificationClassification: boolean = false;

  CurrentCR: CRModel={};
  isCurrentCR:boolean;

  
  //CRMBPFStages
  IsNewApp:boolean = true;
  IsDefaultStages: boolean = true;
  
 


  // Side Bar
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  formStructure: FormHierarchyBase[] = [
    { index: 1, label: "ConsultingOfficeQualification.SubmitOfficeData", type: NodeType.Parent },
    { index: 2, label: "ConsultingOfficeQualification.Attachments", type: NodeType.Parent },
    
  ];
  


  //TODO: add contact model
  contactsList:ContactDetails[];
  gridModel: ContactDetails;
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




  contactDetailsfromContract:ContactDetails[];

  CROwnerGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Nationality",field:"Nationality",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];




  //lookup
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

  configureMutliSelectConfiguration() {
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
  // createMultiSelectConfig(): any {
  //   var config =
  //   {
  //     search: true,
  //     displayKey: "Text", //if objects array passed which key to be displayed defaults to description
  //     placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
  //     noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
  //     searchPlaceholder: 'Search', // label thats displayed in search input,
  //   }
  //   setTimeout(() => {
  //     this.translateService.get("SELECT").subscribe(msg => {
  //       config.placeholder = msg;
  //     });
  //     return config;
  //   });

  //   setTimeout(() => {
  //     this.translateService.get("NO_RESULT_FOUND").subscribe(msg => {
  //       config.noResultsFound = msg;
  //     });
  //     return config;
  //   });

  //   setTimeout(() => {
  //     this.translateService.get("SEARCH").subscribe(msg => {
  //       config.searchPlaceholder = msg;
  //     });
  //     return config;
  //   });

  //   return config;

  //   // this.minDate.setDate(this.todayDate.getDate() - 1);
  // }




  ///////////////////////////////////////////////////////////////////////
  protected TApplicationNewInstance(): ConsultingOfficeQualificationModel {
    return new ConsultingOfficeQualificationModel();
  }
  protected getQueryStringNames(): string[] {
    return ["Id"];
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [


      //{ EntityName: "account", CachingKey: "account_Account", Mode: LookupRequestMode.Account },
      //{ EntityName: "ldv_service", CachingKey: "ldv_service_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      //{ EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      { EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_ldv_certificateregarding_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificateregarding" },
      { EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_ldv_certificationstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificationstatus" },
      { EntityName: "ldv_ksaregion", CachingKey: "ldv_ksaregion_LookupWithName", Mode: LookupRequestMode.LookupWithName },

    ];
  }

  ngOnInit() {

    this.LoadLookups();
    this.GetCRsByContactandQType();
    this.isCurrentCR=false;

  }






  ///////////////////////// Functions //////////////////////////////////////

  //Side Bar
  onSelect = (node: FormHierarchyBase) => {
    // debugger;
    // this.selectedNode = node;
    this.ActiveLevelOne = node.index;

  }


  protected GetCRsByContactandQType() {

    this.requestService.GetCRsByTypeByContactId(6).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          
          this.lookupService.handleRetrievedLookup(res.Content);

        }

      }
    );

    this.requestService.GetQualificationType().subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {

          this.lookupService.handleRetrievedLookup(res.Content);

        }

      }
    );


  }




  protected afterFormReady(): void {
    //debugger;
    if (this.Application && this.Application.Request && this.Application.ApplicationHeader) {

      this.setStages();
      this.IsNewApp = false;
this.showHideFieldsonType();

      if(this.Application.Request.OldQualificationCertificateId){

        this.getOldCertificateList();
        this.OldCertificateChanged();
      }

      if(this.Application.Request.CRNumberId ){
        this.GetContactDetailsByCR();
        this.getCRInfo();
      }

      if(this.Application.Request.SectorId && this.Application.Request.SectorId.toString() != Guid.EMPTY){
        this.GetCitys();
      }

      
      
      // if(this.Application.Request.ConsultingOfficeId || this.Application.Request.CRId){
      //   this.GetCurrentUserType(this.Application.Request.CRId.toString());
      // }

    }else{
      // var today = new Date();
      // this.Application.Request.LicenseExpiryDate = {
      //   day:1,
      //   month:1,
      //   year:today.getUTCFullYear()
      // }
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


  private setStages() {

    if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.Draft.toString() 
    || this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingOnOfficetoCompleteInformation.toString()) {
      this.IsDefaultStages = true;
    }
    else if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingImplementation.toString()){
      this.IsDefaultStages = false;

    }
    else if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingonOfficeToPay.toString()){
      this.IsDefaultStages = false;
    //   if(this.Application.Request.HasPayment){
    //     //push Payment Tab
    //  this.formStructure.push(
    //    {index:3, label:"PlanApproval.PaymentStage", type:NodeType.Parent }
    //  );
    //   }
    }
    else{

      this.IsDefaultStages = false;
     
    }


    if(this.Application.Request.HasPayment &&
       (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingonOfficeToPay.toString() || this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.Completed.toString())){
              //push Payment Tab
          this.formStructure.push(
            {index:3, label:"PlanApproval.PaymentStage", type:NodeType.Parent}
          );
        }

    if(this.Application.Request.GeneratedCertificate){
      // Push Generated Certificate
      this.formStructure.push(
        { index: 4, label: "QualificationCertificate.GeneratedCertificate", type: NodeType.Parent },
        );
    }
debugger;
    if(this.Application.Request.Comments && this.Application.Request.Comments != ""){

      //push Comments Tab
      this.formStructure.push(
        {index:5,label:"PlanApproval.RequestComments",type:NodeType.Parent}
      );
    }
////////////////////////////////////////////////////////////////////////
    ///////////////////////// Big Note /////////////////////////

    //Because app-side-stages component is stupid

    var temp = Object.assign([],this.formStructure);
    this.formStructure = temp;


    // if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingMonthlyReport.toString()) {
    //   this.ActiveLevelOne = 2;
    //   this.IsMonthlyReport = true;
    //   this.Application.Request.ConstructionMonthlyReport.pop();
    // } else {
    //   this.formStructure.splice(1, 1);
    // }


    // if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.AdminReviewOnMonthlyReport.toString()) {
    //   this.IsAdminReview = true;
    // }




    // debugger;
    // if (this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.ReportReviewed.toString()) {
    //   this.IsReportReviewed = true;
    // }





  }


  protected GetContactDetailsByCR() {
    
      this.requestService.getCRContacts(this.Application.Request.CRNumberId).subscribe(
        res => {
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

  public CRChanged(){
    if(this.Application.Request.CRNumberId ){
      this.Application.Request.Contacts=[];
      this.GetContactDetailsByCR();
      this.getCRInfo();
    }else{
      this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails'] = [];

    }
  }
  public onContactChange(contacts:string[]){
    // this.isSubmit = false;
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
        
        if(contactDet['Value']==contactId){
          this.contactsList.push(contactDet);
          
        }
      }

      this.contactsList[i].IsDeleted = false;
      this.contactsList[i].IsUpdated = false;
    }
  }

  SubmitStages() {
    //debugger;
    this.isSubmit = true;
    let isDocumentsValid = this.validateDocuments();
    if(this.Application.Request.CRNumberId
      &&this.Application.Request.QualificationTypeId
      &&this.Application.Request.SectorId
      &&this.Application.Request.CityId
      &&this.Application.Request.OfficeNameinEnglish
      &&this.Application.Request.OfficeOwnerName
      &&this.Application.Request.OfficeOwnerNameinEnglish
      &&this.Application.Request.ResponsibleName
      &&this.Application.Request.LicenseNumber
      &&this.Application.Request.LicenseExpiryDate
      &&this.Application.Request.YearofConstruction
      &&this.Application.Request.SubscriptionNumber
      &&this.Application.Request.UsedDevicesDescription
      &&this.Application.Request.SubscriptionNumber
      &&this.Application.Request.Contacts.length > 0
      &&(
        (this.code == QualificationTypeCodeEnum.NewOfficeQualificationRequestServiceCode
        ||this.code == QualificationTypeCodeEnum.SafteyQualificationServiceCode)||
        ((this.code == QualificationTypeCodeEnum.RenewMainBranchQualificationServiceCode 
          ||this.code == QualificationTypeCodeEnum.RenewSafetyQualifiactionServiceCode
          ||this.code == QualificationTypeCodeEnum.ChangeQualificationClassificationServiceCode)&& this.Application.Request.OldQualificationCertificateId)
        ||(this.code == QualificationTypeCodeEnum.AddBranchServiceCode && this.Application.Request.NewBranchName)
        ||(this.code == QualificationTypeCodeEnum.RenewBranchQualificationServiceCode && this.Application.Request.OldQualificationCertificateId && this.Application.Request.BranchToBeRenewedId)
        ) 
      ){
        if(isDocumentsValid){

          this.displayMessage = "";
          this.submitForm();
          this.isSubmit = false;
        }
        else{
          this.ActiveLevelOne = 2;
          this.displayMessage = "";
    
           this.translateService.get("ConsultingOfficeQualification.PleaseSubmitDocs").subscribe(msg => {
              this.displayMessage = msg;
              window.scroll(0, 0);
              // setTimeout(() => {
              //   this.displayMessage = "";
              // },4500)
            });
    
        }

    }else{
      this.ActiveLevelOne = 1;
      this.displayMessage = "";

       this.translateService.get("ConsultingOfficeQualification.PleaseFillAllFields").subscribe(msg => {
          this.displayMessage = msg;
          window.scroll(0, 0);
          // setTimeout(() => {
          //   this.displayMessage = "";
          // },4500)
        });
    }

  }

  SaveAsDraft() {
    this.isSaveDraft = true;
    //debugger;
    this.displayMessage = "";
    //this.Application.Request.IsSubmitted = false;
    if (this.Application.Request.CRNumberId && this.Application.Request.QualificationTypeId) {
     
        this.saveApplication();
    }else{

      this.translateService.get("ConsultingOfficeQualification.PleaseEnterCRandType").subscribe(msg => {
        this.displayMessage = msg;
        window.scroll(0, 0);
        // setTimeout(() => {
        //   this.displayMessage = "";
        // },4500)
      });
    }


  }

  public QualificationTypeChanged(){
    if (this.Application.Request.QualificationTypeId && !this.Application.Request.Id ) {
      this.requestService.GetDocumentSettingByQualificationType(this.Application.Request.QualificationTypeId).subscribe(
        res => {
          if (res.ResponseCode === ResponseCode.Success) {
            
            if (res.Content) {
              this.Application.Documents = res.Content;
            } 
          }
          
        }
        );
      }else{
        this.Application.Documents = null;
      }
      
    
      this.showHideFieldsonType();

    



  }

  
  protected showHideFieldsonType() {
    //debugger;

    if (this.Application.Request.QualificationTypeId 
      && this.lookupService.lookupEntities['ldv_service_LookupWithId'].length>0 ) {
        
        this.lookupService.lookupEntities['ldv_service_LookupWithId'].forEach(Qtype => {
          if(Qtype.Value == this.Application.Request.QualificationTypeId ){
            this.code = Qtype.Code;
          }
        });


        this.NewOfficeQualification = false;
        this.RenewMainBranch = false;
        this.SafteyQualification = false;
        this.RenewSafety= false;
        this.AddBranch = false;
        this.RenewBranch = false;
        this.ChangeQualificationClassification = false;

        debugger;
      if(this.code == QualificationTypeCodeEnum.NewOfficeQualificationRequestServiceCode){
        this.NewOfficeQualification = true;
        this.Application.Request.OldQualificationCertificateId = null;
      }
      else if(this.code == QualificationTypeCodeEnum.RenewMainBranchQualificationServiceCode){
        this.RenewMainBranch = true;
      } 
      else if(this.code == QualificationTypeCodeEnum.SafteyQualificationServiceCode){
        this.SafteyQualification = true;
        this.Application.Request.OldQualificationCertificateId = null;

      }
      else if(this.code == QualificationTypeCodeEnum.RenewSafetyQualifiactionServiceCode){
        this.RenewSafety= true;
      }
      else if(this.code == QualificationTypeCodeEnum.ChangeQualificationClassificationServiceCode){
        this.ChangeQualificationClassification = true;
      }
      else if(this.code == QualificationTypeCodeEnum.AddBranchServiceCode ){
        this.AddBranch = true;
        this.Application.Request.OldQualificationCertificateId = null;

      }
      else if(this.code == QualificationTypeCodeEnum.RenewBranchQualificationServiceCode){
        this.RenewBranch = true;
      }


    }
  }

  public CROrQualificationTypeChanged() {
    this.lockOldCertificate = true;
//TODO Call Prevalidate
this.displayMessage = "";

if(this.IsDefaultStages){
//debugger;
  this.loadLookups();
  // this.Application.Request.SectorId = null;
  // this.Application.Request.CityId = null;
  // this.lookupService.lookupEntities['ldv_ksacity_KSACity'] = [];
  // this.lookupService.lookupEntities['ldv_qualificationcertificate_LookupWithName'] = [];
  // this.Application.Request.OldQualificationCertificateId = null;

  if (this.Application.Request.CRNumberId && this.Application.Request.QualificationTypeId && !this.Application.Request.Id) {
     
  this.CanMakeRequest();
  }
  if(this.code == QualificationTypeCodeEnum.RenewMainBranchQualificationServiceCode ||
  this.code == QualificationTypeCodeEnum.RenewSafetyQualifiactionServiceCode || 
  this.code == QualificationTypeCodeEnum.RenewBranchQualificationServiceCode ||
  this.code == QualificationTypeCodeEnum.ChangeQualificationClassificationServiceCode ){
  
  this.getOldCertificateList()
}


}




  }


  protected getOldCertificateList(){
    if (this.Application.Request.CRNumberId && this.Application.Request.QualificationTypeId) {
      //Validate if Valid //TODO
      //get OldCertificates
      //1-renew main -> must be on or within last month of expirydate & regarding 1
      //2-renew safety -> must be on or within last month of expirydate & regarding 3
      //3-change category -> must be after ldv_changecategoryabilitydate & regarding 1
      //4-renew branch -> must be on or within last month of expirydate & regarding 2

      this.requestService.GetOldCertificateList(this.Application.Request.CRNumberId, this.Application.Request.QualificationTypeId).subscribe(
        res => {
          if (res.ResponseCode === ResponseCode.Success) {
            
            if (res.Content && res.Content.length > 0 && res.Content[0].Result && res.Content[0].Result.length > 0) {
              this.lockOldCertificate = false;
            } else {
              this.lockOldCertificate = true;
              this.lookupService.lookupEntities['ldv_qualificationcertificate_LookupWithName'] = [];
            }
            this.lookupService.handleRetrievedLookup(res.Content);

          }

        }
      );


      if(!this.Application.Request.Id){

        this.CanMakeRequest();
      }


    }
  }


protected CanMakeRequest(){
  console.log(this.code);
  this.requestService.GetCanMakeRequest(this.Application.Request.QualificationTypeId,
    this.Application.Request.CRNumberId,this.Application.Request.OldQualificationCertificateId,
    this.Application.Request.SectorId).subscribe(
    res => {
      if (res.ResponseCode === ResponseCode.Success) {
        if(!res.Content.IsValid){
          this.displayMessage = res.Content.Message;
          window.scroll(0, 0);
          // this.Application.Request.QualificationTypeId = null;
          // this.Application.Request.CRNumberId = null;
          // this.Application.Request.OldQualificationCertificateId = null;
        }
        else{
          this.displayMessage ="";
        }
      }
    }
  );
}


  protected OldCertificateChanged(){
    if(!this.Application.Request.Id){

    this.CanMakeRequest();
    }
    if (this.Application.Request.OldQualificationCertificateId && this.Application.Request.OldQualificationCertificateId.toString() != Guid.EMPTY ) {
      
     
      this.requestService.GetOldCertificateById(this.Application.Request.OldQualificationCertificateId).subscribe(
        res => {
          if (res.ResponseCode === ResponseCode.Success) {
            
            // var x = res.Content;
            //set old certificate to fields
            console.log(this.code);
            if(res.Content.CertificationStatus == 3 && 
              (this.IsDefaultStages
                ||this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.Draft.toString() 
            || this.Application.ApplicationHeader.CRMStatusCode == CRMStatusCodeEnum.PendingOnOfficetoCompleteInformation.toString())){
              
                this.Application.Request.OldQualificationCertificateId = null;
                this.lookupService.lookupEntities['ldv_qualificationcertificate_LookupWithName'] = null;

                this.translateService.get("ConsultingOfficeQualification.CertificateSuspended").subscribe(msg => {
                  this.displayMessage = msg;
                  window.scroll(0, 0);
                  // setTimeout(() => {
                  //   this.displayMessage = "";
                  // },4500)
                });
            }
            else if(this.IsDefaultStages){

            

              this.Application.Request.SectorId = res.Content.SectorId;
              this.lookupService.lookupEntities['ldv_ksaregion_LookupWithName'] = 
              [{Text:res.Content.Sector.Name,Value:res.Content.Sector.Value}];
              this.Application.Request.CityId = res.Content.CityId;
              this.lookupService.lookupEntities['ldv_ksacity_KSACity'] = 
              [{Text:res.Content.City.Name,Value:res.Content.City.Value}];
            
            //TODO Fill all old certificate fields
            this.Application.Request.OfficeNameinEnglish = res.Content.OfficeNameinEnglish;
            this.Application.Request.OfficeOwnerName = res.Content.OfficeOwnerName;
            this.Application.Request.OfficeOwnerNameinEnglish = res.Content.OfficeOwnerNameinEnglish;
            this.Application.Request.YearofConstruction = res.Content.YearofConstruction;
            this.Application.Request.ResponsibleName = res.Content.ResponsibleName;
            this.Application.Request.LicenseNumber = res.Content.LicenseNumber;
            this.Application.Request.LicenseExpiryDate = res.Content.LicenseExpiryDate;
            this.Application.Request.UsedDevicesDescription = res.Content.UsedDevicesDescription;
            this.Application.Request.SubscriptionNumber = res.Content.SubscriptionNumber;
            
            if(res.Content.BranchNameId){
              this.Application.Request.BranchToBeRenewedId = res.Content.BranchNameId;
              this.lookupService.lookupEntities['ldv_crbranch_LookupWithName'] = 
              [{Text:res.Content.BranchName.Name,Value:res.Content.BranchName.Value}];
            }

            }
            else{

              // this.Application.Request.SectorId = res.Content.SectorId;

              // this.lookupService.lookupEntities['ldv_ksaregion_LookupWithName'] = 
              // [{Text:res.Content.Sector.Name,Value:res.Content.Sector.Value}];

              // this.Application.Request.CityId = res.Content.CityId;

              // this.lookupService.lookupEntities['ldv_ksacity_KSACity'] = 
              // [{Text:res.Content.City.Name,Value:res.Content.City.Value}];

              // console.log(this.Application.Request.OldQualificationCertificateId);
              // console.log(this.Application.Request.OldQualificationCertificate);

              if(!this.Application.Request.OldQualificationCertificateId && this.Application.Request.OldQualificationCertificate){
                this.Application.Request.OldQualificationCertificateId = Guid.parse( this.Application.Request.OldQualificationCertificate.Value);
                this.lookupService.lookupEntities['ldv_qualificationcertificate_LookupWithName'] = 
                [{Text:this.Application.Request.OldQualificationCertificate.Name,Value:this.Application.Request.OldQualificationCertificate.Value}];
              }

             }
            
          }

        }
      );

    }
      
    
  }


  public SectorChanged(){
    
    this.Application.Request.CityId = null;

    if(this.lockOldCertificate && this.Application.Request.SectorId && this.Application.Request.SectorId.toString() != Guid.EMPTY){
      //get city related to sector
      this.GetCitys();
      if(!this.Application.Request.Id){
        this.CanMakeRequest();

      }
      
    }
  }

  protected GetCitys(){
    this.requestService.GetCityBySectorId(this.Application.Request.SectorId).subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success) {
          
          this.lookupService.handleRetrievedLookup(res.Content);

        }

      }
    );
  }




  getCRInfo(){
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.Application.Request.CRNumberId.toString()).subscribe(results => {
      if(results.ResponseCode === ResponseCode.Success)
      {
        this.CurrentCR = results.Content.CR;
      }
    this.isCurrentCR = false;

    });
  }

  // ngAfterViewChecked() {
  //   // this.message = 'all done loading :)'
  //   this.cdr.detectChanges();
  // }

  // protected GetCurrentUserType(CRId: string,counter = 0) {


  //   this.requestService.GetCurrentUserType(CRId).subscribe(
  //     res => {
  //       if (res.ResponseCode === ResponseCode.Success) {
  //         this.currentUser = res.Content;
  //         //console.log(this.currentUser);
  //         // //None
  //         if (this.currentUser == -1 && counter < 1) {
  //           counter++;
  //           //this.GetCurrentUserType(this.Application.Request.ConsultingOfficeId.toString(),counter);
  //         }
  //         // //Investor
  //         // else if (this.currentUser == 0) {

  //         // }
  //         // //Office
  //         // else if (this.currentUser == 1) {

  //         // }
  //       }
  //     }
  //   )




  // }


}
