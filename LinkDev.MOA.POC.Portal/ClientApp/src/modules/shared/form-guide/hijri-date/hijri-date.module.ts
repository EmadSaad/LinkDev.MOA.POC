import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijriDateComponent } from './componet/hijri-date/hijri-date.component';

//import { registerLocaleData } from '@angular/common';
//import localeArSa from '@angular/common/locales/ar-SA';


//// the second parameter 'fr' is optional
//registerLocaleData(localeArSa, 'ar-SA');
@NgModule({
  declarations: [
    HijriDateComponent],
  imports: [
    CommonModule
  ],
  exports: [HijriDateComponent],
  //providers: [{ provide: LOCALE_ID, useValue: 'ar-SA' }], // to see english in ng4, change to 'en-US'

})
export class HijriDateModule { }
