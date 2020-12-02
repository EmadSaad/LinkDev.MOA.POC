import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BiddingModel, BiddingOrOffice, TestUser, BiddingType, BiddingOrContractor, ServiceTypeEnum, RequestTypeEnum } from '../../models/BiddingModel';
import { PriceOfferModel } from '../../models/PriceOfferModel';
import { BiddingService } from '../../services/Bidding.service';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceOfferService } from '../../services/Price-Offer.service';
import { Guid } from 'guid-typescript';
import { PlanApprovalComponent } from 'src/modules/Plan-Approval/Plan-Approval/Plan-Approval.component';
import { EServicesBase } from 'src/modules/shared/EService-Base/eService-base';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/modules/shared/services';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-Bidding',
  templateUrl: './Bidding.component.html',
  styleUrls: ['./Bidding.component.css']
})
export class BiddingComponent implements OnInit {
  @Input() RequestNumber?:string;
  @Input() IsReadOnly:boolean;
  @Input() BiddingId:string;
  @Input() IsSpecific: Boolean;
  @Input() QualifyAccountId:string;
  //@Input() AddScopOfWork:string;
  @Input() BiddingType:BiddingType
  @Input() CurrentUser:TestUser;
  @Input() ServiceType:ServiceTypeEnum;
  
  @Input() IndustrialCity?:string;
  @Input() RequestType:RequestTypeEnum;
  
  @Output() BiddingModel:EventEmitter<BiddingModel>=new EventEmitter<BiddingModel>();


  //@Output() GetComponentData:EventEmitter<BiddingModel>=new EventEmitter<BiddingModel>();

  biddingTypeEnum=BiddingType;
  testUserEnum=TestUser;
  currentBidding:BiddingModel;
  CurrentBiddingId:string;
  
  //config:any;
  // config = {
  //   displayKey: "Text", //if objects array passed which key to be displayed defaults to description
  //   search: true, //true/false for the search functionlity defaults to false,
  //   placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
  //   noResultsFound: "No results found!", // text to be displayed when no items are found while searching
  //   searchPlaceholder: "Search" // label thats displayed in search input,
  //   //searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  // };

  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values',
    height: '250px'
  };
  

  @Input() IsSubmitted:boolean = false;

  officeorbidding: BiddingOrOffice;
  BiddingOrOfficeEnum = BiddingOrOffice;

  contractororBidding:BiddingOrContractor;
  contractororBiddingEnum=BiddingOrContractor;


  oldBiddings:BiddingModel[];
  gridModel:BiddingModel;
  gridcols:GridColumn[]=[{
    header: "Bidding.BiddingNumber",
    field: "BiddingNumber",
    typeConfig: {
        type: ColumnFieldType.Text
      }}];
    // },{
    //     header: "Bidding.ScopeOfWork",
    //     field: "AddScopOfWork",
    //     typeConfig: {
    //         type: ColumnFieldType.Text
    //       }
    //     }];


  constructor(protected biddingService:BiddingService ,
    protected priceOfferService:PriceOfferService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    protected router: Router) {}

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
    
    //this.currentUser = this.testUserEnum.Investor;
     
    if(!this.BiddingType){
      this.BiddingType = this.biddingTypeEnum.Office;
    }
    

    
    this.currentBidding = new BiddingModel();
    
    //debugger;

    this.getDynamicLookups();
    if(this.BiddingType == this.biddingTypeEnum.Office){
    if(this.IndustrialCity){
      this.GetFilteredOffice();
    }
  }

    else if(this.BiddingType == this.biddingTypeEnum.Contractor){
      this.GetFilteredContractors();
    }

  }


  ngOnChanges(changes)
  {
   
    //console.log(changes);
    if(changes.CurrentUser && changes.CurrentUser.currentValue ){
      this.CurrentUser = changes.CurrentUser.currentValue;
    }

    if(changes.BiddingId && changes.BiddingId.currentValue){
    this.CurrentBiddingId = this.BiddingId;
      this.getCurrentBidding();
    }

    if(changes.IndustrialCity && changes.IndustrialCity.currentValue && this.RequestType){
      this.GetFilteredOffice();
      }

      if(changes.RequestType && changes.RequestType.currentValue && this.IndustrialCity){
        this.GetFilteredOffice();
      }

    // 
    if(changes.IsReadOnly){
      this.IsReadOnly = changes.IsReadOnly.currentValue;
    }

    var lookups = this.getLookupTypes();
    // 
    this.lookupService.loadLookups(lookups).subscribe(result => {
      // 
      var isLookupsLoaded = result;
      
    });
    
    if(changes.IsSpecific && changes.IsSpecific.currentValue 
      && this.currentBidding){
        if(this.BiddingType == this.biddingTypeEnum.Office){
            this.officeorbidding =this.BiddingOrOfficeEnum.Office;
         }
        if(this.BiddingType == this.biddingTypeEnum.Contractor){
            this.contractororBidding =this.contractororBiddingEnum.Contractor;
          } 
      // if(changes.AddScopOfWork){
      //   this.currentBidding.AddScopOfWork = changes.AddScopOfWork.currentValue;
      // }
      
    }

    
      if(changes.QualifyAccountId && changes.QualifyAccountId.currentValue != null && changes.QualifyAccountId.currentValue!= undefined){
        if(this.BiddingType == this.biddingTypeEnum.Office){
        this.currentBidding.ConsultingOfficeId = changes.QualifyAccountId.currentValue;
        }
        if(this.BiddingType == this.biddingTypeEnum.Contractor){
        this.currentBidding.ContractorId = changes.QualifyAccountId.currentValue;
        }
      }
    
    if(changes.IsSubmitted){
      this.IsSubmitted = changes.IsSubmitted.currentValue;
    }
    
    if(this.CurrentUser == this.testUserEnum.Investor && this.RequestNumber){

      this.getOldBidding();
    }

  } 

  
  getOldBidding() {
    //also fill isdeleted and is Updated
    if(this.RequestNumber && this.RequestNumber!= Guid.EMPTY){
      this.biddingService.getOldBiddingsByPlanApproval(this.RequestNumber,
      this.ServiceType.toString(), this.BiddingType.toString())
      .subscribe(res=>{
        this.oldBiddings = res.Content;
        this.oldBiddings.forEach(element => {
          element.IsDeleted = false;
          element.IsUpdated = false;
        });
      });
    }
  }





  getCurrentBidding(){
      
      if(this.CurrentBiddingId && this.CurrentBiddingId != Guid.EMPTY){

        this.biddingService.getBidding("biddingId="+this.CurrentBiddingId).subscribe(res=>{
          if(res.Content != undefined){
            this.currentBidding = res.Content;
          }
          //  
          // this.currentBidding.Qualify.toString();
        });
      }
 
  }
  
  onSubmit(){
    
    if(this.RequestNumber != undefined){

      this.currentBidding.PlanApprovalRequestNumberId = this.RequestNumber;
    }

    if(this.officeorbidding == this.BiddingOrOfficeEnum.Bidding && this.currentBidding.ConsultingOfficeId != undefined){
      this.currentBidding.ConsultingOfficeId = undefined;
    }

    //  
    this.currentBidding.officeorbidding = this.officeorbidding;
    this.currentBidding.contractorOrbidding = this.contractororBidding;
    //this.isSubmited = true;
    this.BiddingModel.emit(this.currentBidding);

  }

  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      
      {EntityName:"ldv_bidding",CachingKey:"ldv_bidding_ldv_qualify_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_qualify" },

        {EntityName:"ldv_planapproval",CachingKey:"ldv_planapproval_ldv_officeorbidding_OptionSet",
        Mode: LookupRequestMode.OptionSet, OptionSetName:"ldv_officeorbidding" },

      {EntityName:"account",CachingKey:"account_Account",Mode: LookupRequestMode.Account}
      

    ];
  }

   protected getDynamicLookups() {
     //debugger;
    this.biddingService.getDynamicLookups().subscribe(
      res => {
        if (res.ResponseCode === ResponseCode.Success)
          this.lookupService.handleRetrievedLookup(res.Content);
          //console.log("Naglaa => " + res.Content);
          
      }
    )
  }

  protected GetFilteredOffice() {
    //debugger;
   this.biddingService.GetFilteredOffice(this.IndustrialCity, 
    this.RequestType).subscribe(
     res => {
       if (res.ResponseCode === ResponseCode.Success)
         this.lookupService.handleRetrievedLookup(res.Content);
         //console.log("Naglaa => " + res.Content);
         
     }
   )
 }

 protected GetFilteredContractors() {
  
 this.biddingService.GetFilteredContractors().subscribe(
   res => {
     if (res.ResponseCode === ResponseCode.Success)
       this.lookupService.handleRetrievedLookup(res.Content);
   }
 )
}




  // protected getConsultingOffices(): any[]
  // {
  //   // 
  //   if(this.lookupService.lookupEntities['account_LookupWithId'])
  //   {
  //     var x = this.lookupService.lookupEntities['account_LookupWithId'].filter(x => x['accountId'] != Guid.EMPTY.toString() || x['accountId'] != null)
  //     return x;
  //   }
  
  // }

public EmptyOffice(){
  this.currentBidding.ConsultingOfficeId = undefined;
  this.currentBidding.ConsultingOffice = undefined;
  this.currentBidding.ContractorId = undefined;
  this.currentBidding.Contractor = undefined;
  
  //console.log(this.officeorbidding);
}


public getOfficeBidding(){
  if(this.officeorbidding == this.BiddingOrOfficeEnum.Bidding){
    this.currentBidding.officeorbidding = this.BiddingOrOfficeEnum.Bidding;
  }
  else{
    this.currentBidding.officeorbidding = this.BiddingOrOfficeEnum.Office;
  }
  if(this.contractororBidding == this.contractororBiddingEnum.Bidding){
    this.currentBidding.contractorOrbidding = this.contractororBiddingEnum.Bidding;
  }
  else{
    this.currentBidding.contractorOrbidding = this.contractororBiddingEnum.Contractor;
  }




  //this.GetComponentData.emit(this.currentBidding);
}
  

}




  // currentBidding:BiddingModel;
  // priceOffers:PriceOfferModel[] = [];
  // gridModel:PriceOfferModel;
  // isPopUpOpened:boolean=false;
  // isConsulting:number;
  // multiselectObj;
  // gridcols:GridColumn[]=[{
    //   header: "Name",
    //   field: "Name",
    //   typeConfig: {
      //     type: ColumnFieldType.Text
      //   }
      // },{
        //   header: "Price Offer Value",
        //   field: "PriceOfferValue",
        //   typeConfig: {
          //     type: ColumnFieldType.Text
          //   }
          // },{
            //   header: "Comment",
            //   field: "Comment",
            //   typeConfig: {
              //     type: ColumnFieldType.Text
              //   }
              // }];

    // var Id = this.activatedRoute.snapshot.queryParams["biddingId"];
    // if(Id !=null && Id != undefined)
    // {
    //   this.biddingService.get("biddingId="+Id).subscribe(res=>{
    //      
    //     this.currentBidding = res.Content;
    //     this.gridModel.BiddingNumber.Name = this.currentBidding.BiddingNumber;
    //     this.currentBidding.PriceOfferList.forEach(element => {
    //               element.IsDeleted = false;
    //               element.IsUpdated=false;
    //             });

    //   });
     // this.getPriceOffersByBiddingId(Id);
    // }
// choose($event){
      
  //     this.biddingorOffice =$event;
  //   }

  // choose($event){
      
  //     this.biddingorOffice =$event;
  //   }

  // getPriceOffersByBiddingId(Id:string){
  //   this.priceOfferService.getPriceOffersByBiddingId("biddingId="+Id).subscribe(res=>{
  //     this.priceOffers = res.Content;
  //        
  //       this.priceOffers.forEach(element => {
  //         element.IsDeleted = false;
  //         element.IsUpdated=false;
  //       });
  //     // var x =this.priceOffers[0]["Name"];
  //   });
  // }

//   onSubmitBidding(){
//      
//     this.currentBidding.PlanApprovalRequestNumberId = "d4b3d6bf-b25b-ea11-a9d3-000d3a46f0d9";
//     // this.currentBidding.PlanApprovalRequestNumber.EntityLogicalName = "ldv_planapproval";
//     // this.currentBidding.PlanApprovalRequestNumber.Name = "PLA-20-03-01000008";
//     // this.currentBidding.PlanApprovalRequestNumber.Value = "d4b3d6bf-b25b-ea11-a9d3-000d3a46f0d9";
//     if(this.currentBidding.BiddingNumber == null){
//       this.currentBidding.BiddingStatus = null;
//       this.currentBidding.ConsultingOffice = null;
//       this.currentBidding.Contractor = null;
//       this.currentBidding.PlanApprovalRequestNumber = null;
//       this.currentBidding.PriceOfferList.forEach(pri =>{
//         pri.BiddingNumber =null;
//         pri.Currency = null;
//         pri.Investor=null;
//         pri.PlanApprovalRequest=null;
//         pri.PriceOffer=null;
//         pri.PriceOfferBase=null;
//         pri.BidderName = null;
//         pri.PlanApprovalRequestId = this.currentBidding.PlanApprovalRequestNumberId;
//       });

//     }
    
// this.biddingService.post(this.currentBidding).subscribe(ob =>{
//   console.log(ob);
//   this.router.navigate(['?biddingId='+ob.Content],{relativeTo:this.activatedRoute});
// });
//   }


// if(this.currentBidding==null){

//   this.currentBidding = new BiddingModel();
// }
// this.gridModel = new PriceOfferModel();

// this.dropdownOptionsConsultingOffice = [
//   {key:1,name:"Consulting Office 1"},
//   {key:2,name:"Consulting Office 2"},
// ];
// this.dropdownOptionsConsultingOffice = [
//   {key:1,name:"Consulting Office"},
//   {key:2,name:"Contractor"},
// ];
