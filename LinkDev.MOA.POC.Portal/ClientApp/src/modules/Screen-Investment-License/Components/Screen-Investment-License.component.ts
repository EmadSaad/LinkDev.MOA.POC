import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AvailableTimesGetModel } from 'src/modules/Contract-Submission/interfaces/interview/AvailableTimesGetModel';
import { InfrastructurePermitModel } from 'src/modules/Infrastructure-Permit/Models/InfrastructurePermitModel';
import { LookupsModel } from 'src/modules/Infrastructure-Permit/Models/LookupsModel';
import { InfrastructureService } from 'src/modules/Infrastructure-Permit/Services/Infrastructure-Service';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { AlertService } from 'src/modules/shared/services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { AnswerssModel } from '../Models/Answers';
import { QuestionsModel } from '../Models/QuestionModel';
import { ScreenInvestmentLicenseModel } from '../Models/ScreenInvestmentLicenseModel';
import { ScreenInvestmentLicenseService } from '../Services/screen-investment-license.service';


@Component({
  selector: 'app-Screen-Investment-License',
  templateUrl: './Screen-Investment-License.component.html',
  styleUrls: ['./Screen-Investment-License.component.css']
})
export class ScreenInvestmentLicenseComponent implements OnInit {
  submit : boolean;
  getModel: AvailableTimesGetModel={} ;
  submissionAlertClass: string = null;
  disableButton: boolean = false;
  submissionInfo: string = null;
  submitUrlLink: string = 'workspace';
  submitUrlLabel: string = 'LAYOUT.WORKSPACE';
  DesignConsultantLookups: LookupsModel[];
  public YesNoOptions:LookupsModel[]=[{LookupSchemaName:"yes",Text:"Yes",Value:"true"},{LookupSchemaName:"no",Text:"No",Value:"false"}];
  QuestionsList: QuestionsModel[];
  public Application?: EServiceModel<ScreenInvestmentLicenseModel>;
  ActiveLevelOne: number = 1;
  ActiveLevelTwo: number = 1;
  ActiveLevelThree: number = 1;
  public YesValue:boolean[]=[false];
  public NoValue:boolean;
  constructor(protected ScreenInvestmentService:ScreenInvestmentLicenseService,protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    public lookupService: LookupService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService:Title,

    protected router: Router) { this.Application={ApplicationHeader:null,Documents:this.SetGeneralDocuments,IsReadOnly:false,IsSubmitted:false,Request:null}
    this.Application.Request = {
      Id: "",
   ArabicName:"",
   EnglishName:"",
   EndDate:null,
   EntityCategory:"",
   EntityName:"",
   InvestmentType:"",
   StartDate:null,
   SubCity:"",
   TargetCity:"",
   Tickersymbol:"",
   QuestionairAnswers:[]
    };
    this.getModel.FromDate= {
      year: 2021,
      month: 6,
      day: 10
  }
  this.getModel.ToDate= {
    year: 2021,
    month: 6,
    day: 10
}
    this.titleService.setTitle("ECZA | Screen Investment License"); 
 this.GetQuestions();
 
  }

    protected getQueryStringNames(): string[] {
      return ["Id"];
    };
    formStructure: FormHierarchyBase[] = [
      {index:1,label:"ECZAInfrastructurePermit.RequestDetails",type:NodeType.Parent,children:
        [
          {index:1, label:"ECZAInfrastructurePermit.FirstStage", type:NodeType.Child, children:
            [
              {index:1, label:"ECZAScreenInvestmentLicense.ReservedTradeName", type: NodeType.Section, data:"ReservedTradeName"},
              {index:2, label:"ECZAScreenInvestmentLicense.BasicInformation", type: NodeType.Section, data:"BasicInformation"},
              {index:3, label:"ECZAScreenInvestmentLicense.PublicInformation", type: NodeType.Section, data:"PublicInformation"}
             
            ]
          },
        {index:2, label:"ECZAInfrastructurePermit.SecondStage", type:NodeType.Child, children:
          [
            {index:1, label:"ECZAScreenInvestmentLicense.Questionair", type: NodeType.Section, data:"Questionair"}
          ]
        },
        {index:3, label:"ECZAInfrastructurePermit.ThirdStage", type:NodeType.Child, children:
          [
            {index:1, label:"ECZAInfrastructurePermit.GeneralProjectDocuments", type: NodeType.Section, data:"Documents"}
          ]
        },
        {index:4, label:"ECZAInfrastructurePermit.FourthStage", type:NodeType.Child, children:
          [
            {index:1, label:"ECZAInfrastructurePermit.ReviewRequest", type: NodeType.Section, data:"GeneralInfo"}
          ]
        }
      ]
    }
     
    ];
    
    onSelect = (node: FormHierarchyBase) => {
      console.log(this.Application.Request.QuestionairAnswers);
      switch (node.type) {
        case NodeType.Parent:
          this.ActiveLevelOne = node.index;
          break;
        case NodeType.Child:
          this.ActiveLevelTwo = node.index
          break;
          case NodeType.Section:
            this.ActiveLevelThree=node.index
            break;
      }
      SharedHelper.scrollToBody();
    }
    @ViewChild('FirstStage') firstStage: NgForm;
    @ViewChild('CaseForm') CaseForm: NgForm;
    @ViewChild('SecondStage') SecondStage:NgForm;
    @ViewChild('Thirdtage') Thirdtage:NgForm;
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
  
  
  get SetGeneralDocuments():DocumentSettingModel[]{

    let Documents:DocumentSettingModel[]=[{Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"Cruky sketch for unit approved from ECZA",Description: null,IsRequired: true,MinAllowedFiles: 1,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName:"GeneralDocuments",DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"Maintainance Contract for Unit",Description: null,IsRequired: false,MinAllowedFiles: 0,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: "GeneralDocuments",DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true},
   {Id:"ccb5ecd9-e11d-eb11-a9ec-000d3aaa6848",Name:"Insurrance Document for Unit",Description: null,IsRequired: false,MinAllowedFiles: 0,MaxAllowedFiles: 1,AllowedSize: 10240,AllowedExtensions: "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG",SectionName: "GeneralDocuments",DependentFields:[],TemplateId: null,Files:[],Errors:[],IsVisible: true}]
   return Documents;
  }

   SetBooleanOptionset():LookupsModel[]{
    let YesNoOptions:LookupsModel[]=[{LookupSchemaName:"yes",Text:"Yes",Value:"true"},{LookupSchemaName:"no",Text:"No",Value:"false"}]
return YesNoOptions;
  }

    GetQuestions(){
      debugger;
      this.ScreenInvestmentService.getQuestions().subscribe(results => {
        this.Application.Request.QuestionairAnswers=results;
        
        
          
        });
        
           
    }
    submitRequest(){  this.submit = true;
      debugger;
     // let isDocumentsValid = this.validateDocuments();
     // if(isDocumentsValid)
        this.submitForm();};
        public submitForm(): void {
          debugger;
         this.disableButton = true;
         this.Application.IsSubmitted = true;
        // let isDocumentsValid = this.validateDocuments();
        // if (/*isTabsValid &&*/ isDocumentsValid) {
           this.preSaveApplication();
           this.preSubmitApplication();
           this.saveApplication();
         /*}
         else {
           this.disableButton = false;
         }*/
         
       }
       protected preSaveApplication(): void { }
       protected preSubmitApplication(): void { }
       protected saveApplication(): void {
        this.submissionInfo = null;
        SharedHelper.showLoader();
        this.Application.Documents.forEach(x=>x.Files.forEach(y=>y["Content"]=null));
        this.ScreenInvestmentService.post(this.Application).subscribe(savingResult => {
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
   
}
