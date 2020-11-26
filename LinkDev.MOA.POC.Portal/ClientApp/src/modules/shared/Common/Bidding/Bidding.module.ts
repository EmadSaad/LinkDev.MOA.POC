import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiddingComponent } from './components/Bidding/Bidding.component';
import { PriceOfferComponent } from './components/Price-Offer/Price-Offer.component';
import { TextBoxModule } from 'src/modules/shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from 'src/modules/shared/form-guide/multiselect/mutliselect.module';
import { FormsModule } from '@angular/forms';
import { GridModule } from 'src/modules/shared/form-guide/grid/grid.module';
import { TranslateModule } from '@ngx-translate/core';
import { TextAreaModule } from '../../form-guide/textarea/modules/textarea.module';
import { CurrencyInputModule } from '../../form-guide/currency-input/modules/currency-input.module';
import { DatePickerGreModule } from '../../form-guide/date-picker/modules/datepicker.module';


@NgModule({
  imports: [
    CommonModule,
    TextBoxModule,
    MutliselectModule,
    FormsModule,
    GridModule,
    TranslateModule,
    TextAreaModule,
    CurrencyInputModule,
    DatePickerGreModule
  ],
  exports:[BiddingComponent,PriceOfferComponent],
  declarations: [BiddingComponent,PriceOfferComponent]
})
export class BiddingModule { }
