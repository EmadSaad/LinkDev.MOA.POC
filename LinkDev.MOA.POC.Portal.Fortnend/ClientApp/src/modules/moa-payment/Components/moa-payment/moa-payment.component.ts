import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { CaseModel } from 'src/modules/MOA-CreateCase/Models/CaseModel';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { AlertService } from 'src/modules/shared/services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { MoaPaymentService } from '../../Services/moa-payment.service';

@Component({
  selector: 'app-moa-payment',
  templateUrl: './moa-payment.component.html',
  styleUrls: ['./moa-payment.component.css']
})
export class MoaPaymentComponent extends EServicesBase<CaseModel> implements OnInit {

  protected TApplicationNewInstance(): CaseModel {
    return new CaseModel();

   }
   protected getQueryStringNames(): string[] {
     return ["Id"];
   }
   @ViewChild('CaseForm') CaseForm: NgForm;
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  serviceParams: string[];
  submit: boolean;
  protected isApplicationLoaded: boolean;
  constructor(public MoaPaymentService: MoaPaymentService,
    public lookupService: LookupService,protected activatedRoute: ActivatedRoute,protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,

    protected router: Router) {
      super(MoaPaymentService, lookupService, activatedRoute, alertService, translateService, modalService, router);
      this.Application={ApplicationHeader:null,Documents:this.SetImportingDocuments,IsReadOnly:false,IsSubmitted:false,Request:null}
      this.Application.Request = {
        ArrivingPortId:"",
        CompanyId:"",
        Exporter:"",
        ExportingCountryId:"",
        Id:"",
        MadeInCountryId:"",
        ProductId:"",
        Qunatity:null,
        TotalPrice:null,
        UnitPrice:null
      };
      this.titleService.setTitle("MOA | Payment");
      this.serviceParams = this.getQueryStringNames();
      debugger;
      let x=this.getQueryStringNames();
      console.log("ID:"+this.serviceParams);
    }
    formStructure: FormHierarchyBase[] = [
      {index:1,label:"MOAPayment.PaymentBillUploading",type:NodeType.Parent,children:
        [
          {index:1, label:"MergeRequest.FirstStage", type:NodeType.Child, children:
            [
              {index:1, label:"MOAPayment.Payment", type: NodeType.Section, data:"Payment"},

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



  ngOnInit() {

  }
afterFormReady(){
  debugger;
  this.Application.Documents=this.SetImportingDocuments;
  if(this.Application.ApplicationHeader.Id)
  this.Application.Documents.forEach(x=>x.Id=this.Application.ApplicationHeader.Id);
}
submitRequest(){  this.submit = true;
  debugger;
  let isDocumentsValid = this.validateDocuments();
  if(isDocumentsValid)
    this.submitForm();};
get totalPrice():number{
  this.Application.Request.TotalPrice=this.Application.Request.UnitPrice*this.Application.Request.Qunatity;
  if (!Number.isNaN(this.Application.Request.TotalPrice))
  return this.Application.Request.TotalPrice;

  else
  return 0;
}

public submitForm(): void {
  debugger;
 this.disableButton = true;
 this.Application.IsSubmitted = true;
 let isDocumentsValid = this.validateDocuments();
 if (/*isTabsValid &&*/ isDocumentsValid) {
   this.preSaveApplication();
   this.preSubmitApplication();
   this.saveApplication();
 }
 else {
   this.disableButton = false;
 }
}

protected validateDocuments(): boolean {
 let areDocumentsValid = true;
 if (this.Application.Documents) {
   let documentsToValidate = this.Application.Documents.filter(x => x.IsVisible);
   for (let i = 0; i < documentsToValidate.length; i++) {
     let currentDocument = documentsToValidate[i];
     currentDocument.Errors = [];
     if (currentDocument.IsRequired && (!currentDocument.Files || currentDocument.Files.filter(x => x.IsDeleted !== true).length === 0)) {
       currentDocument.Errors.push("Validations.Required");
       areDocumentsValid = false;
       break;
     }
     if (currentDocument.MinAllowedFiles && currentDocument.Files.filter(x => x.IsDeleted !== true).length < currentDocument.MinAllowedFiles) {
       currentDocument.Errors.push("Documents.ValidationMinNumberOfFiles");
       areDocumentsValid = false;
     }
   }
 }
 return areDocumentsValid;
}
protected preSaveApplication(): void { }
protected preSubmitApplication(): void { }
protected validateApplicationBeforeSave(): boolean {
 return true;
}

protected saveApplication(): void {
 this.submissionInfo = null;
 SharedHelper.showLoader();
 this.Application.Documents.forEach(x=>x.Files.forEach(y=>y["Content"]=null));
 this.MoaPaymentService.postpayment(this.Application).subscribe(savingResult => {
   if (savingResult.ResponseCode === ResponseCode.Success) {
     debugger;
     if (!savingResult.FriendlyResponseMessage) {
       if (this.Application.IsSubmitted) {
         this.translateService.get('SUBMITTING_MESSSAGE', { number: savingResult.Content.RequestNumber })
           .subscribe(translationResult => {
             SharedHelper.hideLoader();
             this.alertService.success(translationResult, this.submitUrlLink, this.submitUrlLabel);
           });
         this.router.navigateByUrl('/notification');

       }
       else {
         this.translateService.get('SAVE_DRAFT_MESSSAGE', { number: savingResult.Content.RequestNumber })
           .subscribe(translationResult => {
             //debugger;
             if (!this.Application.Request["Id"]) {
               this.Application.Request["Id"] = savingResult.Content.RequestId;
               var currentURL = window.location.href.split('#')[0];
               if (currentURL.toLocaleLowerCase().indexOf("?id=") === -1) {
                 let currentBase = currentURL.split("?")[0];
                 window.history.replaceState(null, null, `${currentBase}?Id=${savingResult.Content.RequestId}`);
               }
             }
             this.markAllCurrentDocumentsAsOld();
             this.submissionAlertClass = 'alert-success';
             this.submissionInfo = translationResult;
             SharedHelper.scrollToBody();
             SharedHelper.hideLoader();
           }
           );
       }
     }
     else {
       this.alertService.success(savingResult.FriendlyResponseMessage, "", "");
       this.router.navigateByUrl('/notification');
     }
     this.onSaveFormSuccess();
   }
   else {
     this.submissionAlertClass = 'alert-danger';
     this.submissionInfo = savingResult.FriendlyResponseMessage;
     SharedHelper.scrollToBody();
     SharedHelper.hideLoader();
     this.onSaveFormError();
   }
 }, (err) => {
   this.submissionAlertClass = 'alert-danger';
   this.submissionInfo = err.error.FriendlyResponseMessage;
   SharedHelper.scrollToBody();
   SharedHelper.hideLoader();
   this.onSaveFormError();
 });
}
protected markAllCurrentDocumentsAsOld() {
 if (this.Application.Documents && this.Application.Documents.length > 0) {
   this.Application.Documents.forEach(doc => {
     if (doc.Files && doc.Files.filter(x => x.IsNewlyCreated === true).length > 0) {
       doc.Files.filter(x => x.IsNewlyCreated === true).forEach(file => {
         file.IsNewlyCreated = false;
       });
     }
   });
 }
}
protected onSaveFormSuccess(): void { }
protected onSaveFormError(): void { }




  get SetImportingDocuments():DocumentSettingModel[]{

    let Documents:DocumentSettingModel[]=[{Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"فاتورة الدفع",Description: "payment",IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 3,AllowedSize: 1024,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
  ]
   return Documents;
  }
  }
