import { ILVersion } from "./../interfaces/il-version-model";
import { IlVersionService } from "./../services/il-version.service";
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { LookupService } from "src/modules/shared/Services/lookup.service";
import { TranslateService } from "@ngx-translate/core";
import { Contract } from "../../CR-version/interfaces/contract-model";
import { ColumnFieldType, GridColumn } from "src/modules/shared/form-guide/grid/models/GridColumn";
import { Guid } from "guid-typescript";
import { NgForm, NgModel } from "@angular/forms";
import { ResponseCode } from "src/modules/shared/Models/api-generic-response";

@Component({
  selector: 'app-il-version',
  templateUrl: './il-version.component.html',
  styleUrls: ['./il-version.component.css']
})
export class IlVersionComponent implements OnInit , OnChanges{

  @Input() Contract : Contract = {};
  @Input() Application : any;
  @Input() ILVersionModel :ILVersion;
  @Input() IsReadOnly : boolean = false ;
  @Input() IsRequired : boolean = false ;
  @Input() submit : boolean = false ;
  @Input() form : NgForm;
  @Input() ILFieldName : string = 'ILId' ;
  @Input() ILVersionFieldName : string = 'ILVersionId' ;
  @Input() config: any;

  //emit extension methos
  @Output() ILChangeEvent = new EventEmitter<boolean>();

  //emit control to add it to the main form
  @Output() ILVersionControl = new EventEmitter<NgModel>(); 
  @ViewChild('IL') IL: NgModel;
  
  ILVersionRecords = new Map<string, any>();
 
  constructor(public IlVersionService: IlVersionService,
    public lookupService: LookupService,
    protected translateService: TranslateService) { 
      
      
    }




  ngOnInit() {

  
 
  }

  ngAfterViewInit() {
    this.ILVersionControl.emit(this.IL); 

   }

  ngOnChanges(changes: SimpleChanges): void {
     
  if(changes.Contract) {

    // setTimeout(()=>{  
     // }, 100)
     debugger; 
      if(this.Contract["ClonedILId"] == undefined || this.Contract["isILUpdated"] != true ){
        if(this.Contract[this.ILFieldName] != null && this.Contract[this.ILFieldName] != undefined && 
          this.Contract[this.ILFieldName] != Guid.EMPTY.toString())
        this.Contract["ClonedILId"] = this.Contract[this.ILFieldName];

      }     

      var ILVersionRecord = this.ILVersionRecords.get(this.Contract[this.ILFieldName]);
      if(ILVersionRecord){
        this.MapEachProperty(ILVersionRecord);
        this.ILChangeEvent.emit(true);
       // this.Contract[this.ILFieldName] = this.ILVersionModel.ILId;
        this.Contract[this.ILVersionFieldName] = this.ILVersionModel.Id;
      }
      else{
        if(this.Contract[this.ILVersionFieldName] != null && this.Contract[this.ILVersionFieldName] != undefined && 
          this.Contract[this.ILVersionFieldName] !== Guid.EMPTY.toString()){
    
            this.IlVersionService.GetILVersion(this.Contract[this.ILVersionFieldName]).subscribe(result =>{
    
              if(result.ResponseCode === ResponseCode.Success){
                this.MapEachProperty(result);
                this.ILChangeEvent.emit(true);
                this.Contract[this.ILFieldName] = this.ILVersionModel.ILId;
                this.Contract[this.ILVersionFieldName] = this.ILVersionModel.Id;
                this.ILVersionRecords.set(this.Contract[this.ILFieldName],result);
              }  
  
            })
          }
      }
    }
 
    
     
  }

  onChangeILVersion(isUpdate : boolean , isFormLoad:boolean){

    debugger
    if(this.Contract[this.ILFieldName] != null && this.Contract[this.ILFieldName] != undefined &&
      this.Contract[this.ILFieldName] !== Guid.EMPTY.toString()){

      var ILVersionRecord;
      if(isUpdate == false){
        ILVersionRecord = this.ILVersionRecords.get(this.Contract[this.ILFieldName]);
        if(ILVersionRecord){
        this.MapEachProperty(ILVersionRecord);
          this.Contract[this.ILFieldName] = this.Contract[this.ILFieldName];
          this.Contract[this.ILVersionFieldName] = this.ILVersionModel.Id;
        }

      }
      
      if(isUpdate || this.ILVersionRecords.size == 0 || ILVersionRecord == null || ILVersionRecord == undefined){

        if(isUpdate)
        this.Contract["isILUpdated"] = true;

        this.IlVersionService.GetILVersionDetails(this.Contract[this.ILFieldName]).subscribe(result =>{

          if(result.ResponseCode == ResponseCode.Success){
              //map each property
              this.MapEachProperty(result)

              //emmit extension method
              if(!isUpdate)
              this.ILChangeEvent.emit(isFormLoad);

              //map il and il version in contract
              //this.Contract[this.ILFieldName] = this.ILVersionModel.ILId;
              this.Contract[this.ILVersionFieldName] = this.ILVersionModel.Id;
              this.ILVersionRecords.set(this.Contract[this.ILFieldName],result);

              
          }
        
      });
    }

    }
    
  }


  MapEachProperty(result:any){

    this.ILVersionModel.Id = result.Content.Id;
    this.ILVersionModel.ILId = result.Content.ILId;
    this.ILVersionModel.ILSource = result.Content.ILSource;
    this.ILVersionModel.ILStatus = result.Content.ILStatus;
    this.ILVersionModel.ILActivities = result.Content.ILActivities;
    this.ILVersionModel.ILProductsList = result.Content.ILProductsList;
    this.ILVersionModel.ILName = result.Content.ILName;
    this.ILVersionModel.ILNumber = result.Content.ILNumber;
    this.ILVersionModel.ILType = result.Content.ILType;
    this.ILVersionModel.IssueDate = result.Content.IssueDate;
    this.ILVersionModel.ExpiryDate = result.Content.ExpiryDate;
    this.ILVersionModel.Nationality = result.Content.Nationality;
    this.ILVersionModel.FactoryName = result.Content.FactoryName;
    this.ILVersionModel.CityName = result.Content.CityName;
    this.ILVersionModel.OwnerName = result.Content.OwnerName;
    this.ILVersionModel.InvestmentType = result.Content.InvestmentType;
    this.ILVersionModel.CRName = result.Content.CRName;
    this.ILVersionModel.Name = result.Content.Name;

      }


}
