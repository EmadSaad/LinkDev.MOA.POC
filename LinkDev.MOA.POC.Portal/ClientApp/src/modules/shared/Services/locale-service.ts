import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeArabic from '@angular/common/locales/ar-SA';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })

export class LocaleService {

  public locale: string = 'en-US';


  constructor(protected translateService: TranslateService) {

    if (this.translateService.currentLang == "ar") {
      this.locale = 'ar-SA';
      registerLocaleData(this.locale);

    }
    else {
      this.locale = 'en-US'
      //registerLocaleData(this.locale);
    }

  }



  //registerCulture(culture: string) {
  //  if (!culture) {
  //    return;
  //  }
  //  this.locale = culture;

  //  // Register locale data since only the en-US locale data comes with Angular
  //  switch (culture) {
  //    case 'ar-SA': {
  //      registerLocaleData(localeArabic);
  //      break;
  //    }
  //  }
  //}
}
