import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WorkspaceService } from '../../../services/workspace.services';
import { IRequestFiltration } from '../../../interfaces/RequestFiltration.interface';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { IContractFiltration } from 'src/modules/workspace/interfaces/ContractFiltration.interface';
import { IBiddingsFiltration } from 'src/modules/workspace/interfaces/BiddingsFiltration.interface';
import { ILicenseFiltration } from 'src/modules/workspace/interfaces/LicenseFiltration.interface';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { Service } from 'src/modules/workspace/interfaces/service.enum';

@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html'
})
export class ListingGridComponent implements OnInit {
  requestFilter: IRequestFiltration;
  taskFilter: IRequestFiltration;
  contractFilter: IContractFiltration;
  biddingFilter: IBiddingsFiltration;
  licenseFilter: ILicenseFiltration;
  serviceEnum = Service;
  @Input() service;
  @Input() filter;
  @Input() onlyLast5 = false;
  @Input() type: string;
  @Input() gridHeaderText: string;
  @Input() showAllLink: string;
  @Output() notifyPageChanged: EventEmitter<number>;


  // variables related to grid
  @Input() cols = [];
  @Input() data = [];
  rows = 5;
  // variables related to paginator
  @Input() totalNumberOfItems = 0;
  @Input() totalNumberOfText: string;
  numberPerPage = 5;
  @Input() pages = 0;
  pageStep = 0;
  rating: any[];
  showRating: boolean;

  currentLang;
  errorMsg: string;

  constructor(private translate: TranslateService, protected WorkspaceService: WorkspaceService,
    public lookupService: LookupService) {
    this.currentLang = this.translate.currentLang;
    this.notifyPageChanged = new EventEmitter<number>();
  }
  ngOnInit() {
    // SharedHelper.showLoader();
    // if (this.type === 'tasks') {
    //   this.WorkspaceService.getTaskFiltration().subscribe(filterItems => {
    //     this.taskFilter = filterItems;
    //     this.cols = [
    //       { field: 'RequestNumber', header: this.currentLang == 'ar' ? 'رقم الطلب' : 'Request number' },
    //       { field: 'ServiceName', header: this.currentLang == 'ar' ? 'نوع الطلب' : 'Request type' },
    //       { field: 'PortalStatusName', header: this.currentLang == 'ar' ? 'حالة الطلب' : 'Request status' },
    //       { field: 'CreationDate', header: this.currentLang == 'ar' ? 'تاريخ الإنشاء' : 'Creation date' },
    //       // { field: 'Rating', header: this.currentLang == 'ar' ? 'التقييم' : 'Rating' }
    //     ];
    //   });
    //   if (this.taskFilter.CRId) {
    //     this.taskFilter.PageNumber = 1;
    //     this.filter = this.taskFilter;
    //     this.pageStep = 0;
    //     this.getTasks();
    //   }
    // } else if (this.type === 'requests') {
    //   this.WorkspaceService.getRequestFiltration().subscribe(filterItems => {
    //     this.requestFilter = filterItems;
    //     this.cols = [
    //       { field: 'RequestNumber', header: this.currentLang == 'ar' ? 'رقم الطلب' : 'Request number' },
    //       { field: 'ServiceName', header: this.currentLang == 'ar' ? 'نوع الطلب' : 'Request type' },
    //       { field: 'PortalStatusName', header: this.currentLang == 'ar' ? 'حالة الطلب' : 'Request status' },
    //       { field: 'SubmissionDate', header: this.currentLang == 'ar' ? 'تاريخ التقديم' : 'Submission date' },
    //       // { field: 'Rating', header: this.currentLang == 'ar' ? 'التقييم' : 'Rating' }
    //     ];
    //     if (this.requestFilter.CRId) {
    //       this.requestFilter.PageNumber = 1;
    //       this.filter = this.requestFilter;
    //       this.pageStep = 0;
    //       this.getRequests();
    //     }
    //   });
    // } else if (this.type == 'contracts') {
    //   this.cols = [
    //     { field: 'ContractNumber', header: this.currentLang == 'ar' ? 'رقم العقد' : 'Contract number' },
    //     { field: 'MainType', header: this.currentLang == 'ar' ? 'تصنيف العقد' : 'Contract type' },
    //     { field: 'IndustrialStatus', header: this.currentLang == 'ar' ? 'الحالة الصناعية' : 'Industrial status' },
    //     { field: 'LegalStatus', header: this.currentLang == 'ar' ? 'الحالةالشرعية' : 'Legal status' },
    //     { field: 'IssuanceDate', header: this.currentLang == 'ar' ? 'تاريخ الإصدار' : 'Issuance Date' }
    //   ];
    //   this.WorkspaceService.getContractFiltration().subscribe(filterItems => {
    //     this.contractFilter = filterItems;
    //   });
    //   if (this.contractFilter.CRId) {
    //     this.contractFilter.PageNumber = 1;
    //     this.filter = this.contractFilter;
    //     this.pageStep = 0;
    //     this.getContracts();
    //   }
    // } else if (this.type == 'wonBiddings' || this.type == 'availableBiddings') {
    //   this.WorkspaceService.getBiddingFiltration().subscribe(biddingFilterItems => {
    //     this.biddingFilter = biddingFilterItems;
    //     if (this.type == "wonBiddings") {
    //       this.cols = [
    //         { field: 'ServiceName', header: this.currentLang == 'ar' ? 'نوع المناقصة' : 'Bidding type' },
    //         { field: 'CRName', header: this.currentLang == 'ar' ? 'اسم المنشأة' : 'Commercial Name' },
    //         { field: 'InustrialCityName', header: this.currentLang == 'ar' ? 'المدينة الصناعية' : 'Industrial City' },
    //         { field: 'LandArea', header: this.currentLang == 'ar' ? 'مساحة الارض' : 'Land Area' },
    //       ];
    //     } else {
    //       this.cols = [
    //         { field: 'ServiceName', header: this.currentLang == 'ar' ? 'نوع المناقصة' : 'Bidding type' },
    //         { field: 'CRName', header: this.currentLang == 'ar' ? 'اسم المنشأة' : 'Commercial Name' },
    //         { field: 'InustrialCityName', header: this.currentLang == 'ar' ? 'المدينة الصناعية' : 'Industrial City' },
    //         { field: 'LandArea', header: this.currentLang == 'ar' ? 'مساحة الارض' : 'Land Area' },
    //       ];
    //     }
    //   });
    //   if (this.biddingFilter.CRId) {
    //     this.biddingFilter.PageNumber = 1;
    //     this.filter = this.biddingFilter;
    //     this.pageStep = 0;
    //     if (this.type == "wonBiddings") {
    //       console.log("get won bidding");
    //       this.getWonBiddings();
    //     } else {
    //       console.log("get available bidding");
    //       this.getAvailableBiddings();
    //     }
    //   }
    // } else if (this.type == 'licenses') {
    //   this.cols = [
    //     { field: 'LicenseNumber', header: this.currentLang == 'ar' ? 'رقم الترخيص' : 'License number' },
    //     { field: 'Type', header: this.currentLang == 'ar' ? 'تصنيف الترخيص' : 'License type' },
    //     { field: 'IssuanceDate', header: this.currentLang == 'ar' ? 'تاريخ الإصدار' : 'Issuance Date' }
    //   ];
    //   this.WorkspaceService.getLicenseFiltration().subscribe(filterItems => {
    //     this.licenseFilter = filterItems;
    //   });
    //   if (this.licenseFilter.CRId) {
    //     this.licenseFilter.PageNumber = 1;
    //     this.filter = this.licenseFilter;
    //     this.pageStep = 0;
    //     this.getLicenses();
    //   }
    // }
  }
  // getRequests() {
  //   this.WorkspaceService.GetRequests(this.filter).subscribe(res => {
  //     this.data = res.Content.Data;
  //     //   if (this.data) {
  //     //     for (let i = 0; i < this.data.length; i++) {
  //     //         let rowData = this.data[i];
  //     //         console.log(rowData);
  //     //         this.rating[i] = this.data[i].Rating;
  //     //        console.log(this.rating);
  //     //         // else {
  //     //         //     let previousRowData = this.cars[i - 1];
  //     //         //     let previousRowGroup = previousRowData.brand;
  //     //         //     if (brand === previousRowGroup)
  //     //         //         this.rowGroupMetadata[brand].size++;
  //     //         //     else
  //     //         //         this.rowGroupMetadata[brand] = { index: i, size: 1 };
  //     //         // }
  //     //     }
  //     // }
  //     console.log(this.data);
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     //console.log("total number of requests: " + this.totalNumberOfItems);
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     //console.log("total number per page: " + this.numberPerPage);
  //     //console.log("number of pages: " + this.pages);
  //     SharedHelper.hideLoader();
  //   })
  // }
  // getTasks() {
  //   this.WorkspaceService.GetTasks(this.filter).subscribe(res => {
  //     this.data = res.Content.Data;
  //     //console.log(this.data);
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     //console.log("total number of tasks: " + this.totalNumberOfItems);
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     //console.log("total number per page: " + this.numberPerPage);
  //     //console.log("number of pages: " + this.pages);
  //     SharedHelper.hideLoader();
  //   });
  // }
  // getContracts() {
  //   this.WorkspaceService.GetContratcs(this.filter).subscribe(res => {
  //     //console.log(res)
  //     this.data = res.Content.Data;
  //     //console.log(this.data);
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     //console.log("total number of conracts: " + this.totalNumberOfItems);
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     //console.log("total number per page: " + this.numberPerPage);
  //     //console.log("number of pages: " + this.pages);
  //     SharedHelper.hideLoader();
  //   }, (error) => {
  //     console.log("contracts error: " + error);
  //   });
  // }
  // getWonBiddings() {
  //   this.WorkspaceService.GetWonBiddings(this.filter).subscribe(res => {
  //     this.data = res.Content.Data;
  //     //console.log(this.data)
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     //console.log("total number of requests: " + this.totalNumberOfItems);
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     //console.log("total number per page: " + this.numberPerPage);
  //     //console.log("number of pages: " + this.pages);
  //     SharedHelper.hideLoader();
  //   })
  // }
  // getAvailableBiddings() {
  //   this.WorkspaceService.GetAvailableBiddings(this.filter).subscribe(res => {
  //     this.data = res.Content.Data;
  //     //console.log(this.data)
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     //console.log("total number of requests: " + this.totalNumberOfItems);
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     //console.log("total number per page: " + this.numberPerPage);
  //     //console.log("number of pages: " + this.pages);
  //     SharedHelper.hideLoader();
  //   })
  // }
  // getLicenses() {
  //   this.WorkspaceService.GetLicenses(this.filter).subscribe(res => {
  //     this.data = res.Content.Data;
  //     this.totalNumberOfItems = res.Content.TotalNumber;
  //     this.numberPerPage = res.Content.NumberPerPage;
  //     this.pages = Math.ceil(this.totalNumberOfItems / this.numberPerPage);
  //     SharedHelper.hideLoader();
  //   })
  // }
  // related to paginator
  // counter return array of to loop on pages
  counter(i: number) {
    if (i > 5) {
      i = 5;
    } else if (i < 0) {
      i = 1;
    }
    return new Array(i);
  }
  changePage(i: number) {
    // SharedHelper.showLoader();
    if (i > 0 && i <= this.pages) {
      this.filter.PageNumber = i;
      this.notifyPageChanged.emit(i);
      // if (this.type == 'tasks') {
      //   this.getTasks();
      // } else if (this.type == 'requests') {
      //   this.getRequests();
      // } else if (this.type == "biddings") {
      //   this.getWonBiddings();
      // } else if (this.type == "contracts") {
      //   this.getContracts();
      // } else if (this.type == "licenses") {
      //   this.getLicenses();
      // }
    }
  }
  navigate(j: number) {
    if (j => 0 && j <= this.pages) {
      this.pageStep = j;
    }
    // console.log(this.pageStep);
  }

  //related to request rating
  handleRate(event, rowIndex) {
    this.WorkspaceService.SubmitRating(this.data[rowIndex].RelatedRecordId, event.value).subscribe(res => {
      console.log(res);
      if (res.Content) {
        // this.getRequests();
        console.log(this.data);
      } else {

      }
    });
  }
}
