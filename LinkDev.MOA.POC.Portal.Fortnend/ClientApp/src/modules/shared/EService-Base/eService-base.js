"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_post_entity_request_1 = require("../Models/api-post-entity-request");
var api_get_entity_response_model_1 = require("../Models/api-get-entity-response.model");
var shared_helper_1 = require("../services/shared-helper");
var EServicesBase = /** @class */ (function () {
    function EServicesBase(requestService, lookupService, activatedRoute, alertService, translateService) {
        this.requestService = requestService;
        this.lookupService = lookupService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.translateService = translateService;
        this.activeTab = 0;
        this.showErrorPopup = false;
        this.isBack = false;
        this.hasError = false;
        this.isDraft = false;
        this.isLookupsLoaded = false;
        this.isApplicationLoaded = false;
        this.isFormReady = false;
        this.isFormReadyEventEmitter = new core_1.EventEmitter();
        this.isSaveApplication = false;
        this.isSubmitted = false;
        this.activeTab = 0;
        this.Application = new api_get_entity_response_model_1.ApiGetEntityResponse();
        this.Application.Request = this.TApplicationNewInstance();
    }
    EServicesBase.prototype.ngOnInit = function () {
        this.serviceParams = this.getQueryStringNames();
        this.beforeInitForm();
        this.initForm();
    };
    EServicesBase.prototype.beforeInitForm = function () { };
    EServicesBase.prototype.initForm = function () {
        this.loadLookups();
        this.loadApplication();
        this.extendInitForm();
    };
    EServicesBase.prototype.extendInitForm = function () { };
    EServicesBase.prototype.loadLookups = function () {
        var _this = this;
        var lookups = this.getLookupTypes();
        if (lookups && lookups.length > 0) {
            this.lookupService.loadLookups(lookups).subscribe(function (result) {
                _this.isLookupsLoaded = result;
                _this.setFormIsReady();
            });
        }
    };
    EServicesBase.prototype.loadApplication = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (p) {
            var queryString = "";
            for (var i = 0; i < _this.serviceParams.length; i++) {
                queryString = _this.serviceParams[i] + "=" + p[_this.serviceParams[i]] + "&";
            }
            _this.requestService.get(queryString).subscribe(function (result) {
                _this.Application = result.Content;
                _this.isApplicationLoaded = true;
                _this.setFormIsReady();
            });
        });
    };
    EServicesBase.prototype.handleRetrievedApplication = function (application) {
    };
    EServicesBase.prototype.setFormIsReady = function () {
        if (this.isLookupsLoaded && this.isApplicationLoaded) {
            this.isFormReady = true;
            this.isFormReadyEventEmitter.emit();
            this.afterFormReady();
            this.showpopup();
            //hide loader      
        }
    };
    EServicesBase.prototype.afterFormReady = function () { };
    EServicesBase.prototype.saveForm = function () {
        var _this = this;
        this.isSubmitted = false;
        setTimeout(function () {
            if (_this.validateTabs() && _this.validateApplicationBeforeSave()) {
                _this.preSaveApplication();
                _this.saveApplication(_this.Application.Request);
            }
        });
    };
    EServicesBase.prototype.submitForm = function () {
        var _this = this;
        this.isSubmitted = true;
        setTimeout(function () {
            if (_this.validateTabs() && _this.validateDocuments()) {
                _this.preSaveApplication();
                _this.preSubmitApplication();
                _this.saveApplication(_this.Application.Request);
            }
        });
    };
    EServicesBase.prototype.preSaveApplication = function () { };
    EServicesBase.prototype.preSubmitApplication = function () { };
    EServicesBase.prototype.validateApplicationBeforeSave = function () {
        return true;
    };
    EServicesBase.prototype.saveApplication = function (application) {
        var _this = this;
        shared_helper_1.SharedHelper.showLoader();
        var postApplication = new api_post_entity_request_1.ApiPostEntityRequest();
        postApplication.Request = application;
        postApplication.IsSubmitted = this.isSubmitted;
        postApplication.UploadersCollection = this.getDocuments();
        this.requestService.post(postApplication).subscribe(function (result) {
            if (_this.isSubmitted) {
            }
            else {
                _this.translateService.get('SAVE_DRAFT_MESSSAGE', { value: result.RequestNumber })
                    .subscribe(function (res) {
                    _this.showpopup();
                });
            }
        });
    };
    EServicesBase.prototype.showpopup = function () {
        this.alertService.success("asdasdads");
    };
    EServicesBase.prototype.validateForm = function (form) {
        if (form.valid) {
            return true;
        }
        else {
            var valid_1 = true;
            var controls_1 = form.controls;
            Object.keys(controls_1).forEach(function (key) {
                if (controls_1[key].status != 'DISABLED')
                    valid_1 = false;
            });
            return valid_1;
        }
    };
    EServicesBase.prototype.getLookupTypes = function () {
        return [];
    };
    EServicesBase.prototype.validateDocuments = function () {
        var tabs = this.getTabs();
        var isDocumentValid = true;
        for (var i = 0; i < tabs.length; i++) {
            if ((!tabs[i].isHidden || (tabs[i].isHidden && !tabs[i].isHidden(this))) && tabs[i].documentComponents.length > 0) {
                for (var j = 0; j < tabs[i].documentComponents.length; j++) {
                    if (!tabs[i].documentComponents[j].validateUploaders()) {
                        isDocumentValid = false;
                        return isDocumentValid;
                    }
                }
            }
        }
        return isDocumentValid;
    };
    EServicesBase.prototype.getDocuments = function () {
        var tabs = this.getTabs();
        var document = new Array();
        for (var i = 0; i < tabs.length; i++) {
            if ((!tabs[i].isHidden || (tabs[i].isHidden && !tabs[i].isHidden(this))) && tabs[i].documentComponents.length > 0) {
                for (var j = 0; j < tabs[i].documentComponents.length; j++) {
                    document.push(tabs[i].documentComponents[j].submitUploaders());
                }
            }
        }
        var sumittedDocuments = [];
        if (document.length > 0) {
            sumittedDocuments = document.reduce(function (a, b) { return a.concat(b); });
        }
        var saveDocumentsModel = { SubmittedFileIds: sumittedDocuments };
        return saveDocumentsModel;
    };
    // #region Tabs
    EServicesBase.prototype.getTabs = function () {
        return [];
    };
    ;
    EServicesBase.prototype.validateTabs = function () {
        var valid = true;
        var tabs = this.getTabs();
        var _loop_1 = function () {
            if ((!tabs[i].isHidden || (tabs[i].isHidden && !tabs[i].isHidden(this_1)))
                && !this_1.validateForm(tabs[i].form) || (tabs[i].isTabValid != null && !tabs[i].isTabValid(this_1))) {
                valid = false;
                this_1.setTabFocus(tabs[i].tabIndex);
                var self_1 = this_1;
                setTimeout(function () {
                    self_1.scrollUpToTabs();
                    self_1.scrollUpToFirstError();
                });
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0; i < tabs.length; i++) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        return valid;
    };
    EServicesBase.prototype.scrollUpToTabs = function () {
        var target;
        var fieldContainers = document.querySelectorAll('.ng-invalid .field-container');
        for (var i = 0; i < fieldContainers.length; i++) {
            if (fieldContainers[i].querySelector('.field-validation-error')) {
                target = fieldContainers[i];
                break;
            }
        }
        if (target)
            window.scrollTo({
                top: target.getBoundingClientRect().top + (window.scrollY - 110),
                behavior: 'smooth'
            });
    };
    EServicesBase.prototype.scrollUpToFirstError = function () {
        var target;
        var fieldContainers = document.querySelectorAll('.field-container');
        for (var i = 0; i < fieldContainers.length; i++) {
            if (fieldContainers[i].querySelector('.field-validation-error')) {
                target = fieldContainers[i];
                break;
            }
        }
        if (target)
            window.scrollTo({
                top: target.getBoundingClientRect().top + (window.scrollY - 110),
                behavior: 'smooth'
            });
    };
    EServicesBase.prototype.setTabFocus = function (index) {
        this.activeTab = index;
    };
    EServicesBase.prototype.NavigatePrevious = function () {
        this.activeTab = this.activeTab - 1 < 0 ? 0 : this.activeTab - 1;
    };
    EServicesBase.prototype.NavigateNext = function () {
        this.activeTab = this.activeTab + 1 > this.getTabs().length ? this.getTabs.length : this.activeTab + 1;
    };
    return EServicesBase;
}());
exports.EServicesBase = EServicesBase;
//# sourceMappingURL=eService-base.js.map