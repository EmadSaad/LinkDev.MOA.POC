import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ModalComponent } from '../components/modal.component';
import { NgbdModalConfig } from '../components/modal.component';


@NgModule({
  declarations: [
      // ModalComponent,
      NgbdModalConfig
 
  ],
  imports:[
    CommonModule,
    FormsModule 

  ],
  exports:[
    //  ModalComponent
    NgbdModalConfig
  ]
})
export class ModalModule { }
