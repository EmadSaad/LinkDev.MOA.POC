import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnToggleComponent } from '../components/btn-toggle.component';


@NgModule({
  declarations: [
    BtnToggleComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    BtnToggleComponent
  ]
})
export class BtnToggleModule { }
