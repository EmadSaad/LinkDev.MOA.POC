import { Component, OnInit } from '@angular/core';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { WorkspaceService } from '../../services/workspace.services';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { IWorkspaceContracts } from '../../interfaces/WorkspaceContracts.interface';
import { IRequestFiltration } from '../../interfaces/RequestFiltration.interface';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
// import { MyRequestsService } from '../../services/my-requests.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { IRequestsResult } from '../../interfaces/RequestResult.interface';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html'
})
export class MyRequestsComponent implements OnInit {

  CRs: RetrieveOptionsRequest[];
  CRContracts: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;
  currentContract: IWorkspaceContracts = new IWorkspaceContracts;
  requestFilteration: IRequestFiltration = new IRequestFiltration;
  requestStatus: any[] = [];
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values'
  };
  constructor(protected WorkspaceService: WorkspaceService, public lookupService: LookupService, private translateService: TranslateService,) {
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.translateService.get('moreValues').subscribe(
                  moreValues =>{
                    this.config['placeholder'] = sel;
                    this.config['noResultsFound'] = no;
                    this.config['searchPlaceholder'] = search;
                    this.config['moreText'] = moreValues;
                  }
                )
              }
            )

          }
        )
      });

  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: "ldv_requeststatus",
        CachingKey: ": ldv_requeststatus_WorkspaceRequestStatus",
        Mode: LookupRequestMode.WorkspaceRequestStatus
      },
      {
        EntityName: "ldv_service",
        CachingKey: "ldv_service_WorkspaceServiceDefinitions",
        Mode: LookupRequestMode.WorkspaceServiceDefinitions,

      }
    ];
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.GetWorkspaceCRs();
    });
  }
  ngOnInit() {
    this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) this.CRs = retrievedCRs; })
    this.WorkspaceService.getDraftRequests().subscribe(draftRequests => {
      if (draftRequests != "") {
        SharedHelper.showLoader();
        this.requestFilteration.CRId = this.currentCR.Text;
        if (this.currentContract.Text) {
          this.requestFilteration.ContractId = this.currentContract.Text;
        }
        this.requestStatus = this.lookupService.lookupEntities['ldv_requeststatus_WorkspaceRequestStatus'];
        let newArr = this.requestStatus.map((arr) => {
          if (arr.Category == 0) {
            return arr.Value;
          }
          else
            return {}
        });
        this.requestFilteration.RequestStatus = newArr;
        this.WorkspaceService.setRequestFiltration(this.requestFilteration);
      }
    })
    this.WorkspaceService.getSubmittedRequests().subscribe(submittedRequests => {
      if (submittedRequests != "") {
        SharedHelper.showLoader();
        this.requestFilteration.CRId = this.currentCR.Text;
        if (this.currentContract.Text) {
          this.requestFilteration.ContractId = this.currentContract.Text;
        }
        this.requestStatus = this.lookupService.lookupEntities['ldv_requeststatus_WorkspaceRequestStatus'];
        let newArr = this.requestStatus.map((arr) => {
          if (arr.Category !== 0) {
            return arr.Value;
          }
          else
            return {}
        });
        this.requestFilteration.RequestStatus = newArr;
        this.WorkspaceService.setRequestFiltration(this.requestFilteration);
      }
    })
  }
  GetWorkspaceCRs() { 
    this.WorkspaceService.getCrID().subscribe(crID => {
      SharedHelper.showLoader();
      this.currentCR.Text = crID;
      if (this.currentCR.Text) {
        this.WorkspaceService.GetCRContracts(this.currentCR.Text).subscribe(res => {
          this.CRContracts = res.Content;
          this.lookupService.handleRetrievedLookup(this.CRContracts);
        }, error => {
          console.log("GetContracts error");
        });
        this.WorkspaceService.getContractID().subscribe(thisContract => {
          this.currentContract.Text = thisContract;
        }, error => {
          console.log("GetContractsID error");
        });
        this.requestFilteration.CRId = this.currentCR.Text;
        this.requestFilteration.ContractId = this.currentContract.Text;
        this.requestFilteration.PageNumber = 1;
        this.WorkspaceService.setRequestFiltration(this.requestFilteration);
      }
    });
    var lookups = this.getLookupTypes();
        this.lookupService.loadLookups(lookups).subscribe(result => {
          var isLookupsLoaded = result;
          SharedHelper.hideLoader();
        });
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
    this.requestFilteration.ContractId = e;
    this.WorkspaceService.setRequestFiltration(this.requestFilteration);
  }
  searchRequests(form: NgForm) {
    SharedHelper.showLoader();
    this.requestFilteration.CRId = this.currentCR.Text;
    if (this.currentContract.Text) {
      this.requestFilteration.ContractId = this.currentContract.Text;
    }
    if (form.value.FromDate != undefined) {
      this.requestFilteration.From = form.value.FromDate;
    }
    if (form.value.ToDate != undefined) {
      this.requestFilteration.To = form.value.ToDate;
    }
    if (form.value.RequestNumber != undefined) {
      this.requestFilteration.RequestNumber = form.value.RequestNumber;
    }
    if (form.value.RequestStatus != undefined) {
      for (let i = 0; i < form.value.RequestStatus.length; i++) {
        this.requestFilteration.RequestStatus[i] = form.value.RequestStatus[i];
      }
    }
    if (form.value.RequestType != undefined) {
      this.requestFilteration.RequestType = form.value.RequestType;
    }
    this.WorkspaceService.setRequestFiltration(this.requestFilteration);
  }
  resetSearch(f: NgForm) {
    SharedHelper.showLoader();
    f.reset();
    this.WorkspaceService.setRequestFiltration(this.requestFilteration);
  }
}
