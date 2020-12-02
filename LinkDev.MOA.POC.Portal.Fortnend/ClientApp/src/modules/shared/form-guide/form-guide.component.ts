import { Component, OnInit, AfterViewInit } from "@angular/core";

import { ClipboardService } from "ngx-clipboard";
import { HttpClient } from "@angular/common/http";
import { Mode } from "./utility/enums/enums";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GridColumn, ColumnFieldType } from "./grid/models/GridColumn";
import { NodeType } from "./form-hierarchy/node-type-enum";
import { FormHierarchyBase } from "./form-hierarchy/form-hierarchy-model";
import { TranslateService } from "@ngx-translate/core";
import { EntityReferenceItem } from "../Models/EntityReferenceItem.model";
import { AlertService } from "../services";
//import { ModalFormComponent } from './modal-form/modal-form.component';
import { GuardsCheckEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
    providers: [HttpClient],
    selector: "form-guide",
    templateUrl: "./form-guide.component.html",
    styleUrls: ["./form-guide.component.scss"]
})
export class FormGuideComponent implements OnInit, AfterViewInit {
    model;
    title = "Modon Portal";
    textBox: string;
    // Pagination
    page = 1;
    // Messages
    success: Mode = Mode.Success;
    error: Mode = Mode.Error;
    warning: Mode = Mode.Warning;
    empty: Mode = Mode.Empty;
    isPopUpOpened: boolean = false;
    activeFirstLevel: number = 1;
    activeSecondLevel: number = 2;
    selectedNode: FormHierarchyBase;
    currentRate = 6;
    formStructure: FormHierarchyBase[] = [
        {
            "index": 1,
            "label": "Request Data",
            "data": "request-data",
            "type": NodeType.Parent,
            "children": [{
                "index": 2,
                "label": "Basic Info",
                "data": "basic-info",
                "type": NodeType.Child,
                "children": [{ "index": 3, "label": "Expenses.doc", "data": "expenses-doc", "type": NodeType.Section },
                { "index": 4, "label": "Resume.doc", "data": "resume-document", "type": NodeType.Section }]
            },
            {
                "index": 5,
                "label": "Home",
                "data": "Home Folder",
                "type": NodeType.Child,
                "children": [{ "index": 6, "label": "Expenses.doc", "data": "expen;6ses-doc", "type": NodeType.Section },
                { "index": 7, "label": "Resume.doc", "data": "resume-document", "type": NodeType.Section }]
            }],
        },
        {
            "index": 8,
            "label": "Pictures",
            "data": "Pictures Folder",
            "type": NodeType.Parent,
            "children": [
                {
                    "index": 2,
                    "label": "Basic Info",
                    "data": "basic-info",
                    "type": NodeType.Child,
                    "children": [
                        { "index": 9, "label": "barcelona.jpg", "data": "Barcelona Photo", "type": NodeType.Section },
                        { "index": 10, "label": "logo.jpg", "type": NodeType.Section, "data": "PrimeFaces Logo" },
                        { "index": 11, "label": "primeui.png", "type": NodeType.Section, "data": "PrimeUI Logo" }
                    ]
                }
            ]
        },
        {
            "index": 12,
            "label": "Movies",
            "data": "Movies Folder",
            "type": NodeType.Parent,
            "children": [{
                "label": "Al Pacino",
                "data": "Pacino Movies",
                "type": NodeType.Child,
                "index": 15,
                "children": [{ "index": 13, "label": "Scarface", "type": NodeType.Section, "data": "Scarface Movie" },
                { "index": 14, "label": "Serpico", "type": NodeType.Section, "data": "Serpico Movie" }]
            },
            {
                "index": 16,
                "label": "Robert De Niro",
                "data": "De Niro Movies",
                "type": NodeType.Child,
                "children": [{ "index": 17, "label": "Goodfellas", "type": NodeType.Section, "data": "Goodfellas Movie" },
                { "index": 18, "label": "Untouchables", "type": NodeType.Section, "data": "Untouchables Movie" }]
            }]
        },
        {
            "index": 25,
            "label": "Single Section",
            "data": "single-section",
            "type": NodeType.Parent,
        },

    ];
    gridcols: GridColumn[] = [
        {
            header: "Tab 1", field: "EntertainmentActivityId",
            typeConfig: {
                type: ColumnFieldType.Number,
            }
        },
        {
            header: "Tab 2", field: "Description",
            typeConfig: {
                type: ColumnFieldType.Href,
                urlKey: "Description"
            }
        }
    ];;
    gridModel: EntertainmentShowActivity = new EntertainmentShowActivity();
    gridData: EntertainmentShowActivity[] = [
        { Id: "1", EntertainmentPermitShowId: "Developer", Description: "Krish", EntertainmentActivityId: "1000000", IsDeleted: false, IsUpdated: false },
        { Id: "2", EntertainmentPermitShowId: "Designer", Description: "Krish Designer", EntertainmentActivityId: "7", IsDeleted: false, IsUpdated: true },
        { Id: "3", EntertainmentPermitShowId: "Solution", Description: "Krish Solution", EntertainmentActivityId: "10", IsDeleted: false, IsUpdated: false },
    ];
    // Copy
    mainTitleHtml = `
 <h2 class="main-title">Section Title</h2>
 `;

    tooltipHtml = `
 <span ngbTooltip="Tooltip Text Content" triggers="mouseenter:mouseleave click" [autoClose]="'outside'">Tooltip</span>
 `;

    imgWrapperHtml = `
 <div class="row justify-content-center">
   <div class="img-wrapper">
       <img src='../assets/images/default-news-image.jpg'>
   </div>
 </div>
 `;

    textboxHtml = `
 <div class="col-12 col-md-4">
       <custom-text-box [label]="'Text Box'" [type]="'text'"></custom-text-box>
 </div>
 `;
    currencyInputHtml = `<div class="col-md-2">
 <currency-input [label]="'Currency'" [required]="true"></currency-input>
</div>`;
NumericInputHtml = `<div class="col-md-2">
 <currency-input [label]="'Numeric Input'" [required]="true" [numeric]="true"></currency-input>
</div>`;
    requiredTextboxHtml = `
 <div class="col-12 col-md-4">
   <div class="form-row" [ngClass]="{'required': true}">
       <label>Required Input<span>*</span></label>
       <custom-text-box [ngClass]="{'required': true}" [type]="'text'"></custom-text-box>
       <div class="form-validation">Please Enter a valid value</div>
   </div>
 </div>
 `;

    selectDropdownHtml = `
 <form class="general-form">
     <div class="form-wrapper form-padding">
       <div class="row">
         <div class="col-12 col-md-4" >
           <div class="form-row">
             <mutliselect id="selectDropdown" name="selectDropdown"
                          [label]="'Single Select DropDown'"
                          [propertyToSelect]="'Value'"
                          [options]="dropdownOptions"
                          [viewMode]="true"
                          [multiple]="false"
                          [config]="config"
                          [(data)]="dataModel">
             </mutliselect>
           </div>
         </div>
       </div>
     </div>
   </form>
 `;

    multiSelectHtml = `
 <form class="general-form">
     <div class="form-wrapper form-padding">
       <div class="row">
         <div class="col-12 col-md-4" #multiSelectContainer>
           <div class="form-row">
             <mutliselect id="mutliselect" name="mutliselect"
                          [propertyToSelect]="'Value'"
                          [label]="'New Multiple Select DropDown'"
                          [options]="dropdownOptions"
                          [viewMode]="false"
                          [multiple]="true"
                          [config]="config"
                          [(data)]="SelectedValues"
                          [specifySearchPlaceholder]="true" 
                          [searchlabel]="'Search label'">
             </mutliselect>
           </div>
         </div>
       </div>
     </div>
   </form>
 `;

    passwordHtml = `
 <div class="col-12 col-md-4">
   <div class="form-row">
       <password-textbox [label]="'Password Textbox'" [strength]='true'></password-textbox>
   </div>
 </div>
 `;

    islamicDatepickerHtml = `
 <div class="col-12 col-md-4">
   <div class="form-row">
       <label>Islamic Date Picker</label>
       <ngbd-datepicker-islamiccivil></ngbd-datepicker-islamiccivil>
   </div>
 </div>
 `;
    datepickerHtml = `
 <div class="col-12 col-md-4">
     <div class="form-row">
         <label>Date Picker</label>
         <ngbd-datepicker-popup></ngbd-datepicker-popup>
     </div>
 </div>
`;

    timepickerHtml = `
 <div class="col-12 col-md-4">
     <div class="form-row">
         <label>Date Picker</label>
         <ngbd-datepicker-popup [time]='true'></ngbd-datepicker-popup>
     </div>
 </div>
`;
    datetimepickerHtml = `
 <div class="col-12 col-md-4">
     <div class="form-row">
         <label>Date Picker</label>
         <ngbd-datepicker-popup [datetime]='true'></ngbd-datepicker-popup>
     </div>
 </div>
`;
    textareaHtml = `
 <div class="col-12 col-md-4">
    <label>Textarea<span class="required"> *</span></label>
    <textarea placeholder="Please enter a description"></textarea>  
 </div>
 `;

    checkboxHtml = `
 <div class="col-12 col-md-4">
   <div class="form-row">
       <label>Checkbox</label>
       <label class="check-box-container">
           <p class="txt-wrapper">To verify <a class="item-link underline" href="#">Terms and conditions</a> kindly check this item</p>
           <input type="checkbox" [checked]=true (change)="checked = !checked">
           <span class="checkmark"></span>
       </label>
   </div>
 </div>
 `;

    counterHtml = `
 <div class="col-2 col-md-4">
   <div class="form-row">
     <label>Vertical Counter</label>
     <counter></counter>
   </div>
 </div>
 `;

    horizontalCounterHtml = `
 <div class="col-2 col-md-4">
   <div class="form-row">
     <label>Horizontal Counter</label>
     <counter class="horizontal"></counter>
   </div>
 </div>
 `;

    radioHtml = `
 <div class="col-12 col-md-4">
   <div class="custom-radio">
     <input type="radio" id="radio1" name="radio-group" [checked]="true">
     <label for="radio1">Radio Input</label>
   </div>
 </div>
 `;

    disabledRadioHtml = `
 <div class="col-2 col-md-4">
   <div class="form-row">
     <div class="custom-radio readonly">
       <input type="radio" id="radio2" name="radio-group">
       <label for="radio2">Readonly Radio Input</label>
     </div>
   </div>
 </div>
 `;

    toggleHtml = `
 <div class="col-2 col-md-4">
   <div class="form-row">
       <label>Toggle Button</label>
       <btn-toggle (changed)="checked=$event" [id]="toggleid || false" text="Toggle Button Label"></btn-toggle>
   </div>
 </div>
 `;

    modalHtml = `
 <div class="col-12 col-md-4" #modalContainer>
     <div class="form-row">
         <label>Modal Form</label>
         <button class="main-btn" (click)="openFormModal()">Open Modal</button>
     </div>
 </div>
 `;

    //   uploadHtml = `
    //  <div class="col-12 col-md-4">
    //    <div class="form-row">
    //        <label>Upload Input</label>
    //        <file-upload (fileChanged)='onFileChanged($event)' [allowedTypes]="'.png,.jpeg,.jpg'"></file-upload>
    //    </div>
    //  </div>
    //  `;

    richHtml = `
 <div class="col-12">
   <div class="form-row">
       <label>Rich HTML Component</label>
       <rich-html></rich-html>
   </div>
 </div>
 `;

    mainbtnHtml = `
 <div class="col-12">
   <div class="form-row">
       <button type="button" class="main-btn">Main Button</button>
   </div>
 </div>
 `;

    secbtnHtml = `
 <div class="col-12">
   <div class="form-row">
       <button type="button" class="main-btn-secondary">Secondary Button</button>
   </div>
 </div>
 `;
    secbtnPinkHtml = `
 <div class="col-12 col-md-6 align-self-md-end">
   <button type="button" class="secondary-btn">Retrieve Manager Data</button>
 </div>
 `;

    disabledBtnsHtml = `
 <div class="col-12">
   <div class="form-row">
       <button type="button" class="main-btn" disabled>
           Disabled Main Button
       </button>
       <button type="button" class="main-btn-secondary" disabled>
           Disabled Secondary Button
       </button>
   </div>
 </div>
 `;

    spaceBtwBtnsHtml = `
 <div class="row justify-content-between no-gutters">
   <div class="form-row">
       <label>Buttons With Space Between</label>
   </div>
   <button type="button" class="main-btn">Main button</button>
   <button type="button" class="main-btn-secondary">Secondary button</button>
 </div>
 `;

    centerBtnsHtml = `
 <div class="row justify-content-center no-gutters">
   <div class="form-row">
       <label>Buttons Centered</label>
   </div>
   <button type="button" class="main-btn">Main button</button>
   <button type="button" class="main-btn-secondary">Secondary button</button>
 </div>
 `;

    tabsHtml = `
 <form class="general-form">
   <div class="form-wrapper form-padding">
       <div class="gea-tabs">
           <ngb-tabset type="pills">
               <ngb-tab>
                   <ng-template ngbTabTitle></i>Tab Title1</ng-template>
                   <ng-template ngbTabContent>
                       <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
                   </ng-template>
               </ngb-tab>
               <ngb-tab>
                   <ng-template ngbTabTitle>
                       <i class="icon-multiple-users-silhouette"></i>Tab Title2</ng-template>
                   <ng-template ngbTabContent>
                       <p>Tab Content2 Tab Content2 Tab Content2 Tab Content2 Tab Content2.</p>
                   </ng-template>
               </ngb-tab>
               <ngb-tab title="Disabled" [disabled]="true">
                   <ng-template ngbTabContent>
                       <p>Tab Content3 Tab Content3 Tab Content3 Tab Content3 Tab Content3.</p>
                   </ng-template>
               </ngb-tab>
           </ngb-tabset>
       </div>
   </div>
 </form>
 `;

    tabsScrollHtml = `
 <form class="general-form">
 <div class="form-wrapper form-padding">
     <div class="gea-tabs">
         <mat-tab-group>
             <mat-tab label="First">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Second">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
             <mat-tab label="Third">
                 <p>Tab Content1 Tab Content1 Tab Content1 Tab Content1 Tab Content1.</p>
             </mat-tab>
         </mat-tab-group>
     </div>
 </div>
</form>
 `;
    tabsActionslHtml = `
   <div #tabsActionsContainer class="col-12 form-footer position-relative p-0 d-flex flex-column justify-content-center flex-md-row justify-content-md-between">
             <div>
               <button type="button" class="main-btn">Submit</button>
               <button type="button" class="main-btn-secondary">Save as Draft</button>
               <button type="button" class="main-btn-secondary">Cancel</button>
             </div>
             <div class="tab-nav-wrapper">
               <a aria-label="Next" title="{{'NEXT'|translate}}" class="prev" (click)="NavigatePrevious()"></a>
               <a aria-label="Prev" title="{{'PREVIOUS'|translate}}" class="next" (click)="NavigateNext()"></a>
             </div>
           </div>
`;
    filterHtml = `
 <form class="general-form">
 <div class="form-wrapper form-padding">
     <div class="filter-wrapper grey-bg">
         <form class="form-horizontal form-wrapper form-padding" role="form">
             <label>Filter By</label>
             <div class="row filter-container">
                 <div class="col-12 col-md-3">
                    <custom-text-box [label]="'Name'" [type]="'text'"></custom-text-box>
                 </div>
                 <div class="col-12 col-md-3">
                     <div class="form-row">
                         <mutliselect id="selectDropdown" name="selectDropdown" [propertyToSelect]="'Value'" [label]="'Venue Type'"
                             [options]="dropdownOptions" [viewMode]="false" [multiple]="false"
                             [config]="config">
                         </mutliselect>
                     </div>
                 </div>
                 <div class="col-12">
                     <div class="form-row align-items-center h-100">
                         <button type="button" (click)="filterPermits()" class="main-btn">Filter</button>
                         <a href="#" (click)="resetPermitfiltration()" title=""
                             class="d-inline-block w-auto reset">Reset
                             Filter</a>
                     </div>
                 </div>
             </div>
         </form>
     </div>
 </div>
</form>
 `;
    galleryHtml = `
           <div class="form-wrapper form-padding">
               <div class="row justify-content-center">
                   <div class="col-12 col-md-8">
                       <ngb-carousel>
                           <ng-template ngbSlide>
                               <div class="picsum-img-wrapper">
                                   <img src="./assets/images/home-bg.png" alt="Random first slide">
                               </div>
                           </ng-template>
                           <ng-template ngbSlide>
                               <div class="picsum-img-wrapper">
                                   <img src="./assets/images/default-gallery.png" alt="Random second slide">
                               </div>
                           </ng-template>
                           <ng-template ngbSlide>
                               <div class="picsum-img-wrapper">
                                   <img src="./assets/images/home-bg.png" alt="Random third slide">
                               </div>
                           </ng-template>
                       </ngb-carousel>
                   </div>
               </div>
           </div>
 `;
    detailsGridHtml = `
 <form class="general-form">
   <div class="form-wrapper form-padding">
       <section class="order-grid">
           <h4 class="card-title">Details Table</h4>
           <table class="table-strip space-between">
               <tr>
                   <td>Order1</td>
                   <td>2650 SAR</td>
               </tr>
               <tr>
                   <td>Order2</td>
                   <td>2650 SAR</td>
               </tr>
               <tr>
                   <td>Order3</td>
                   <td>2650 SAR</td>
               </tr>
           </table>
       </section>
   </div>
 </form>
 `;

    gridHtml = `
    <form #gridForm="ngForm">
        <app-grid [modalFormTitle]="'Form Title'"
                [addNewRecord]="'Add New Record'"
                [tableHeadTitle]="'Table Title'"
                [(data)]="gridData"
                [columns]="gridcols"
                [(model)]="gridModel"
                [canAdd]="true"
                [canEdit]="true"
                [canDelete]="true"
                [templateForm]="gridForm"
                [(popUpOpened)]="isPopUpOpened"
                [template]="gridContent">
        <ng-container #gridContent>
            <div class="row">
            <div class="col-12">
                <div class="form-row">
                <!--TOOL-->
                <custom-text-box [type]="'text'" [label]="'label'" [isRequiredLabel]="true">
                </custom-text-box>
                </div>
            </div>
            </div>
        </ng-container>
        </app-grid>
    </form>
 `;

    paginationHtml = `
 <ngb-pagination [collectionSize]="70" [(page)]="page" [maxSize]="5" aria-label="Default pagination" [pageSize]="5"></ngb-pagination>
 `;
    alertsHtml = `
           <div class="col-12">
               <div class="alert alert-primary alert-dismissible fade show" role="alert">
                   This is a primary alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-secondary alert-dismissible fade show" role="alert">
                   This is a secondary alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-success alert-dismissible fade show" role="alert">
                   This is a success alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-danger alert-dismissible fade show" role="alert">
                   This is a danger alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-warning alert-dismissible fade show" role="alert">
                   This is a warning alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-info alert-dismissible fade show" role="alert">
                   This is a info alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-dark alert-dismissible fade show" role="alert">
                   This is a dark alert—check it out!
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
               </button>
               </div>
           </div>
           <div class="col-12">
               <div class="alert alert-light alert-dismissible fade show" role="alert">
               <i class="icon-info"></i>This is a light alert—check it out!
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
               </div>
           </div>
 `;
    // sucMsgHtml = `
    // <message [mode]="success"></message>
    // `;

    // errMsgHtml = `
    // <message [mode]="error"></message>
    // `;

    // warMsgHtml = `
    // <message [mode]="warning"></message>
    // `;

    // checkbox
    public checked: boolean = true;

    // drop down viewed options
    selectedOptions = ["Ahmed", "Abdelaziz"];

    // Dropdown options
    singleSelect = ["Egyptian"];
    dropdownOptions = [];
    dataModel: number = 1;
    // Dropdown Configurations
    // config = {
    //     displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    //     search: true, //true/false for the search functionlity defaults to false,
    //     placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    //     noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    //     searchPlaceholder: "Search" // label thats displayed in search input,
    //     //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    // };
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
    //popup inputs
    modalTitle = "modal title";
    modalBody =
        "modal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgdmodal body cfgfdgd ";
    objectsArray: any = [];
    //Modal//

    constructor(private modalService: NgbModal, protected translateService: TranslateService, private alertService: AlertService, private router: Router, private titleService: Title) {
        this.configureMutliSelectConfiguration();
        this.SelectedValues = new EntityReferenceItem();
        this.titleService.setTitle('Modon | Form guide');
    }
    //private _clipboardService: ClipboardService
    //  openFormModal() {
    //    const modalRef = this.modalService.open(ModalFormComponent);
    //    modalRef.componentInstance.id = 10; // should be the id

    //    modalRef.result.then((result) => {
    //      console.log(result);
    //    }).catch((error) => {
    //      console.log(error);
    //    });
    //  }

    SelectedValues: any;
    ngOnInit() {
        this.dropdownOptions = [
            { Value: 0, Text: "Ahmed" },
            { Value: 1, Text: "Carol" },
            { Value: 2, Text: "Rehan" }
        ];
        // this.SelectedValues= this.dropdownOptions[1];
        // console.log(this.SelectedValues)
        // console.log(this.dropdownOptions[1])
        this.dataModel = 1;

    }

    onSelect = (node: FormHierarchyBase) => {
        this.selectedNode = node;
    }
    ngAfterViewInit() {
        this.SelectedValues = 2;

    }

    onClickedOutside(e: Event) {
        setTimeout(() => {
            console.log("Clicked outside:", e);
        }, 100);
    }
    SubmitSuccess() {
        this.alertService.success("Request Submitted Succesfully", "workspace", 'Click here');
        this.router.navigateByUrl('/notification');
    }
    SubmitError() {
        this.alertService.error("Request Failed", "workspace", 'Click here');
        this.router.navigateByUrl('/notification');
    }
    SubmitWarning() {
        this.alertService.warning("Warning", "workspace", 'Click here');
        this.router.navigateByUrl('/notification');
    }
    // SubmitInfo(){
    //     this.alertService.info("Info", "workspace", 'Click here');
    //     this.router.navigateByUrl('/notification');
    // }
    // copy(text: string){
    //   this._clipboardService.copyFromContent(text);
    // }

    emailOnBlur(Event) { }

    onFileChanged(Event) { }

}




export class EntertainmentShowActivity {
    Id?: string;
    EntertainmentPermitShowId?: string;
    Description: string;
    EntertainmentActivityId?: string;
    IsDeleted: boolean = false;
    IsUpdated: boolean = false;
}

