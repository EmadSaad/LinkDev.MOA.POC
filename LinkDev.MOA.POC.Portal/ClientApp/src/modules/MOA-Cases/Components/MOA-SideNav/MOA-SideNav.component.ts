import { Component, Input, OnInit } from '@angular/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { WorkspaceRequestStatistics } from 'src/modules/workspace/interfaces/WorkspaceRequestStatistics.interface';
import { CaseStatistics } from '../../Models/case-statistics';

@Component({
  selector: 'app-MOA-SideNav',
  templateUrl: './MOA-SideNav.component.html',
  styleUrls: ['./MOA-SideNav.component.css']
})
export class MOASideNavComponent implements OnInit {

  @Input() requestStatistics: CaseStatistics;
  @Input() openChildMenu = false;
  @Input() tab: string;

  openMenu = false;
  openBiddingMenu = false;
  currentUrl;
  constructor() {
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
    //this.sharedService.setDraftRequests('Draft Requests');
  }
  SubmitSubmittedRequests() {
    SharedHelper.showLoader();
    //this.sharedService.setSubmittedRequests('Submitted Requests');
  }
}
