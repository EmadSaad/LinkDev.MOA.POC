import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { AlertService } from 'src/modules/shared/services';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { CaseModel } from '../../Models/CaseModel';
import { LookupsModel } from '../../Models/LookupsModel';
import { CreateCaseService } from '../../Services/CreateCase.service';

@Component({
  selector: 'app-Create-Case',
  templateUrl: './Create-Case.component.html',
  styleUrls: ['./Create-Case.component.css']
})
export class CreateCaseComponent implements OnInit {
  public Application?: EServiceModel<CaseModel>;
  disableButton: boolean = false;
  submissionInfo: string = null;
  submitUrlLink: string = 'workspace';
  submitUrlLabel: string = 'LAYOUT.WORKSPACE';
  submissionAlertClass: string = null;
  submit : boolean;
  CompaniesLookups: LookupsModel[];
  CountriesLookups: LookupsModel[];
  ArrivingPortsLookups: LookupsModel[];
  ProductsLookups: LookupsModel[];
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  constructor(protected createcaseservice:CreateCaseService,protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,

    protected router: Router) {
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
    this.titleService.setTitle("MOA | Requests");
    this.GetCompanies();
   }
   protected getQueryStringNames(): string[] {
    return ["Id"];
  };
  formStructure: FormHierarchyBase[] = [
    {index:1,label:"MergeRequest.RequestDetails",type:NodeType.Parent,children:
      [
        {index:1, label:"MergeRequest.FirstStage", type:NodeType.Child, children:
          [
            {index:1, label:"MOACreateCase.MainInfo", type: NodeType.Section, data:"MainInfo"},
            {index:2, label:"MOACreateCase.ProductInfo", type: NodeType.Section, data:"ProductInfo"},
            {index:3, label:"MOACreateCase.PricingInfo", type: NodeType.Section, data:"PricingInfo"}
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


  @ViewChild('FirstStage') firstStage: NgForm;
  @ViewChild('CaseForm') CaseForm: NgForm;

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
  saveRequest(){

  };
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

  get SetImportingDocuments():DocumentSettingModel[]{

    let Documents:DocumentSettingModel[]=[{Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"نموذج الأستيراد + 2صورة منه",Description: null,IsRequired: true,MinAllowedFiles: 3,MaxAllowedFiles: 3,AllowedSize: 30240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"طلب بأسم السيد رئيس اللجنة + 2 صورة منه ، شارحا فيه الكميات و الأصناف و السعر",Description: null,IsRequired: true,MinAllowedFiles: 3,MaxAllowedFiles: 3,AllowedSize: 30240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"فاتورة مبدئية+5 صورة منها",Description: null,IsRequired: true,MinAllowedFiles: 5,MaxAllowedFiles: 5,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"صورة سجل المستوردين",Description: null,IsRequired: true,MinAllowedFiles: 5,MaxAllowedFiles: 5,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"صورة ترخيص الأتجار في التقاوي",Description: null,IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"طابع دمغة 60 قرش",Description: null,IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"دمغة نقابة المهن الزراعية ب 10 جنيهات",Description: null,IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"(أمانة لجنة التقاوي)إيصال سداد 0.1% من قيمة الفاتورة",Description: null,IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: null,DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true}]
   return Documents;
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
    this.createcaseservice.post(this.Application).subscribe(savingResult => {
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
  GetCompanies(){
    this.createcaseservice.getCompaniesLookups().subscribe(results => {
this.CompaniesLookups=results;
    });
    this.createcaseservice.getCountriesLookups().subscribe(result=>{
      this.CountriesLookups=result;
    });
    this.createcaseservice.getArrivingPortsLookups().subscribe(result=>{
      this.ArrivingPortsLookups=result;
    });
    this.createcaseservice.getProductsLookups().subscribe(result=>{
      this.ProductsLookups=result;
    });
  }
}
