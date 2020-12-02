import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { IRequestFiltration } from '../../interfaces/RequestFiltration.interface';
import { ITasksResult } from '../../interfaces/TasksResult.interface';
import { TasksService } from '../../services/tasks.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends WorkspaceBase<IRequestFiltration, ITasksResult> implements OnInit {

  config = {
    displayKey: 'Text',
    search: true,
    placeholder: 'Select',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'Text'
  };
  cols = [];
  math: any;
  public getFiltrationInstance(): IRequestFiltration {
    return new IRequestFiltration();
  }
  public addContractsToSearch(): boolean {
    return true;
  }
  constructor(public tasksService: TasksService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {
    super(sharedService, tasksService, lookupService, activatedRoute, alertService,translateService);
    // setTimeout(() => {
    //   this.getContract();
    // });
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
    this.cols = [
      { field: 'RequestNumber', header: 'WorkspaceBase.Requests.RequestNumber' },
      { field: 'ServiceName', header: 'WorkspaceBase.Requests.RequestType' },
      { field: 'PortalStatusName', header: 'WorkspaceBase.Requests.RequestStatus' },
      { field: 'CreationDate', header: 'WorkspaceBase.Tasks.CreationDate' }];
    this.math = Math;
  }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }
  ngOnInit() {
  }
  public getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: 'ldv_service',
        CachingKey: 'ldv_service_WorkspaceServiceDefinitions',
        Mode: LookupRequestMode.WorkspaceServiceDefinitions,

      }
    ];
  }
  // public dynamicFunction(crId: string, contractId: string) {

  // }

}
