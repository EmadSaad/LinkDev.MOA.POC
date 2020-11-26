import { Component, OnInit, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  isArabic: boolean = true;
  mainText: string = 'عربي';
  switchToText: string = 'English'
  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
    if(this.translate.currentLang === 'ar')
    {
      this.isArabic = true;
      this.mainText = 'عربي';
      this.switchToText = 'English'
    }
    else
    {
      this.isArabic = false;
      this.mainText = 'English';
      this.switchToText = 'عربي'
    }
  }
  ngAfterViewInit() {
  }
  switchLanguage()
  {
    if(this.isArabic)
      localStorage.setItem('lang','en');
    else
      localStorage.setItem('lang','ar');

    window.location.reload(true);
  }
}
