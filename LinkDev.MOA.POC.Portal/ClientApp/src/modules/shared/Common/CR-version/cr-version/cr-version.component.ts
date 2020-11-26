
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { CrVersionService } from '../services/cr-version.service';
import { Contract } from "../interfaces/contract-model";
import { Guid } from "guid-typescript";
import { NgForm, NgModel } from "@angular/forms";
import { CRVersion } from '../interfaces/cr-version-model';


@Component({
  selector: 'app-cr-version',
  templateUrl: './cr-version.component.html',
  styleUrls: ['./cr-version.component.css']
})
export class CrVersionComponent implements OnInit , OnChanges{

  @Input() Contract : Contract = {};
  @Input() Application :any;
  @Input() CRVersionModel : CRVersion ;
  @Input() IsReadOnly : boolean = false ;
  @Input() IsRequired : boolean = false ;
  @Input() submit : boolean = false ;
  @Input() form : NgForm;
  @Input() CRFieldName : string = 'CRId' ;
  @Input() CRVersionFieldName : string = 'CRVersionId' ;
  @Input() config: any;


  //emit extension funtion
  @Output() CRChangeEvent = new EventEmitter<boolean>();

  //emit control to adding it to the main form
  @Output() CRVersionControl = new EventEmitter<NgModel>();
  @ViewChild('CRVersion') CRVersion: NgModel;

  CRVersionsRecords = new Map<string, any>();
  ClonedId : string ;

  constructor(public CrVersionService: CrVersionService,
    public lookupService: LookupService,
    protected translateService: TranslateService) {
  }


  ngOnInit() {

    debugger
     this.CrVersionService.GetCRsByContactId().subscribe(result =>{

      if(result.ResponseCode === ResponseCode.Success)
      this.lookupService.handleRetrievedLookup(result.Content);

    })


  }

  ngAfterViewInit() {
    this.CRVersionControl.emit(this.CRVersion);
   }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (changes.Contract) {
    // setTimeout(()=>{


        if(this.Contract[this.CRFieldName] != null && this.Contract[this.CRFieldName] != undefined
            && this.Contract[this.CRFieldName] != Guid.EMPTY.toString()){


            if(this.Contract["ClonedCRId"] == undefined || this.Contract["isCRUpdated"] != true ){
               this.Contract["ClonedCRId"] = this.Contract[this.CRFieldName];
             }
        }

        var CRVersionRecord = this.CRVersionsRecords.get(this.Contract[this.CRFieldName]);
        if(CRVersionRecord){
          this.MapEachProperty(CRVersionRecord);
          this.CRChangeEvent.emit(true);
          //this.Contract[this.CRFieldName] = this.CRVersionModel.CRId;
          this.Contract[this.CRVersionFieldName] = this.CRVersionModel.Id;

        }else{
          if(this.Contract[this.CRVersionFieldName] != null && this.Contract[this.CRVersionFieldName] != undefined &&
            this.Contract[this.CRVersionFieldName] !== Guid.EMPTY.toString()){

              this.CrVersionService.GetCRVersion(this.Contract[this.CRVersionFieldName]).subscribe(result =>{
                if(result.ResponseCode === ResponseCode.Success)
                    this.MapEachProperty(result);
                    this.CRChangeEvent.emit(true);
                    this.Contract[this.CRFieldName] = this.CRVersionModel.CRId;
                    this.Contract[this.CRVersionFieldName] = this.CRVersionModel.Id;
                    this.CRVersionsRecords.set(this.Contract[this.CRFieldName],result);
              })


            }
        }

      // }, 100)
    }


  }

  onChangeCRVersion(isUpdate:boolean,isFormLoad:boolean){

    debugger;
    if(this.Contract[this.CRFieldName] != null && this.Contract[this.CRFieldName] != undefined && this.Contract[this.CRFieldName] !== Guid.EMPTY.toString()){

      var CRVersionRecord;
      if(isUpdate == false){
         CRVersionRecord = this.CRVersionsRecords.get(this.Contract[this.CRFieldName]);
        if(CRVersionRecord){
          this.MapEachProperty(CRVersionRecord);
          this.CRChangeEvent.emit(isFormLoad);
          //this.Contract[this.CRFieldName] = this.CRVersionModel.CRId;
          this.Contract[this.CRVersionFieldName] = this.CRVersionModel.Id;
        }
      }

      if(isUpdate || this.CRVersionsRecords.size == 0 || CRVersionRecord == null || CRVersionRecord == undefined){
        if(isUpdate)
        this.Contract["isCRUpdated"] = true;

        this.CrVersionService.GetCRVersionDetails(this.Contract[this.CRFieldName]).subscribe(result =>{

        if(result.ResponseCode == ResponseCode.Success){
          this.CRVersionsRecords.set(this.Contract[this.CRFieldName],result);

          //map each property
          this.MapEachProperty(result)

          //emit extension funtion
          if(!isUpdate)
          this.CRChangeEvent.emit(isFormLoad);

          //fill contract cr and cr version
          //this.Contract[this.CRFieldName] = this.CRVersionModel.CRId;
          this.Contract[this.CRVersionFieldName] = this.CRVersionModel.Id;

        }

      });
      }
    }

  }

  MapEachProperty(result:any){
    this.CRVersionModel.Id = result.Content.Id;
    this.CRVersionModel.CRActivity = result.Content.CRActivity;
    this.CRVersionModel.CRName = result.Content.CRName;
    this.CRVersionModel.Name = result.Content.Name;
    this.CRVersionModel.CRId = result.Content.CRId;
    this.CRVersionModel.CRType = result.Content.CRType;
    this.CRVersionModel.IssuanceCity = result.Content.IssuanceCity;
    this.CRVersionModel.ExpiryDate = result.Content.ExpiryDate;
    this.CRVersionModel.IssueDate = result.Content.IssueDate;
    this.CRVersionModel.Owners = result.Content.Owners;
    this.CRVersionModel.Activities = result.Content.Activities;
  }

}
