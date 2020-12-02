import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../components/currency-input.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CurrencyInputComponent
    
  ],
  imports:[
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports:[
    CurrencyInputComponent
  ],
  providers:[CurrencyPipe]
})
export class CurrencyInputModule { }
