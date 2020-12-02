import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { AlertService } from 'src/modules/shared/services';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { FiltrationBase } from 'src/modules/workspace/interfaces/filtration-base';
import { IGridResultBase } from 'src/modules/workspace/interfaces/GridResultBase.interface';
import { IRequestsResult } from 'src/modules/workspace/interfaces/RequestResult.interface';
import { WorkspaceRequestStatistics } from 'src/modules/workspace/interfaces/WorkspaceRequestStatistics.interface';
import { SharedService } from 'src/modules/workspace/services/shared.service';
import { CaseStatistics } from '../../Models/case-statistics';
import { TFiltration } from '../../Models/TFiltration';
import { MOAService } from '../../Services/MOA-Service.service';

@Component({
  selector: 'app-moa-cases',
  templateUrl: './moa-cases.component.html',
  styleUrls: ['./moa-cases.component.css']
})
export class MoaCasesComponent implements OnInit {
  requestStatistics: CaseStatistics;
    public filtration?: TFiltration={RequestNumber:"",RequestType:"",RequestStatus:["",""],From:null,To:null,PageNumber:0,ShowRating:false};
    public errorMessage?: string;
    public math: any;
    public result?: IGridResultBase<IRequestsResult>;
    public error = false;
    config = {
      displayKey: 'Text',
      search: true,
      placeholder: 'Select',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Search',
      searchOnKey: 'Text'
    };
    requestSubscriptions: Subscription;
    cols = [];
  constructor( public MOAIService: MOAService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService,protected router: Router,private titleService:Title) {
    this.cols = [
      { field: 'RequestNumber', header: 'WorkspaceBase.Requests.RequestNumber' },
      { field: 'ServiceName', header: 'WorkspaceBase.Requests.RequestType' },
      { field: 'PortalStatusName', header: 'WorkspaceBase.Requests.RequestStatus' },
      { field: 'SubmissionDate', header: 'WorkspaceBase.Requests.SubmissionDate' }];
    this.math = Math;
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.config['placeholder'] = sel;
                this.config['noResultsFound'] = no;
                this.config['searchPlaceholder'] = search;
              }
            );
          }
        );
      });
      this.titleService.setTitle("MOA | Requests");
this.pageChanged(0);
this.getCaseStatistics();
   }

  ngOnInit() {
  }
  public clear(form: NgForm) {
    form.reset();
    this.search();
}
  public search() {
    debugger;
    SharedHelper.showLoader();

        this.MOAIService.search(this.filtration).subscribe(res => {
            if (res.ResponseCode === ResponseCode.Success) {
                this.result = res.Content;
                SharedHelper.hideLoader();
            }else{
                SharedHelper.hideLoader();
                this.error = true;
                            this.errorMessage = res.FriendlyResponseMessage;
            }
        }, err => {
            console.log(err);
            SharedHelper.hideLoader();
        });

}
  public pageChanged(pageNumber: number) {
    debugger;
    this.filtration.PageNumber = pageNumber;
    this.search();
}

createNew(){
  this.router.navigateByUrl('/create-case');
}

getCaseStatistics(){
  this.MOAIService.getCaseStatistics().subscribe(res=>{
    this.requestStatistics=res;
  });
}
}
