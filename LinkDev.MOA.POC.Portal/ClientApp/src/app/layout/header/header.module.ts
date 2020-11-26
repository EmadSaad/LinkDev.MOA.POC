import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { WelcomeControlComponent } from './components/welcome-control/welcome-control.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
     RouterModule
  ],
  declarations: [
    HeaderComponent,
    WelcomeControlComponent,
    LanguageSwitcherComponent,
    MainMenuComponent
   
  ],
  exports: [
    HeaderComponent,
    WelcomeControlComponent,
    LanguageSwitcherComponent,
    MainMenuComponent
  ]
})
export class HeaderModule { }
