import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WorkspaceService } from '../../modules/workspace/services/workspace.services';

import { Title } from '@angular/platform-browser';
import { LookupService } from '../shared/Services/lookup.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {
  constructor(private translateService: TranslateService,
    private titleService: Title,
    protected WorkspaceService: WorkspaceService, public lookupService: LookupService, private router: Router) {
    this.titleService.setTitle("Modon | Workspace");
    // this.WorkspaceService.getWorkspaceCRs().subscribe(
    //   res=>{
    //     this.lookupService.handleRetrievedLookup(res.Content);
    //     this.lookupService.lookupEntities['account_WorkspaceCRs'];
    //     this.WorkspaceService.setCRS(this.lookupService.lookupEntities['account_WorkspaceCRs']);
    //     this.WorkspaceService.setCrID(this.lookupService.lookupEntities['account_WorkspaceCRs'][0].Value);
    //   }
    // );
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
