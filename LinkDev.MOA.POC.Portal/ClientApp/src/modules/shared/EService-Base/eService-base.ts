import { OnInit, EventEmitter, ViewChild, AfterViewInit, HostListener } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";
import { LookupService } from '../Services/lookup.service';
import { IRequestService } from '../services/IRequestService.service';
import { EServiceModel } from '../Models/eservice-model.model';
import { CustomTab } from '../Models/custom-tab.model';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
// import { SaveDocumentsModel } from '../documents/interfaces/Save-Documents-Model';
// import { LookupResponse } from '../Models/lookup-response.model';
// import { LookupKeyValue } from '../Models/lookup-key-value.model';
import { SharedHelper } from '../services/shared-helper';
//import { DocumentsComponent } from '../documents/components/documents/documents.component';
import { AlertService } from '../services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../services/token.service';
import { RetrieveOptionsRequest } from "../Models/lookup-request.model";
import { ResponseCode } from "../Models/api-generic-response";
import { Guid } from "guid-typescript";
export abstract class EServicesBase<TApplication> implements OnInit {

  Application: EServiceModel<TApplication>;
  //SubmittedApplication: ApiPostEntityRequest<TApplication>;
  resources: any;
  isFormReady: boolean;
  isSaveApplication: boolean;
  isSubmitted: boolean;
  activeTab: number = 0;
  showErrorPopup: boolean = false;
  isBack: boolean = false;
  hasError: boolean = false;
  serviceParams: string[];
  isAuthorized: boolean;
  disableButton: boolean = false;
  submitUrlLink: string = 'workspace';
  submitUrlLabel: string = 'LAYOUT.WORKSPACE';
  submissionInfo: string = null;
  submissionAlertClass: string = null;






  protected isLookupsLoaded: boolean;
  protected isApplicationLoaded: boolean;
  protected isFormReadyEventEmitter: EventEmitter<any>;
  protected isDocumentConfigurationLoaded: boolean;
  protected isDraft: boolean = false;
  constructor(protected requestService: IRequestService<TApplication>,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
    this.isLookupsLoaded = false;
    this.isApplicationLoaded = false
    this.isFormReady = false;
    this.isFormReadyEventEmitter = new EventEmitter<any>();
    this.isSaveApplication = false;
    this.isSubmitted = false;
    this.activeTab = 0;
    this.Application = new EServiceModel<TApplication>();
    this.Application.Request = this.TApplicationNewInstance();

    this.setCustomSubmitMessageUrl(this.submitUrlLink, this.submitUrlLabel);
    this.serviceParams = this.getQueryStringNames();
    this.beforeInitForm();
    this.initForm();
  }

  ngOnInit(): void {
    // this.tokenService.isAuthenticated()
    //   .subscribe(
    //     data => {
    //       this.isAuthorized = data;
    //     });


  }
  protected beforeInitForm(): void { }

  protected abstract TApplicationNewInstance(): TApplication;
  protected abstract getQueryStringNames(): string[];
  protected initForm(): void {
    SharedHelper.showLoader();

    this.loadLookups();
    //setTimeout(() => {      
    this.loadApplication();
    // }, 10000);
    this.extendInitForm();
  }
  protected extendInitForm(): void { }

  protected loadLookups(): void {
    let lookups = this.getLookupTypes();
    if (lookups && lookups.length > 0) {
      this.lookupService.loadLookups(lookups).subscribe(result => {

        this.isLookupsLoaded = result;
        //  debugger;
        this.setFormIsReady();
      });
    }
    else {
      this.isLookupsLoaded = true;
    }
  }
  protected loadApplication(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      let queryString = ""
      for (var i = 0; i < this.serviceParams.length; i++) {
        let queryParam = p[this.serviceParams[i]];
        if (queryParam === undefined)
          queryParam = "";
        queryString += `${this.serviceParams[i]}=${queryParam}&`
      }

      this.requestService.get(queryString).subscribe(result => {
        debugger;
        console.log(result);
        if (result.ResponseCode === ResponseCode.Success) {
          debugger;
          this.Application.Request = result.Content.Request ? result.Content.Request : this.TApplicationNewInstance();
          if (result.Content.Request && result.Content.Request["Id"]) {
            if (result.Content.Request["Id"].toString().toLowerCase() === Guid.EMPTY.toString().toLowerCase())
              this.Application.Request["Id"] = null;
          }
          this.Application.Documents = result.Content.Documents;
          this.Application.ApplicationHeader = result.Content.ApplicationHeader;
          this.Application.IsReadOnly = result.Content.IsReadOnly;
          this.isApplicationLoaded = true;
          // debugger;
          this.setFormIsReady()
        }
        else {
          this.goToErrorPage(result.FriendlyResponseMessage);
        }
      },
        err => {
          this.goToErrorPage(err.error.FriendlyResponseMessage);
        });
    });
  }
  protected handleRetrievedApplication(application: TApplication): void {
  }
  protected setFormIsReady(): void {
    //  debugger;
    if (this.isLookupsLoaded && this.isApplicationLoaded) {
      this.isFormReady = true;
      this.isFormReadyEventEmitter.emit();
      this.afterFormReady();
      SharedHelper.hideLoader();
      //hide loader      
    }
  }
  protected afterFormReady(): void { }

  protected setCustomSubmitMessageUrl(urlLink: string, urlLabel: string): void { }


  public saveForm(): void {
    //  debugger;
    this.disableButton = true;
    this.isSubmitted = false;
    this.Application.IsSubmitted = false;
    // setTimeout(() => {
    //   if (this.validateTabs() && this.validateApplicationBeforeSave()) {
    //     this.preSaveApplication();
    //     this.saveApplication();
    //   }
    //   else {
    //     this.disableButton = false;
    //   }
    // });
    if (/*this.validateTabs() && */this.validateApplicationBeforeSave()) {
      this.preSaveApplication();
      this.saveApplication();
    }
    else {
      this.disableButton = false;
    }

  }

  public submitForm(): void {
    // debugger;
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
    // setTimeout(() => {
    //   //let isTabsValid = this.validateTabs();
    //   let isDocumentsValid = this.validateDocuments();
    //   if (/*isTabsValid &&*/ isDocumentsValid) {
    //     this.preSaveApplication();
    //     this.preSubmitApplication();
    //     this.saveApplication();
    //   }
    //   else {
    //     this.disableButton = false;
    //   }
    // },0);
  }
  protected preSaveApplication(): void { }
  protected preSubmitApplication(): void { }
  protected validateApplicationBeforeSave(): boolean {
    return true;
  }
  protected saveApplication(): void {
    this.submissionInfo = null;
    SharedHelper.showLoader();
    this.requestService.post(this.Application).subscribe(savingResult => {
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

  protected onSaveFormSuccess(): void { }
  protected onSaveFormError(): void { }

  protected goToErrorPage(message: string) {
    SharedHelper.hideLoader();
    this.alertService.error(message, this.submitUrlLink, this.submitUrlLabel);
    this.router.navigateByUrl('/notification');
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

  protected validateForm(form: NgForm): boolean {
    if (form.valid) {
      return true;
    }
    else {
      let valid = true;
      let controls = form.controls
      Object.keys(controls).forEach(key => {
        if (controls[key].status != 'DISABLED')
          valid = false;
      });
      return valid;
    }
  }
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [];
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

  // protected getDocuments(): SaveDocumentsModel {

  //  let tabs = this.getTabs();
  //  let document = new Array<any>();
  //  for (var i = 0; i < tabs.length; i++) {
  //    if ((!tabs[i].isHidden || (tabs[i].isHidden && !tabs[i].isHidden(this))) && tabs[i].documentComponents.length > 0) {
  //      for (var j = 0; j < tabs[i].documentComponents.length; j++) {
  //        document.push(tabs[i].documentComponents[j].submitUploaders());
  //      }
  //    }
  //  }
  //  let sumittedDocuments = []
  //  if (document.length > 0) {
  //    sumittedDocuments = document.reduce(function (a, b) { return a.concat(b); });
  //  }
  //  let saveDocumentsModel = { SubmittedFileIds: sumittedDocuments }
  //  return saveDocumentsModel;
  //}

  // #region Tabs
  protected getTabs(): CustomTab[] {
    return [];
  };
  protected validateTabs(): boolean {
    let valid = true;
    let tabs = this.getTabs();
    let hiddenTabsCount = 0;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].isHidden != undefined && tabs[i].isHidden && tabs[i].isHidden(this)) {
        ++hiddenTabsCount;
      }
      if ((!tabs[i].isHidden || (tabs[i].isHidden && !tabs[i].isHidden(this)))
        && (tabs[i].isTabValid != null && !tabs[i].isTabValid(this)) || (!this.validateForm(tabs[i].form))) {
        valid = false;
        this.setTabFocus(tabs[i].tabIndex - hiddenTabsCount);
        let self = this;
        setTimeout(function () {
          //self.scrollUpToTabs();
          self.scrollUpToFirstError();
        });
        break;
      }

    }
    return valid;
  }
  //protected scrollUpToTabs(): void {
  //  let target;
  //  let fieldContainers = document.querySelectorAll('.ng-invalid .field-container');

  //  for (var i = 0; i < fieldContainers.length; i++) {
  //    if (fieldContainers[i].querySelector('.field-validation-error')) {
  //      target = fieldContainers[i];
  //      break;
  //    }
  //  }

  //  if (target)
  //    window.scrollTo({
  //      top: target.getBoundingClientRect().top + (window.scrollY - 110),
  //      behavior: 'smooth'
  //    });
  //}
  protected scrollUpToFirstError(): void {
    let target;
    let fieldContainers = document.querySelectorAll('.form-wrapper');
    for (var i = 0; i < fieldContainers.length; i++) {
      if (fieldContainers[i].querySelector('.form-validation')) {

        target = fieldContainers[i].querySelector('.form-validation');
        break;
      }
    }
    if (target) {

      let parent = target.parentElement;
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - parent.getBoundingClientRect().height,
        behavior: 'smooth',

      });
    }
  }
  protected setTabFocus(index: number) {
    this.activeTab = index;
  }
  public NavigatePrevious() {

    this.activeTab = this.activeTab - 1 < 0 ? 0 : this.activeTab - 1;
  }
  public NavigateNext() {
    this.activeTab = this.activeTab + 1 > this.getTabs().length ? this.getTabs.length : this.activeTab + 1;
  }

  protected getHiddenTabsCount(): number {
    let tabs = this.getTabs();
    let hiddenTabsCount = 0;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].isHidden != undefined && tabs[i].isHidden) {
        ++hiddenTabsCount;
      }
    }
    return hiddenTabsCount;
  }

  //#endregion
}
