import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { TicketModel } from '../../interfaces/ticket-model';
import { TicketDetailsService } from '../../services/ticket-details.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';

declare const $;

@Component({
  selector: 'app-ticket-details',
  templateUrl: './TicketDetails.component.html',
  styleUrls: ['./TicketDetails.component.css']
})

export class TicketDetailsComponent extends EServicesBase<TicketModel> implements OnInit {

  //// File Varibles 
  fileToUpload: File = null;
 
  uploadForm: any = null;

  //// API base URL
  public url: string = ConfigService.CRMAPI;
  //// Ticket Info
  public ticketModel: TicketModel;
  ticketId: string;
  public ticketNumber: string;
  public caseTitle: string;
  public caseDescription: string;
  public caseStatusArabic: string;
  public caseStatus: number;
   public caseAttachment: any;
  /// //// Reply Info
  public hasReply: boolean = false;
  public noteTitle: string;
  // public note: string;

  // //// Note ID
  public noteId: string;
  // //// Rating 
  public ratingScore: number;
  ratingComment: string;
  public note: string;
  public header: any = {};
  public pageId: string;

  constructor(public ticketDetailsService: TicketDetailsService,
    private http: HttpClient,
    protected ticketService: TicketDetailsService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router,
    protected api: APIService,
    protected formBuilder: FormBuilder) {

    super(ticketDetailsService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.uploadForm = this.formBuilder.group({ fileInput: [''] });

    activatedRoute.queryParams.subscribe(
      (params: any) => {
        
        this.GetTicketDetails(params.Id);
        SharedHelper.hideLoader();
        this.ticketId = params.Id;
      },
      (error) => {
        console.log("err", error);
      });
  }

  // // This function is to get the Detail of tickets with the reply 
  public GetTicketDetails(id: string): void {
    this.api.GetTicket(this.url + `cases/${id}/withreplies`).subscribe(
      (response: any) => {
       /// Ticket Detials
        this.caseStatus = Number(response.data.case.status);
        this.caseStatusArabic = response.data.case.statusNameArabic;
        this.ticketNumber = response.data.case.ticketNumber;
        this.caseTitle = response.data.case.caseTitle;
        this.caseDescription = response.data.case.description;
        this.ratingScore = response.data.case.rating;
        this.ratingComment = response.data.case.ratingComment;

        this.header.RequestNumber = response.data.case.ticketNumber;
        this.header.PortalStatusName = response.data.case.statusNameArabic;

        this.caseTitle = response.data.case.caseTitle;
        this.caseDescription = response.data.case.description;
        //// Reply Details  
        if (response.data.replies.length != 0) {
          this.hasReply = true;
          this.noteTitle = response.data.replies[0].subject;
          this.note = response.data.replies[0].body;
        }

       
        SharedHelper.hideLoader();
      },
      (error) => {
        console.log("err", error);
      });
  }

  onSubmit(form: NgForm) {
    debugger;
    if (!form.valid) {
      return false;
    }
    var data = form.value;

    // Praper the the Post Object
    var myPostObject = {
      reply: data.Description,
    }

    //this.ticketService.PostComment(this.noteId,this.uploadForm.get('fileInput').value, this.ticketId, myPostObject);
  //   // Add the comment to specific Ticket 
    this.api.PostComment<ApiGenericResponse<Response>>(this.url + `cases/${this.ticketId}/note`, myPostObject).subscribe(
      (data: any) => {
        // 1. Get file from html
        debugger;
        this.noteId = data.data.note.id;
        const formData: FormData = new FormData();
        formData.set('', this.uploadForm.get('fileInput').value);
        // 2. I should Get the GUID from thr response pass to function down
        this.UploadFile(formData, this.noteId);
      },
      (error) => {
        console.log("err", error);
      });
  }
 
  // // Upload the File attached with Comment
  public UploadFile(fileInput: any, ticketRef: string) {

    // this.ticketService.UploadFile(fileInput, ticketRef);
    this.api.PutFileNote<ApiGenericResponse<Response>>(this.url + `cases/${ticketRef}/noteattachments`, fileInput).subscribe(
      (data: any) => {
        // After Successfully Attached the attachment Reload the Page
        location.reload();
      },
      (error) => {
        console.log("err", error);
      });
  }

  // Hand the file uploaded by customer
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadForm.get('fileInput').setValue(this.fileToUpload);
  }

  public TApplicationNewInstance(): TicketModel {
    return new TicketModel();
  }

  public getQueryStringNames(): string[] {
    return null;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageId = params['Id']
    })
    debugger;
   
    this.api.GetTicket(this.url + `cases/${this.pageId}/withreplies`).subscribe(
      (response: any) => {
        SharedHelper.hideLoader();
        this.ratingScore = response.data.case.rating;
        var x = Number(this.ratingScore) - 1
        this.onStarClick(x);
      },
      (error) => {
        console.log("err", error);
      });
  }

  //// Below declearing the side menu components 
  Index1: boolean = true;
  formStructure: FormHierarchyBase[] = [
    {
      "index": 1,
      "label": "TicketManagement.TicketInfo",
      "type": NodeType.Parent,
    },
  ];

  //// Rating Part
  @Input() activeStars: number;
  stars = [1, 2, 3, 4, 5];

  onStarClick(index: number) {
    this.setStar(index);
  }

  private setStar(starNum) {
    this.activeStars = starNum + 1;
  }

  // This function is to rate the ticket.
  public RateTicket(rate: number, form: NgForm) {

    debugger;
    var data = form.value;
    var myPostObject = {
      "score": rate,
      "type": "1",
      "origin": "2",
      "incidentId": this.ticketId,
      "comment": data.Ticket
    }

    this.api.PutValue<ApiGenericResponse<Response>>(this.url + `CaseRating/`, myPostObject).subscribe(
      (data: any) => {
        // After Successfully Attached the attachment Reload the Page
        location.reload();
      },
      (error) => {
        console.log("err", error);
      });
  }
}

