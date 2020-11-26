//Modules
import {
  NgModule,
  APP_INITIALIZER,
  LOCALE_ID,
  Injectable
} from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Components
import { AppComponent } from "./app.component";

//Services
import { Globals } from "src/Globals";
import { UserIdleModule } from "angular-user-idle";
import { BtnToggleModule } from "../modules/shared/form-guide/btn-toggle/modules/btntoggle.module";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormGuideModule } from "src/modules/shared/form-guide/form-guide.module";
import { ConfigService } from "src/modules/shared/Services/Config-Service/config-service.service";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeModule } from "../modules/home/home.module";
import { HeaderModule } from "./layout/header/header.module";
import { BreadcrumbModule } from "src/modules/shared/breadcrumb/breadcrumb.module";
import { HomeLayoutComponent } from "./layout/home-layout/home-layout.component";
import { AlertsModule } from "src/modules/shared/form-guide/alerts/modules/alerts.module";
import { PortalServicesService } from "src/modules/shared/Services/Portal-Service/portal-services.service";
import { NotFoundComponent } from "./not-found/not-found.component";
const interceptors = [];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BtnToggleModule,
    FormGuideModule,
    HeaderModule,
    BreadcrumbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UserIdleModule,
    HomeModule,
    AlertsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-US" },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppConfigService],
    //   useFactory: (appConfigService: AppConfigService) => () => appConfigService.loadAppConfig()
    // },
    //{
    //  provide: LOCALE_ID,
    //  deps: [LocaleService],
    //  useFactory: (LocaleService) => LocaleService.locale
    //},
    // interceptors,
    //ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => () => appConfigService.load()
    },
    interceptors,
    Globals,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
