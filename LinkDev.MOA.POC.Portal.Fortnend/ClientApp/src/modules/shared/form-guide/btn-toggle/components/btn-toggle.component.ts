import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';



@Component({
  selector: 'btn-toggle',
  templateUrl: './btn-toggle.component.html',


})
export class BtnToggleComponent implements OnInit, OnChanges {
  @Output() changed = new EventEmitter<boolean>();

  @Input() public text: string;
  @Input() public id: string;
  @Input() public isChecked: boolean = true;
  @Input() public isDisabled: boolean = false;
  ngOnInit(): void {
  }

  ngOnChanges() {
  }

}
