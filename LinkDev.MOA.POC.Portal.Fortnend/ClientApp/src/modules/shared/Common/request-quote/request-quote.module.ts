import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestQuoteComponent } from './request-quote/request-quote.component';
import { TextBoxModule } from '../../form-guide/text-box/modules/textbox.module';
import { GridModule } from '../../form-guide/grid/grid.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    TextBoxModule,
    GridModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [RequestQuoteComponent],
  exports: [RequestQuoteComponent]
})
export class RequestQuoteModule { }
