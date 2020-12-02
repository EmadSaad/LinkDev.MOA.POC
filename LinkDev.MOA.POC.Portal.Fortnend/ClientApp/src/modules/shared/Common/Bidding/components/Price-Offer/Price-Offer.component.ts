import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { NgForm } from '@angular/forms';
import { PriceOfferModel, CrTypeEnum } from '../../models/PriceOfferModel';
import { PriceOfferService } from '../../services/Price-Offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { TestUser, ServiceTypeEnum, RequestTypeEnum } from '../../models/BiddingModel';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';


@Component({
  selector: 'app-Price-Offer',
  templateUrl: './Price-Offer.component.html',
  styleUrls: ['./Price-Offer.component.css']
})
export class PriceOfferComponent implements OnInit {


  gridModel: PriceOfferModel;
  BiddingPriceOfferList: PriceOfferModel[];
  approveRejectSpacific?: boolean;
  isSubmited: boolean;
  alreadyHasPriceoffer: boolean=false;
  //config: any;
  BiddingPriceOfferDropDown: any[] = [];
  


  ChoosenPriceOffer: PriceOfferModel;
  CurrentPriceOffer: PriceOfferModel;
  CurrentBiddingId: string;

  CurrentCR: CRModel={};
  isCurrentCR:boolean;

  gridcols: GridColumn[] = [{
  header: "PriceOffer.Name",
  field: "BidderCRName",
  typeConfig: {
    type: ColumnFieldType.Text
        }
  },{
    header: "PriceOffer.CreatedOnDate",
    field: "PriceCreatedOnDate",
    typeConfig: {
      type: ColumnFieldType.Text
    }
  },{
    header: "PriceOffer.PriceOfferValue",
    field: "PriceOfferValue",
    typeConfig: {
      type: ColumnFieldType.Number
    }
   }];//, {
  //   header: "PriceOffer.Comment",
  //   field: "Comment",
  //   typeConfig: {
  //     type: ColumnFieldType.Text
  //   }
  // }];

  CROwnerGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Nationality",field:"Nationality",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];
  


  @Input() currentUser: TestUser;
  testUserEnum = TestUser;
  @Input() BidderId: string;
  @Input() BiddingId: string;
  @Input() IsReadOnly: boolean;
  @Input() IsSpecific: Boolean;
  @Input() SpacificPriceOffer:PriceOfferModel;
  @Input() SpacificConsultingOfficeId:string;
  @Input() RequestId: string;
  @Input() ServiceType:ServiceTypeEnum;
  
  @Input() RequestType:RequestTypeEnum;
  @Input() IndustrialCity?:string;
  @Input() CRType?:CrTypeEnum;

  @Output() ChoosePriceOfferEmiter: EventEmitter<PriceOfferModel> = new EventEmitter<PriceOfferModel>();

  testVar:boolean=false;
  constructor(protected priceOfferService: PriceOfferService,
    public contractSubmissionService: ContractSubmissionService,
    protected lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {
      //this.configureMutliSelectConfiguration();
  }

  config = {
    displayKey: "BidderCRName", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };

  // config = {}
  // configureMutliSelectConfiguration() {
  //     this.config = this.createMultiSelectConfig();
  // }
  // createMultiSelectConfig(): any {
  //     var config =
  //     {
  //         search: true,
  //         displayKey: "BidderCRName", //if objects array passed which key to be displayed defaults to description
  //         placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
  //         noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
  //         searchPlaceholder: 'Search', // label thats displayed in search input,
  //     }
  //     setTimeout(() => {
  //         this.translateService.get("SELECT").subscribe(msg => {
  //             config.placeholder = msg;
  //         });
  //         return config;
  //     });

  //     setTimeout(() => {
  //         this.translateService.get("NO_RESULT_FOUND").subscribe(msg => {
  //             config.noResultsFound = msg;
  //         });
  //         return config;
  //     });

  //     setTimeout(() => {
  //         this.translateService.get("SEARCH").subscribe(msg => {
  //             config.searchPlaceholder = msg;
  //         });
  //         return config;
  //     });

  //     return config;

  //     // this.minDate.setDate(this.todayDate.getDate() - 1);
  // }
 
  
  ngOnInit() {

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
              });
          }); 
    });
    //this.currentUser = 1;
    //this.isSpasifice = true;
    this.BiddingPriceOfferList = [];
    this.BiddingPriceOfferDropDown = [];
    this.ChoosenPriceOffer = new PriceOfferModel();
    this.CurrentPriceOffer = new PriceOfferModel();

    // this.config = {
    //   displayKey: "BidderCRName", //if objects array passed which key to be displayed defaults to description
    //   search: true, //true/false for the search functionlity defaults to false,
    //   placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    //   noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    //   searchPlaceholder: "Search" // label thats displayed in search input,
    //   //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    // };
    this.isSubmited = false;
  }

  ngOnChanges(changes) {
    //debugger;
    //console.log(changes);
    if (changes.BidderId && changes.BidderId.currentValue) {
      this.BidderId = changes.BidderId.currentValue;
      if (this.currentUser == this.testUserEnum.Bidder || this.currentUser == this.testUserEnum.Contractor) {
        this.getPriceOffer()
      }
    }
    if (changes.BiddingId && changes.BiddingId.currentValue) {
      this.CurrentBiddingId = this.BiddingId;

    }

    if ((this.currentUser == this.testUserEnum.Bidder || this.currentUser == this.testUserEnum.Contractor)
     && this.CurrentBiddingId) {
      this.getPriceOffer()
    }

    if (this.currentUser == this.testUserEnum.Investor && this.CurrentBiddingId) {
      this.getBiddingPriceOfferList();
    }
    
    if (changes.IsReadOnly) {
      this.IsReadOnly = changes.IsReadOnly.currentValue;
    }
    if(changes.IsSpecific && changes.IsSpecific.currentValue){
      this.IsSpecific = changes.IsSpecific.currentValue;      
      // this.testVar= (((this.IsSpecific&&this.SpacificConsultingOfficeId==this.BidderId)||(!this.IsSpecific)));

    }
    if(changes.SpacificConsultingOfficeId && changes.SpacificConsultingOfficeId.currentValue){
      this.SpacificConsultingOfficeId = changes.SpacificConsultingOfficeId.currentValue;

      this.ChoosenPriceOffer.BidderNameId = this.SpacificConsultingOfficeId;
    }
    //debugger;
    if(changes.SpacificPriceOffer && changes.SpacificPriceOffer.currentValue && 
      (changes.SpacificPriceOffer.currentValue.PriceOfferValue >= 0 || changes.SpacificPriceOffer.currentValue.Comment)){
      
      this.CurrentPriceOffer = changes.SpacificPriceOffer.currentValue;
      
    }
    // console.log(this.CurrentPriceOffer);
    // console.log("----------");
    // console.log(changes.SpacificPriceOffer.currentValue);

  }

  getBiddingPriceOfferList() {
    //debugger;
    if (this.RequestId && this.RequestId != Guid.EMPTY) {

      if (this.CurrentBiddingId) {
        this.priceOfferService.getPriceOffersByBiddingId("biddingId=" + this.CurrentBiddingId)
        .subscribe(res => {  
          this.BiddingPriceOfferList = res.Content;
          this.BiddingPriceOfferList.forEach(element => {
            element.IsDeleted = false;
            element.IsUpdated = false;
          });
          //this.getBidderConsultingOffice();
        });
      }

    }
  }

  GridChanged(event){
   // debugger;
   this.CurrentCR = null;
   if(event.BidderNameId){
     this.getCRInfo(event.BidderNameId)
   }
  }
  getCRInfo(BidderNameId: string){
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(BidderNameId).subscribe(results => {
      if(results.ResponseCode === ResponseCode.Success)
      {
        this.CurrentCR = results.Content.CR;
      }
    this.isCurrentCR = false;

    });
  }

  getPriceOffer() {
    //debugger;
    if (this.BidderId) {
      if (this.CurrentBiddingId && this.CurrentBiddingId!= Guid.EMPTY) {
        this.priceOfferService.getPriceOffersByBiddingIdBidderId("biddingId=" + this.CurrentBiddingId + "&bidderId=" + this.BidderId).subscribe(res => {
         // debugger;
          if(res.Content.Id != Guid.EMPTY){
            this.CurrentPriceOffer = res.Content;
            this.alreadyHasPriceoffer = true;
          }
          else{
            this.CurrentPriceOffer = {};
            this.alreadyHasPriceoffer = false;
          }
        });
      }
      

    }


  }


  onSubmitPriceOffer(): void {
    //submit price offer here
    this.isSubmited = true;
    this.postPriceOffer();


  }

  postPriceOffer() {
    if (this.IsSpecific && this.approveRejectSpacific) {
      this.CurrentPriceOffer.ApprovedRejectSpacifice = true;
      this.ChoosePriceOfferEmiter.emit(this.CurrentPriceOffer)
    } else if (this.IsSpecific && !this.approveRejectSpacific) {
      this.CurrentPriceOffer.ApprovedRejectSpacifice = false;
      this.ChoosePriceOfferEmiter.emit(this.CurrentPriceOffer);
    }
    else if (!this.IsSpecific) {
      if(this.ServiceType == ServiceTypeEnum.PlanApproval){
        this.CurrentPriceOffer.PlanApprovalRequestId = this.RequestId;
      }
      else if(this.ServiceType == ServiceTypeEnum.BuildingLicense){
        this.CurrentPriceOffer.BuildingLicenseRequestId = this.RequestId;
      }
      this.CurrentPriceOffer.BidderNameId = this.BidderId;
      this.CurrentPriceOffer.BiddingNumberId = this.CurrentBiddingId;
      
      this.CurrentPriceOffer.IndustrialCity = this.IndustrialCity;
      this.CurrentPriceOffer.RequestType = this.RequestType;
      this.CurrentPriceOffer.ServiceType = this.ServiceType;
      this.CurrentPriceOffer.CRType = this.CRType;


      this.priceOfferService.postModel(this.CurrentPriceOffer).subscribe(
        res => {
          //debugger;
          this.CurrentPriceOffer.ErrorMessage = res.Content.ErrorMessage;
          this.isSubmited = false;
          this.ChoosePriceOfferEmiter.emit(this.CurrentPriceOffer);
        //console.log(res.Content);
      });
      
      //this.ChoosePriceOfferEmiter.emit(this.CurrentPriceOffer);
    }
  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      { EntityName: "account", CachingKey: "account", Mode: LookupRequestMode.LookupWithId },
    ];
  }



  // protected getBidderConsultingOffice() {
  
  //   this.BiddingPriceOfferList.forEach(element => {
  //     this.BiddingPriceOfferDropDown.push({
  //       Value: element.BidderNameId,
  //       Text: element.Name
  //     });
  //   });
  // }


  onChoosePriceOffer() {
    if (this.ChoosenPriceOffer.BidderNameId != null) {
      //this.ChoosenPriceOffer = this.BiddingPriceOfferList.filter(x => x.BidderNameId == this.ChoosenPriceOffer.BidderNameId)[0];
      this.ChoosenPriceOffer.ChoosePriceOfferOrRejectAll = true;
      this.ChoosePriceOfferEmiter.emit(this.ChoosenPriceOffer);
      this.isSubmited=true;
    }
  }


  onSubmitRejectAll() {

    this.isSubmited=true;
    this.CurrentPriceOffer.ChoosePriceOfferOrRejectAll = false;
    this.ChoosePriceOfferEmiter.emit(this.CurrentPriceOffer);


  }



}

