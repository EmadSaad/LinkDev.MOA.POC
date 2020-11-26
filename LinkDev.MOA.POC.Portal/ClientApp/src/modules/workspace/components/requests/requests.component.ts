import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { IRequestFiltration } from '../../interfaces/RequestFiltration.interface';
import { IRequestsResult } from '../../interfaces/RequestResult.interface';
import { RequestsService } from '../../services/requests.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { WorkspaceRequestStatistics } from '../../interfaces/WorkspaceRequestStatistics.interface';
import { Subscription } from 'rxjs';
import { Service } from '../../interfaces/service.enum';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent extends WorkspaceBase<IRequestFiltration, IRequestsResult> implements OnInit {

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
  math: any;
  requestStatistics: WorkspaceRequestStatistics = {};
  isRequestStatisticsAdded = false;
  isContractAdded = false;
  currentCrId: string;
  service = Service.Requests;
  currentContractId: string;
  constructor(
    public requestsService: RequestsService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService
  ) {
    super(sharedService, requestsService, lookupService, activatedRoute, alertService, translateService);
    this.requestSubscriptions = new Subscription();
    // setTimeout(() => { // to be moved to base
    //   this.getContract();
    // });
    // this.getStatistics();
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
  public getFiltrationInstance(): IRequestFiltration {
    return new IRequestFiltration;
  }

  public getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: 'ldv_requeststatus',
        CachingKey: ': ldv_requeststatus_WorkspaceRequestStatus',
        Mode: LookupRequestMode.WorkspaceRequestStatus
      },
      {
        EntityName: 'ldv_service',
        CachingKey: 'ldv_service_WorkspaceServiceDefinitions',
        Mode: LookupRequestMode.WorkspaceServiceDefinitions,

      }
    ];
  }
  public addContractsToSearch(): boolean {
    return true;
  }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }
  ngOnInit() {
    this.sharedService.getDraftRequests().subscribe(res => {
      if (res !== '') {
        this.filtration.RequestStatus = this.getCategories(1);
        this.filtration.PageNumber = 1;
        this.search();
      }
    });
    this.sharedService.getSubmittedRequests().subscribe(res => {
      if (res !== '') {
        this.filtration.RequestStatus = this.getCategories(2);
        this.filtration.PageNumber = 1;
        this.search();
      }
    });
  }


  private getCategories(status: number): any[] {
    const requestStatus = this.lookupService.lookupEntities['ldv_requeststatus_WorkspaceRequestStatus'];
    let categories = [];
    switch (status) {
      case 1: {
        categories = requestStatus.map((arr) => {
          if (arr.Category === 0) {
            return arr.Value;
          }
        });
        return categories;
      }
      case 2: {
        debugger;
        categories = requestStatus.map((arr) => {
          if (arr.Category !== 0) {
            return arr.Value;
          } else {
            return {};
          }
        });
        return categories;
      }
    }

  }
  public dynamicFunction(crId: string, contractId: string) {

    if (crId !== this.currentCrId || contractId !== this.currentContractId) {
      this.currentContractId = contractId;
      this.currentCrId = crId;
      const statisticsSub = this.sharedService.getRequestStatistics(crId, contractId).subscribe(res => {
        this.requestStatistics = res.Content;
      });
      this.subscriptions.add(statisticsSub);
    }
  }
}
