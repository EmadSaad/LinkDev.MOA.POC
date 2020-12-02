import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { debug } from 'util';

@Component({
  selector: 'app-validation-viewer',
  templateUrl: './validation-viewer.component.html',
  styleUrls: ['./validation-viewer.component.css']
})
export class ValidationViewerComponent implements OnInit {

  @Input() requiredValidations :{[index: string] : string}
  @Input() controlName: NgModel;
  @Input() form : NgForm;
  @Input() submit: boolean= false;

  listnerAttached: boolean = false;

  messages: string[]=[];
  constructor() { }

  ngOnInit() {
   // debugger;
    //this.form.valueChanges.subscribe(val => {this.attachChangeListner();})
  }

  ngOnChanges(changes)
  {
    //debugger;
    if(!this.listnerAttached && this.form.getControl(this.controlName))
      this.attachChangeListner();
    else
      this.handleMessages();
  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      this.attachChangeListner();
    }, 0);
  }
  

  handleMessages()
  {
    if(this.listnerAttached)
    {
      this.messages = [];
      let controlErrors= this.form.getControl(this.controlName).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.messages.push(this.requiredValidations[keyError]);
        });
      }
      
    }
  }

  attachChangeListner()
  {
    if(this.form.getControl(this.controlName) && !this.listnerAttached)
    {
      this.form.getControl(this.controlName).valueChanges.subscribe(val => {this.handleMessages();});
      this.listnerAttached = true
      this.handleMessages();
    }
  }

}
