import { request } from "http";
import { ContractModel } from "./../interfaces/Contract-model";
import { OldCrAndContractService } from "./../services/old-cr-and-contract.service";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ResponseCode } from "src/modules/shared/Models/api-generic-response";
import { ColumnFieldType, GridColumn } from "src/modules/shared/form-guide/grid/models/GridColumn";
import { Guid } from "guid-typescript";
import { SharedHelper } from "src/modules/shared/services/shared-helper";
import { NgForm, NgModel } from "@angular/forms";
import { OnChanges, SimpleChanges } from "@angular/core/src/metadata/lifecycle_hooks";



@Component({
  selector: 'app-old-cr-and-contract',
  templateUrl: './old-cr-and-contract.component.html',
  styleUrls: ['./old-cr-and-contract.component.css']
})
export class OldCrAndContractComponent implements OnInit , OnChanges{

  @Input() Application : any ={};
  @Input() Request : any ={};
  @Input() submit: boolean = false;
  @Input() form : NgForm;
  @Input() oldContract : ContractModel;
  @Input() config: any;
  @Input() isFinalOnly : boolean = true;
  @Input() contractLabel : string = 'SplitRequest.OldContract';
  @Input() CRIsReadonly : boolean;
  @Input() ContractIsReadonly : boolean;
  

  //controlls 
  @Output() CRControl = new EventEmitter<NgModel>(); 
  @ViewChild('CR') CR: NgModel;

  @Output() ContractControl = new EventEmitter<NgModel>(); 
  @ViewChild('Contract') Contract: NgModel;

  @Output() CRChangeEvent = new EventEmitter<boolean>();
  @Output() ContractChangeEvent = new EventEmitter<boolean>();

   

  showCRInfo : boolean ;
  showILInfo : boolean;
  contracts : any[];
  constructor(public OldCrAndContractService: OldCrAndContractService,
    public lookupService: LookupService,
    protected translateService: TranslateService) {
      this.oldContract ={ContactDetails:[], ILId: '',ContractProducts:[],
      CRDetailsModel:{AccountName:"" ,CROwners:[],CRActivities:[],CRType:""},
      ILDetailsModel:{ILSource:"",ILStatus:"",ILType:"",ILProducts:"",FactoryName:"",CityName:""}  }

      this.showILInfo = this.showCRInfo = false;
     
     }
  
    ContactDetailsGridcols: GridColumn[] = [
      {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.Email",field:"Email",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.Mobile",field:"Mobile",typeConfig: {type:ColumnFieldType.Text}},
    ];

    CROwnerGridcols: GridColumn[] = [
      {header:"SplitRequest.OwnerName",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.Nationality",field:"Nationality",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
    ];

    
    CRActivityGridcols: GridColumn[] = [
      {header:"SplitRequest.ActivityName",field:"ActivityName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.ClassName",field:"ClassName",typeConfig: {type:ColumnFieldType.Text}},
      {header:"SplitRequest.DivisionName",field:"DivisionName",typeConfig: {type:ColumnFieldType.Text}}

      
    ];

    ILProductsgridcols: GridColumn[] = [
      {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}}
      
    ];

    ILActivityGridcols: GridColumn[] = [
      {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}}
      
    ];

    ContractProductsgridcols: GridColumn[] = [
      {header:"SplitRequest.Name",field:"Name",typeConfig: {type:ColumnFieldType.Text}}
      
    ];

    

  ngOnInit() {

    this.OldCrAndContractService.GetCRsByContactId().subscribe(result =>{
      if(result.ResponseCode === ResponseCode.Success){
      this.lookupService.handleRetrievedLookup(result.Content);
      SharedHelper.hideLoader();
    }
    })
    


  }

  ngOnChanges(changes: SimpleChanges): void {
  
   if(changes.Request || changes.Application){
        // setTimeout(()=>{  
                                  
           if(this.Application.Request.CRId != null && this.Application.Request.CRId != undefined && 
             this.Application.Request.CRId !== Guid.EMPTY.toString()){
              this.onChangeCR(true);
              
           }

           if(this.Application.Request.ContractId != null && this.Application.Request.ContractId != undefined && 
            this.Application.Request.ContractId !== Guid.EMPTY.toString()){
            this.onChangeContract(true);
           }

        //  },3000);
   }

    
  }

  ngAfterViewInit() {
    this.CRControl.emit(this.CR); 
    this.ContractControl.emit(this.Contract); 
   }

  onChangeCR(isFormLoad:boolean){
   debugger;
    this.contracts=[];
    if(this.Application.Request.CRId !== null && this.Application.Request.CRId != Guid.EMPTY.toString()){
      this.getContracts();
    }else this.contracts=[];
    
    //reset contracts => extend cr change
    this.CRChangeEvent.emit(isFormLoad);
  }
  
  getContracts(){
    debugger;
    this.OldCrAndContractService.getContracts(this.Application.Request.CRId,this.isFinalOnly).subscribe(result =>{
      if(result.ResponseCode === ResponseCode.Success){
        this.lookupService.handleRetrievedLookup(result.Content);
        this.contracts = this.lookupService.lookupEntities['ldv_contract_ContractOptionModel'];
        SharedHelper.hideLoader();
      }
    })
  }

  onChangeContract(isFormLoad:boolean){
    
    this.showILInfo = this.showCRInfo = false;

    if(this.Application.Request.ContractId != null && this.Application.Request.ContractId != undefined){
      SharedHelper.showLoader();
      this.OldCrAndContractService.getContractDetails(this.Application.Request.ContractId).subscribe(result =>{
        
        if(result.ResponseCode === ResponseCode.Success){
          this.oldContract = result.Content;
         
          this.ContractChangeEvent.emit(isFormLoad);
          SharedHelper.hideLoader();
        }
      })
    }
    
  }

  showHideCRInfo(){
    this.showCRInfo = !this.showCRInfo;
  }

  showHideILInfo(){
    this.showILInfo =!this.showILInfo;
  }

  getILProductsLength(): number {
   return this.oldContract.ContractProducts != null ? this.oldContract.ContractProducts.length : 0;
  }
  
  

}
