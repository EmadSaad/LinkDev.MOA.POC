import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { TFiltration } from '../../Models/TFiltration';
import { MOAService } from '../../Services/MOA-Service.service';

@Component({
  selector: 'app-moa-cases',
  templateUrl: './moa-cases.component.html',
  styleUrls: ['./moa-cases.component.css']
})
export class MoaCasesComponent implements OnInit {
  requestStatistics: WorkspaceRequestStatistics = {DraftNumber:5,
    SubmittedNumber:10};
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
    public sharedService: SharedService) {
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
     
   }

  ngOnInit() {
  }
  public search() {
    SharedHelper.showLoader();
    if (this.filtration.RequestNumber) {
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
}
  public pageChanged(pageNumber: number) {
    this.filtration.PageNumber = pageNumber;
    this.search();
}
}