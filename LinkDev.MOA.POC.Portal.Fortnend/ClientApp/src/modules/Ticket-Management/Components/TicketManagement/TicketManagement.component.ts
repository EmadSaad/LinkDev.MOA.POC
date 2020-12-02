import { Component, OnInit, ViewChild } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { TicketModel } from '../../interfaces/ticket-model';
import { TicketManagementService } from '../../services/ticket-management.service';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { ContactDetails } from 'src/modules/Contract-Submission-Backup/interfaces/contact-details';
import { TestUser } from 'src/modules/shared/Common/Bidding/models/BiddingModel';
import { NgForm, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';

declare const $;

@Component({
  selector: 'app-Ticket-Managment',
  templateUrl: './TicketManagement.component.html',
  styleUrls: ['./TicketManagement.component.css']
})

export class TicketManagementComponent extends EServicesBase<TicketModel> implements OnInit {
  uploadStatus: number;
  form: any;
  fileToUpload: File = null;
  uploadForm: any = null;
  @ViewChild("popup") popUpTemplate: any;

  constructor(public ticketManagemntService: TicketManagementService,
    private http: HttpClient,
    protected requestService: TicketManagementService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    protected api: APIService,
    protected formBuilder: FormBuilder) {
    super(ticketManagemntService, lookupService, activatedRoute, alertService, translateService, modalService, router);

    this.uploadForm = this.formBuilder.group({ fileInput: [''] });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadForm.get('fileInput').setValue(this.fileToUpload);
  }

  public url: string = ConfigService.CRMAPI;
  caseTitle: string;
  description: any;
  origin: any;
  customerId: any;
  contactId: any;
  caseType: string;
  caseNote: any;
  customerNature: any;
  division: any;
  subdivision: any;
  incidentCategory: any;
  caseTitleField: any;
  fileData: File = null;
  isRequestValid: boolean = false;
  isSubmit: boolean = false;
  getContact: boolean = false;
  isCurrentCR: boolean;
  currentCR: CRModel = {};
  contactsList: ContactDetails[];
  isCurrentContract: boolean;
  contactDetailsfromContract: ContactDetails[];
  currentUser: TestUser;
  ticketNumber: string;

  //// This is for sumbit button
  onSubmit(form: NgForm) {
    debugger;
    if (!form.valid) {
      return false;
    }
    var data = form.value;
    debugger;
    var myPostObject = {
      CaseTitle: data.CaseTitle,
      Description: data.Description,
      Origin: "1",
      CustomerID: data.CRId,
      ContactID: this.Application.Request.Contacts,
      CaseType: data.CaseType,
      PartnerType: "1",
      DivisionType: "1",
      Division: "67a092ba-12fd-e811-80de-00155d26b817",
      Subdivision: "21b8aaa0-0f25-ea11-a990-000d3a46f0d9",
      IncidentCategory: "C3C177FE-410D-EB11-B815-005056AEEE22"
    }

    this.api.Put<ApiGenericResponse<Response>>(this.url + "cases", myPostObject).subscribe(
      (data: any) => {
        // 1. Page redirect when getting response
        this.router.navigate(['/workspace']);
        // 2. Get file from html
        const formData: FormData = new FormData();
        formData.set('', this.uploadForm.get('fileInput').value);
        // 3. I should Get the GUID from thr response pass to function down
        this.UploadFile(formData, data.data.case.id)
        // 4. Get the case id and pass to the method below
        this.ShowTicketConfirmation(data.data.case.id)
      },
      (error) => {
        console.log("err", error);
      });
  }

  // This function is to upload the attahment
  public UploadFile(fileInput: any, ticketRef: string) {
    this.api.PutValue<ApiGenericResponse<Response>>(this.url + `cases/${ticketRef}/attachments`, fileInput).subscribe(
      (data: any) => {
      },
      (error) => {
        console.log("err", error);
      });
  }

  //// Pop to return the ticket Number
  public ShowTicketConfirmation(caseId: string): void {
    //1. Get the value of the case pass to API
    this.api.GetTicket<ApiGenericResponse<Response>>(this.url + `cases/${caseId}/withreplies`).subscribe(
      (data: any) => {
        // 2. Show the the content form the response
        console.log(data.data.case.ticketNumber);
        this.ticketNumber = data.data.case.ticketNumber;
        this.modalService.open(this.popUpTemplate, { size: 'sm', backdrop: 'static' });
      },
      (error) => {
        console.log("err", error);
      });
  }

  public TApplicationNewInstance(): TicketModel {
    return new TicketModel();
  }

  public getQueryStringNames(): string[] {
    return null;
  }

  SubmitDocuments() {
    var isvalidDoc = this.validateDocuments();
    if (isvalidDoc) {
      this.submitForm();
    }
  }
  //#endregion

  ngOnInit() {
    debugger;
    // CR List
    this.ticketManagemntService.GetCRsByTypeByContactId(1).subscribe(
      res => {
        this.lookupService.handleRetrievedLookup(res.Content);
      })

    // Languages
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
      SharedHelper.hideLoader();
  }

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text',// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };

  //// Below declearing the side menu components 
  Index1: boolean = true;
  formStructure: FormHierarchyBase[] = [
    {
      "index": 1,
      "label": "TicketManagement.TicketInfo",
      "type": NodeType.Parent,
    },
  ];

  //// Praper the uploader to be in this page
  protected afterFormReady(): void {
    debugger;
    if (this.Application.Request.Contacts != null &&
      this.Application.Request.Contacts.length > 0 &&
      this.lookupService.lookupEntities['ldv_contactdetails_ContactDetails']) {
    }

    if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
      this.GetContactDetailsByCR();
      this.lookupService.lookupEntities['account_CRsByTypeInvestor'] = [
        { Text: this.Application.Request.CRName, Value: this.Application.Request.CRId }
      ];

    }
    
  }

  public cRChanged() {
    this.isRequestValid = true;
    this.isSubmit = false;
    if (this.Application.Request.CRId != undefined && this.Application.Request.CRId != "") {
      this.GetContactDetailsByCR();
    }
  }


  protected GetContactDetailsByCR() {
    if (!this.getContact) {
      this.getContact = true

      this.requestService.getCRContacts(this.Application.Request.CRId).subscribe(
        res => {
          this.getContact = false;
          if (res.ResponseCode === ResponseCode.Success) {

            this.lookupService.handleRetrievedLookup(res.Content);
            if (this.Application.Request.Contacts != null &&
              this.Application.Request.Contacts.length > 0) {
            }
          }
        }
      );
    }
  }

  
}
