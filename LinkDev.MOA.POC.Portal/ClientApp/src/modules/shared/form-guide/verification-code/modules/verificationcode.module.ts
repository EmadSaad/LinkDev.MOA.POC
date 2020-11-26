import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerificationCodeComponent } from '../components/verification-code.component';


@NgModule({
  declarations: [
    VerificationCodeComponent,
    
  ],
  imports:[
    CommonModule,
    FormsModule 

  ],
  exports:[
    VerificationCodeComponent
  ]
})
export class VerificationCodeModule { }
