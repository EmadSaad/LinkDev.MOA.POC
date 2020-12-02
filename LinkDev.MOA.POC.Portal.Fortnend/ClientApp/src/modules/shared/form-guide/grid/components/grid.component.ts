import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ComponentFactoryResolver, TemplateRef, ElementRef, ViewContainerRef, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LookupKeyValue } from '../../../Models/lookup-key-value.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridColumn, ColumnFieldType } from '../models/GridColumn';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})


export class GridComponent implements OnInit, AfterViewChecked, AfterViewInit {

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  @Input() modalFormTitle: string;
  @Input() addNewRecord: string;
  @Input() tableHeadTitle?: string = " ";
  @Input() data: any[];
  @Input() model: any;
  @Input() template: any;
  @Input() templateForm: NgForm;
  @Input() primaryKey: string = "Id";
  @Input() columns: GridColumn[];
  @Input() LookupEntities: any[];
  @Input() popUpOpened: any;
  @Input() canView: boolean = false;
  @Input() canAdd: boolean = true;
  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;
  @Input() lookupsEntities: { [id: number]: LookupKeyValue[] };
  @Input() lookupKey: any = "Value";
  @Input() lookupLabel: any = "Label";
  @Input() isDeleted: any = "IsDeleted";
  @Input() isUpdated: any = "IsUpdated";
  @Input() isAdded: any = "IsAdded";
  @Input() responseList?: any[];
  @Output() dataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() templateFormChange: EventEmitter<NgForm> = new EventEmitter();
  @Output() popUpOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() changeModel: EventEmitter<any> = new EventEmitter();
  @Output() postSaveItemHandler: EventEmitter<any> = new EventEmitter();
  @Output() postDeleteItemHandler: EventEmitter<any> = new EventEmitter();
  showAdd: boolean = false;
  showUpdate: boolean = false;
  showOk: boolean = false;
  switch: boolean = false;
  modelTemp: any;
  failedResponse: any[];
  @ViewChild("popup") popUpTemplate: any;
  constructor(private modalService: NgbModal,
    private cdRef: ChangeDetectorRef) {
  }
  ngOnChanges() {
    if (this.responseList !== undefined) {
      this.failedResponse = this.responseList.map(a => {
        a.Index;
        this.data[a.Index].invalidField = true;
        // console.log(JSON.stringify(this.data[a.Index]));
      });
    }
  }
  ngAfterViewInit(): void {
    this.modelTemp = Object.assign({}, this.model);
    // console.log(this.responseList);
  }
  ngOnInit(): void {
    debugger;
    /*using functional filter() where a represents an item in the array*/
    if (!this.data) {
      this.data = new Array<any>();
    }
    if (this.columns && this.columns[this.columns.length - 1].typeConfig.type != ColumnFieldType.None) {
      this.columns.push({
        field: '',
        header: '',
        typeConfig: {
          type: ColumnFieldType.None
        }
      });
    }
  }

  addNewItem() {
    debugger;
    this.showAdd = true;
    this.showUpdate = false;
    this.showOk = false;
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, {size: 'lg', backdrop: 'static' })
        .result.then(() => {
          debugger;
          if (!this.data) {
            this.data = new Array<any>();
          }
          this.model[this.isAdded] = true;
          this.model[this.isDeleted] = false;
          var temp = Object.assign({}, this.model);
          this.data.push(temp);
          this.dataChange.emit(this.data);
          this.emitPopupClosed();
          this.templateForm.reset();
          //this.templateFormChange.emit(this.templateForm);

        }, (reason) => {
          this.emitPopupClosed();
        });
    } catch (e) {
      this.emitPopupClosed();
      //this.templateForm.reset();
      //this.templateFormChange.emit(this.templateForm);
    }
  }
  editItem(item: any) {
    var index = this.data.indexOf(item);
    this.showAdd = false;
    this.showUpdate = true;
    this.showOk = false;
    this.model = Object.assign({}, item);
    this.modelChange.emit(this.model);
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, {size: 'lg', backdrop: 'static' })
        .result.then(() => {
          this.model[this.isUpdated] = true;
          var temp = Object.assign({}, this.model);
          this.data[index] = temp;
          this.dataChange.emit(this.data);
          this.emitPopupClosed();
        }, (reason) => {
          this.switch = !this.switch;
          this.emitPopupClosed();

        });
    } catch (e) {
      this.emitPopupClosed();

    }
  }
  viewItem(item: any) {
    this.showAdd = false;
    this.showUpdate = false;
    this.showOk = true;
    this.model = Object.assign({}, item);
    this.modelChange.emit(this.model);
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, {size: 'lg', backdrop: 'static' })
        .result.then(() => {
          this.emitPopupClosed();
          this.switch = !this.switch;
        }, (reason) => {
          this.emitPopupClosed();
        });
    } catch (e) {
      this.emitPopupClosed();
    }
  }
  deleteItem(item: any) {
    var index = this.data.indexOf(item);
    if (item[this.primaryKey] != null && item[this.primaryKey] != undefined) {
      this.data[index][this.isDeleted] = true;
      // this.data[index][this.isUpdated] = true;
    }
    else {
      this.data.splice(index, 1);
    }
    this.dataChange.emit(this.data);
  }
  emitPopupOpened() {
    this.popUpOpened = true;
    this.popUpOpenedChange.emit(this.popUpOpened);
  }
  emitPopupClosed() {
    this.popUpOpened = false;
    this.popUpOpenedChange.emit(this.popUpOpened);
    this.model = Object.assign({}, this.modelTemp);
    this.modelChange.emit(this.model);
  }

  public getDDLText(options: any[] , selected)
  {
    if(selected && options.find(x => x.Value === selected.toString()))
      return options.find(x => x.Value === selected.toString()).Text;
  }
}
