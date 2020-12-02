import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { AvailableTimesGetModel } from '../../interfaces/interview/AvailableTimesGetModel';
import { NgForm } from '@angular/forms';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { AvailableTimesWithDuration } from '../../interfaces/interview/AvailableTimesWithDuration';
import { Guid } from 'guid-typescript';
import { AvailableTime } from '../../interfaces/interview/AvailableTime';
import { TranslateService } from '@ngx-translate/core';
import { InterviewParameter, InterviewDecision } from '../../interfaces/interview/InterviewParameter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { AlertService } from 'src/modules/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  @Input() requestId: string;
  @Input() config: any;

  getModel: AvailableTimesGetModel={RequestId:this.requestId}
  options: AvailableTime[];
  isPeriodsLoaded: boolean = false;
  selectedTime: string;
  selectPeriodSubmit: boolean = false;
  submit: boolean = false;
  actions: any[]=[];
  selectedAction: string;
  postModel: InterviewParameter={ContractSubmissionID:this.requestId}
  canSubmit: boolean = false;
  error: string;

  submitUrlLink: string = 'workspace';
  submitUrlLabel: string = 'LAYOUT.WORKSPACE';
  
  //#region Forms
  @ViewChild('SelectPeriod') selectPeriod: NgForm;
  @ViewChild('MainForm') mainForm: NgForm;
  //#endregion

  

  constructor(public api : APIService, public translate: TranslateService, public alertService: AlertService,public router: Router) { }

  ngOnInit() {
    debugger;
    this.translate.get("ContractSubmission.SelectTime").subscribe(
      sel => {
        this.translate.get("ContractSubmission.Postpone").subscribe(
          pos =>{
            debugger;
            this.actions.push({Text:sel,Value:"1"});
            this.actions.push({Text:pos,Value:"0"});
          }
        )
      }
    )

  }

  ngOnChanges(changes)
  {
    if(changes['requestId'])
    {
      this.getModel.RequestId = this.requestId;
      this.postModel.ContractSubmissionID = this.requestId;
    }
  }
  

  getAvailableTime()
  {
    this.error = null;
    this.selectPeriodSubmit=true;
    if(this.selectPeriod.valid)
    {
      SharedHelper.showLoader();
      this.api.Post<ApiGenericResponse<AvailableTimesWithDuration>>("api/Interview/GetAvialbleTime",this.getModel).subscribe(
        res=>{
          if(res.ResponseCode === ResponseCode.Success)
          {
            this.options = res.Content.AvailableTimes;
            this.isPeriodsLoaded = true;
            SharedHelper.hideLoader();
          }
          else
          {
            this.error = res.FriendlyResponseMessage;
            SharedHelper.scrollToBody();
            SharedHelper.hideLoader();
          }
        }
      )
    }
  }
  
  handleSelectedTime()
  {
    debugger;
    let Selected = this.options.find(x => x.Value === this.selectedTime);
    this.postModel.From = Selected.From;
    this.postModel.To = Selected.To;
    this.postModel.ResourceID = Selected.Resource;

  }
  submitForm()
  {
    this.error = null;
    this.submit = true;
    this.selectPeriodSubmit = true;
    if((this.selectedAction === '0' && this.mainForm.valid) || (this.selectedAction === '1' && this.mainForm.valid && this.selectPeriod.valid))
    {
      SharedHelper.showLoader();
      this.handleAction();
      if(this.selectedAction === '1')
        this.handleSelectedTime();
      this.api.Post<ApiGenericResponse<string>>("api/Interview/PostInterviewPostponeOrReservationDecision",this.postModel).subscribe(
        res => {
          debugger;
          if(res.ResponseCode === ResponseCode.Success)
          {
            if(this.selectedAction === '1')
            {
              this.translate.get('ContractSubmission.InterviewTimeSelectedSuccessfully')
                .subscribe(translationResult => {
                  SharedHelper.hideLoader();
                  this.alertService.success(translationResult, this.submitUrlLink, this.submitUrlLabel);
                });
            }
            else
            {
              this.translate.get('ContractSubmission.InterviewPostponedSuccessfully')
                .subscribe(translationResult => {
                  SharedHelper.hideLoader();
                  this.alertService.success(translationResult, this.submitUrlLink, this.submitUrlLabel);
                });
            }
            this.router.navigateByUrl('/notification');
          }
          else
          {
            this.error = res.FriendlyResponseMessage;
            SharedHelper.scrollToBody();
            SharedHelper.hideLoader();
          }
        }
      )
    }
  }
  handleAction()
  {
    debugger;
    switch (this.selectedAction){
      case '0':
        this.postModel._InterviewDecision = InterviewDecision.postpon;
        break;
      case '1':
        this.postModel._InterviewDecision = InterviewDecision.Reservation;
        break;
    }

  }

}
