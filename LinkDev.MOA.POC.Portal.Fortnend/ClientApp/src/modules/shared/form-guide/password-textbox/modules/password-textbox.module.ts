import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordTextBoxComponent } from '../components/password-textbox.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

@NgModule({
  declarations: [
    PasswordTextBoxComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    PasswordStrengthMeterModule
  ],
  exports:[
    PasswordTextBoxComponent,
    PasswordStrengthMeterModule
  ]
})
export class PasswordTextBoxModule { }