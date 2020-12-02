import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbdProgressbarShowvalue } from '../components/progress-bar.component';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NgbdProgressbarShowvalue,
 
  ],
  imports:[
    CommonModule,
    FormsModule ,
    NgbProgressbarModule

  ],
  exports:[
    NgbdProgressbarShowvalue,
    NgbProgressbarModule
  ]
})
export class ProgressBarModule { }
