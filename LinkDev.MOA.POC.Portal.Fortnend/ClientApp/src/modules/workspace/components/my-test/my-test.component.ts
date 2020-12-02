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

@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.css']
})
export class MyTestComponent implements OnInit {

  constructor(protected WorkspaceService: WorkspaceService,
    public lookupService: LookupService, private translateService: TranslateService) { }
    CRs: RetrieveOptionsRequest[];
    currentCR: IWorkspaceCRs = new IWorkspaceCRs;
    CrId: string;

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  ngOnInit() {
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
  ngAfterViewInit(){
    this.getTest();
  }
  getTest() {
    {
      // this.WorkspaceService.getWorkspaceCRs().subscribe(res => {
      //   this.CRs = res.Content;
      //   this.lookupService.handleRetrievedLookup(this.CRs);
      //   this.CrId = this.lookupService.lookupEntities['account_WorkspaceCRs'][0].Value;
      //   this.currentCR.Text = this.CrId;
      // });
      this.WorkspaceService.getCrID().subscribe(crID => {
        this.currentCR.Text = crID;
      })
    }
  }
}
