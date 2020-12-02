import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.services';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupService } from '../../../shared/Services/lookup.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { IContractFiltration } from '../../interfaces/ContractFiltration.interface';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
})
export class MyContractsComponent implements OnInit {
  CRs: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  isLookupsLoaded: boolean = false;
  contractFilteration: IContractFiltration = new IContractFiltration;
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

  ngOnInit() {
    this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) this.CRs = retrievedCRs; })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.GetContracts();
    });
  }
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: "product",
        CachingKey: "product_ContractMainType",
        Mode: LookupRequestMode.ContractMainType,
      }
    ];
  }

  GetContracts() {
    this.WorkspaceService.getCrID().subscribe(crID => {
      SharedHelper.showLoader();  
      this.currentCR.Text = crID; 
      if (this.currentCR.Text) {
        this.contractFilteration.CRId = this.currentCR.Text;
        this.contractFilteration.PageNumber = 1;
        debugger;
        this.WorkspaceService.setContractFiltration(this.contractFilteration);   
      }  
    });
      var lookups = this.getLookupTypes();
    this.lookupService.loadLookups(lookups).subscribe(result => {
      var isLookupsLoaded = result;
      SharedHelper.hideLoader();
    }, error => console.log(error));
  }
  UpdateCr(e) {
    SharedHelper.showLoader();
    this.WorkspaceService.setCrID(e);
  }
  searchContracts(form: NgForm) {
    SharedHelper.showLoader();
    this.contractFilteration.CRId = this.currentCR.Text;
    if (form.value.FromDate != undefined) {
      this.contractFilteration.From = form.value.FromDate;
    }
    if (form.value.ToDate != undefined) {
      this.contractFilteration.To = form.value.ToDate;
    }
    if (form.value.MainType != undefined) {
      this.contractFilteration.MainType = form.value.MainType;
    }
    debugger;
    this.WorkspaceService.setContractFiltration(this.contractFilteration);
  }
  resetSearch(f: NgForm) {
    SharedHelper.showLoader();
    f.reset();
    debugger;
    this.WorkspaceService.setContractFiltration(this.contractFilteration);
  }
}
