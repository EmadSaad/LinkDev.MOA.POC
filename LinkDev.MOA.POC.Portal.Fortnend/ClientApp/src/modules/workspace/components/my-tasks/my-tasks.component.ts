import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.services';
import { IRequestFiltration } from '../../interfaces/RequestFiltration.interface';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupService } from '../../../shared/Services/lookup.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { IWorkspaceContracts } from '../../interfaces/WorkspaceContracts.interface';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { ITasksResult } from '../../interfaces/TasksResult.interface';
@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
})
export class MyTasksComponent implements OnInit {
  CRs: RetrieveOptionsRequest[];
  CRContracts: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;
  currentContract: IWorkspaceContracts = new IWorkspaceContracts;
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  isLookupsLoaded: boolean = false;
  taskFilteration: IRequestFiltration = new IRequestFiltration;


  constructor(protected WorkspaceService: WorkspaceService, public lookupService: LookupService, protected translateService: TranslateService) {
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
            )
          }
        )
      });

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.GetWorkspaceCRs();
    });
  }
  ngOnInit() {
    this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) this.CRs = retrievedCRs; })
  }

  GetWorkspaceCRs() {
    this.WorkspaceService.getCrID().subscribe(crID => {
      SharedHelper.showLoader();
      this.currentCR.Text = crID;
      if (this.currentCR.Text) {
        this.WorkspaceService.GetCRContracts(this.currentCR.Text).subscribe(res => {
          this.CRContracts = res.Content;
          this.lookupService.handleRetrievedLookup(this.CRContracts);
        });
        this.WorkspaceService.getContractID().subscribe(thisContract => this.currentContract.Text = thisContract);
        this.taskFilteration.CRId = this.currentCR.Text;
        this.taskFilteration.ContractId = this.currentContract.Text;
        this.taskFilteration.PageNumber = 1;
        debugger;
        this.WorkspaceService.setTaskFiltration(this.taskFilteration);
      }
    });
    var lookups = this.getLookupTypes();
    this.lookupService.loadLookups(lookups).subscribe(result => {
      var isLookupsLoaded = result;
      SharedHelper.hideLoader();
    });
  }
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: "ldv_service",
        CachingKey: "ldv_service_WorkspaceServiceDefinitions",
        Mode: LookupRequestMode.WorkspaceServiceDefinitions,
      }
    ];
  }
  UpdateCr(e) {
    SharedHelper.showLoader();
    this.currentContract.Text = "";
    this.WorkspaceService.setContractID("");
    this.WorkspaceService.setCrID(e);
  }
  UpdateContract(e) {
    SharedHelper.showLoader();
    this.WorkspaceService.setContractID(e);
    this.taskFilteration.ContractId = e;
    this.WorkspaceService.setTaskFiltration(this.taskFilteration);
  }
  searchTasks(form: NgForm) {
    SharedHelper.showLoader();
    this.taskFilteration.CRId = this.currentCR.Text;
    if (this.currentContract.Text) {
      this.taskFilteration.ContractId = this.currentContract.Text;
    }
    if (form.value.FromDate != undefined) {
      this.taskFilteration.From = form.value.FromDate;
    }
    if (form.value.ToDate != undefined) {
      this.taskFilteration.To = form.value.ToDate;
    }
    if (form.value.RequestNumber != undefined) {
      this.taskFilteration.RequestNumber = form.value.RequestNumber;
    }
    if (form.value.RequestType != undefined) {
      this.taskFilteration.RequestType = form.value.RequestType;
    }
    this.WorkspaceService.setTaskFiltration(this.taskFilteration);
  }
  resetSearch(f: NgForm) {
    SharedHelper.showLoader();
    f.reset();
    this.WorkspaceService.setTaskFiltration(this.taskFilteration);
  }

}
