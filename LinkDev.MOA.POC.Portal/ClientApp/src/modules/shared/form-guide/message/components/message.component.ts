
import { Component, OnInit, Input } from '@angular/core';
import { Mode } from '../../utility/enums/enums';
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {


  @Input() public mode: Mode = Mode.Success;
  @Input() public showH4: boolean = true;
  @Input() public message: string;

  enumMode = Mode;

  ngOnInit(): void {
  }



}
