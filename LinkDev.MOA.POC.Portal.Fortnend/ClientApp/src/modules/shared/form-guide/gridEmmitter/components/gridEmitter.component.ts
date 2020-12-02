import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ComponentFactoryResolver, TemplateRef, ElementRef, ViewContainerRef, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LookupKeyValue } from '../../../Models/lookup-key-value.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridColumn, ColumnFieldType } from '../models/GridColumn';
@Component({
  selector: 'app-grid-emitter',
  templateUrl: './gridEmitter.component.html',
})

export class GridEmitterComponent implements OnInit, AfterViewChecked, AfterViewInit {

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
  @Input() addedItemResponse?: boolean = false;
  @Input() resetData?: boolean;
  @Input() addItemFailed: boolean = false;
  @Input() resetDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() dataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() templateFormChange: EventEmitter<NgForm> = new EventEmitter();
  @Output() popUpOpenedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() changeModel: EventEmitter<any> = new EventEmitter();
  @Output() postSaveItemHandler: EventEmitter<any> = new EventEmitter();
  @Output() postDeleteItemHandler: EventEmitter<any> = new EventEmitter();
  @Output() addedItem: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() editedItem: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() deletedItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickFunctionCalled = new EventEmitter<any>();
  @Output() isViewMode: EventEmitter<boolean> = new EventEmitter();
  @Output() isEditMode: EventEmitter<boolean> = new EventEmitter();
  @Output() isModalClosed: EventEmitter<boolean> = new EventEmitter();

  showAdd: boolean = false;
  showUpdate: boolean = false;
  showOk: boolean = false;
  showDelete: boolean = false;
  switch: boolean = false;
  modelTemp: any;
  failedResponse: any[];
  viewMode: boolean = false;
  editMode: boolean = false;
  @ViewChild("popup") popUpTemplate: any;
  @ViewChild("popupDelete") popUpDeleteTemplate: any;
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
    if (this.addItemFailed) {
      // this.data.pop();
      this.data.splice(-1, 1);
      // console.log(this.data);
      this.dataChange.emit(this.data);
    }
  }
  ngAfterViewChanges() {
    if (this.addItemFailed) {
      this.data = [];
      this.dataChange.emit(this.data);
    }
  }
  ngAfterViewInit(): void {
    this.modelTemp = Object.assign({}, this.model);
    if (this.addItemFailed) {
      this.data = [];
      this.dataChange.emit(this.data);
    }
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
  closeModal(modal) {
    this.isModalClosed.emit(true);
    modal.dismiss();
    this.clickFunctionCalled.emit();
    this.templateForm.reset();

  }
  addNewItem() {
    this.showAdd = true;
    this.showUpdate = false;
    this.showOk = false;
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, { size: 'lg', backdrop: 'static' })
        .result.then((result) => {
          debugger;
          if (!this.data) {
            this.data = new Array<any>();
          }
          this.model[this.isAdded] = true;
          this.model[this.isDeleted] = false;
          var temp = Object.assign({}, this.model);
          // console.log("added item : " + JSON.stringify(temp));
          this.data.push(temp);
          this.addedItem.emit(temp);
          // console.log(JSON.stringify(this.data));
          this.dataChange.emit(this.data);
          this.emitPopupClosed();
          if (this.addItemFailed) {
            this.addItemFailed = false;
          }
          // this.templateFormChange.emit(this.templateForm);
          // console.log(JSON.stringify(this.templateForm));
          this.clickFunctionCalled.emit();
          // console.log(this.templateForm);
          this.templateForm.reset();
        }, (reason) => {
          this.emitPopupClosed();
        }).catch((result) => {
          // console.log(result);
          // console.log('cancelling');
        });
    } catch (e) {
      this.emitPopupClosed();
      //this.templateForm.reset();
      //this.templateFormChange.emit(this.templateForm);
    }
  }
  editItem(item: any) {
    this.editMode = true;
    this.isEditMode.emit(this.editMode);
    var index = this.data.indexOf(item);
    this.showAdd = false;
    this.showUpdate = true;
    this.showOk = false;
    this.model = Object.assign({}, item);
    this.modelChange.emit(this.model);
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, { size: 'lg', backdrop: 'static' })
        .result.then(() => {
          debugger;
          this.model[this.isUpdated] = true;
          var temp = Object.assign({}, this.model);
          this.data[index] = temp;
          this.dataChange.emit(this.data);
          this.editedItem.emit(this.data[index]);
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
    this.viewMode = true;
    this.isViewMode.emit(this.viewMode);
    this.showAdd = false;
    this.showUpdate = false;
    this.showOk = true;
    this.model = Object.assign({}, item);
    this.modelChange.emit(this.model);
    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpTemplate, { size: 'lg', backdrop: 'static' })
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

    this.showDelete = true;
    this.showOk = true;
    var index = this.data.indexOf(item);

    try {
      this.emitPopupOpened();
      this.modalService.open(this.popUpDeleteTemplate, { backdrop: 'static' })

        .result.then(() => {
          // console.log("data is " + JSON.stringify(this.data));
          // console.log("index " + index);
          // console.log(JSON.stringify("ely hytms7 aho " + this.data[index]));
          if (item[this.primaryKey] != null && item[this.primaryKey] != undefined) {
            this.data[index][this.isDeleted] = true;
            // this.data[index][this.isUpdated] = true;
          }
          else {
            this.data.splice(index, 1);
          }
          this.deletedItem.emit(this.data[index].Id);
          this.dataChange.emit(this.data);

          this.switch = !this.switch;
        }, (reason) => {
          this.emitPopupClosed();
        });
    } catch (e) {
      this.emitPopupClosed();
    }


  }
  emitPopupOpened() {
    this.addItemFailed = false;
    this.popUpOpened = true;
    this.popUpOpenedChange.emit(this.popUpOpened);
  }
  emitPopupClosed() {
    this.addItemFailed = false;
    this.isModalClosed.emit(true);
    this.popUpOpened = false;
    this.popUpOpenedChange.emit(this.popUpOpened);
    this.viewMode = false;
    this.isViewMode.emit(this.viewMode);
    this.editMode = false;
    this.isEditMode.emit(this.editMode);

    this.model = Object.assign({}, this.modelTemp); // is deleted value && is update
    // alert(JSON.stringify(this.model));
    this.modelChange.emit(this.model);
  }
  // addToGrid(modal) {
  //   setTimeout(function(){
  //     if (this.addedItemResponse) {
  //       modal.close();
  //     }
  //     else {
  //       modal.open();
  //     }
  //   }, 6000);
  // }

  public getDDLText(options: any[], selected) {
    if (selected && options.find(x => x.Value === selected.toString()))
      return options.find(x => x.Value === selected.toString()).Text;
  }
}
