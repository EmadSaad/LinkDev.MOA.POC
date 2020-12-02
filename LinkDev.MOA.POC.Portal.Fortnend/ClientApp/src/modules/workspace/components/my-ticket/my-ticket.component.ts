import { Component, OnInit } from '@angular/core';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { TranslateService } from '@ngx-translate/core';
import { ITicketFiltration } from '../../interfaces/TicketFiltration.interface';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
import { WorkspaceBase } from '../../services/workspace-base';
import { ITicketResult } from '../../interfaces/TicketResult.interface';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { TicketService } from '../../services/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { SharedService } from '../../services/shared.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html'
})

export class TicketComponent extends WorkspaceBase<ITicketFiltration, ITicketResult> implements OnInit {
  config = {
    displayKey: 'Text',
    search: true,
    placeholder: 'Select',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'Text'
  };

  public url: string = ConfigService.CRMAPI;
  items = [];
  cols = [];
  math: any;
  CRs: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;
  ticketFilteration: ITicketFiltration = new ITicketFiltration;
  crType: number;
  error: boolean = false;
  errorMode: Mode = Mode.Error;
  orginalResult: any;

  // Constructor
  constructor(protected ticketService: TicketService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService,
    public aPIService: APIService) {
    super(sharedService, ticketService, lookupService, activatedRoute, alertService, translateService);

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
      { field: 'ticketNumber', header: 'TicketManagement.TicketNumber' },
      { field: 'caseTypeNameArabic', header: 'TicketManagement.TicketType' },
      { field: 'statusNameArabic', header: 'TicketManagement.TikcetStatus' },
      { field: 'createdOn', header: 'WorkspaceBase.Tasks.CreationDate' }];
    this.math = Math;
  }

  public getLookupTypes(): RetrieveOptionsRequest[] {
    return [];
  }

  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }

  public addContractsToSearch(): boolean {
    return false;
  }

  public getFiltrationInstance(): ITicketFiltration {
    return new ITicketFiltration();
  }

  ngOnInit() {
  }

  public getTicketsList(crId: string) {
    this.aPIService.GetTicketList<any>(this.url + `Cases?customerID=${crId}`).subscribe(
      results => {
        /// injection new properity with URL, loop on the cases
        var casesList = [];
        if(results.status.code == 200)
{
        var responseCases = results.data.cases;
        
        responseCases.forEach(function (value) {
          var id = value.caseId;
          value.Url = `/ticket-details?Id=${id}`;
          value.ShowRating = true;
          value.Rating = Number(value.rating);
          casesList.push(value);
  
          SharedHelper.hideLoader();
        
        });
      
        //// This is the number of the Tickets.
        var assignedCount = (results.data.cases).length;
        //// Set how paging is going to be look like.
        this.result = { Data: results.data.cases, TotalNumber: assignedCount, NumberPerPage: 1 };

        this.orginalResult = { Data: results.data.cases, TotalNumber: assignedCount, NumberPerPage: this.items };
        return casesList;
      }
        //return casesList;
        return null;
      }, error => {
        return [];
      }
    );
  }

  public searchTasks(searchForm: any) {
    const ticketNumber = searchForm.controls.ticketNumber.value;
    const filtercases = this.orginalResult.Data.filter((item: any) => item.ticketNumber == ticketNumber || (item.ticketNumber && item.ticketNumber.indexOf(ticketNumber) >= 0));
    this.result = { Data: filtercases, TotalNumber: filtercases.length, NumberPerPage: 1 };
  }

  public resetSearch(searchForm: any) {
    searchForm.controls.ticketNumber.value = '';
    this.result = this.orginalResult;
  }
}
