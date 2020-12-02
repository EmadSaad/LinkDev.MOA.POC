import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceService } from '../../../services/workspace.services';
import { WorkspaceRequestStatistics } from 'src/modules/workspace/interfaces/WorkspaceRequestStatistics.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { SharedService } from 'src/modules/workspace/services/shared.service';

@Component({
  selector: 'app-workspace-sidenav',
  templateUrl: './workspace-sidenav.component.html'
})
export class WorkspaceSidenavComponent implements OnInit {
  @Input() crType: number;
  @Input() requestStatistics: WorkspaceRequestStatistics;
  @Input() openChildMenu = false;
  @Input() tab: string;
  crID: string;
  contractID = '';
  openMenu = false;
  openBiddingMenu = false;
  currentUrl;
  constructor(
    private sharedService: SharedService) {
    // router.events.subscribe(val => {
    //   if (location.path() != "") {
    //     this.currentUrl = location.path();
    //   }
    // });
  }

  ngOnInit() {
    // this.getStatistics();
    // default crType
    // this.WorkspaceService.getCRS().subscribe(CRS => {
    //   if (CRS.length > 0) {
    //     this.crType = CRS[0].CrType;
    //   }
    // });
    // // subscribe on crId to change crType
    // this.WorkspaceService.getCrID().subscribe(crID => {
    //   this.crID = crID;
    //   if (this.crID) {
    //     this.WorkspaceService.getCRS().subscribe(
    //       CRs => {
    //         if (CRs.length > 0) {
    //           this.crType = CRs.filter(cr => cr.Value == crID)[0].CrType;
    //         }
    //       }
    //     )
    //   }
    // });

    // // Check route if my-requests get statistics
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.currentUrl = event.url;
    //     console.log(this.currentUrl);
    //     if (this.currentUrl === '/workspace/my-requests') {
    //       //console.log("get Statistics");
    //       this.WorkspaceService.getCrID().subscribe(crID => {
    //         this.crID = crID;
    //         if (this.crID) {
    //           this.getStatistics(crID);
    //         }
    //       });
    //       this.WorkspaceService.getContractID().subscribe(newContract => {
    //         this.contractID = newContract;
    //         if (this.crID) {
    //           this.getStatistics(this.crID, newContract);
    //         }
    //       });
    //     }
    //   }
    // });

    // if (this.currentUrl === '/workspace/my-requests') {
    //   //console.log("get Statistics");
    //   this.WorkspaceService.getCrID().subscribe(crID => {
    //     this.crID = crID;
    //     if (this.crID) {
    //       this.getStatistics(crID);
    //     }
    //   });
    //   this.WorkspaceService.getContractID().subscribe(newContract => {
    //     this.contractID = newContract;
    //     if (this.crID) {
    //       this.getStatistics(this.crID, newContract);
    //     }
    //   });
    // }
  }
  // getStatistics() {
  //   this.sharedService.getCrId().subscribe(res => {
  //     let crId = res;
  //     if (res !== '') {
  //       this.sharedService.getContractId().subscribe(res => {
  //         let contractId = res;
  //         if (crId !== '') {
  //           this.sharedService.getRequestStatistics(crId, contractId).subscribe(res => {
  //             this.requestStatistics = res.Content;
  //           });
  //           crId = '';
  //           contractId = '';
  //         }
  //       });
  //     }
  //   });
  //   // this.WorkspaceService.GetRequestStatistics(crId, contractId).subscribe(res => {
  //   //   this.requestStatistics = res.Content;
  //   // });
  // }
  openChildWrapper(tabName: string) {
    this.openChildMenu = !this.openChildMenu;
    this.tab = tabName;
  }
  openBiddingWrapper() {
    this.openBiddingMenu = !this.openBiddingMenu;
  }
  SubmitDraftsRequests() {
    SharedHelper.showLoader();
    this.sharedService.setDraftRequests('Draft Requests');
  }
  SubmitSubmittedRequests() {
    SharedHelper.showLoader();
    this.sharedService.setSubmittedRequests('Submitted Requests');
  }
}
