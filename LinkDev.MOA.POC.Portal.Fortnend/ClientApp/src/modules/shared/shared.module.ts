import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DropdownFilterPipe } from "./pipes/dropdown-filter.pipe";
import { FilterByPipe } from "./form-guide/pipes/filter-by.pipe";
import { FilterByNotPipe } from "./form-guide/pipes/filter-by-not.pipe";
import { HttpErrorModule } from "./http-error/http-error.module";

import { FilterByPermitDatePipe } from "./form-guide/pipes/filter-by-permit-date.pipe";
import { UrlValidatorDirective } from "./form-guide/directives/url-validator.directive";
import { RegExValidatorDirective } from "./form-guide/directives/regExp-validator.directive";
import { MustNotMatchDirective } from "./form-guide/directives/must-not-match.directive";
import { EmailValidatorDirective } from "./form-guide/directives/email-validator.directive";
import { EmailAsyncValidatorDirective } from "./form-guide/directives/email-async-validator.directive";
import { MustMatchDirective } from "./form-guide/directives/must-match.directive";
import { HijriDatePipe } from "./form-guide/pipes/hijri-date.pipe";
import { HijriDateTimePipe } from "./form-guide/pipes/hijri-date-time.pipe";
import { SafeUrlPipe } from "./form-guide/pipes/safe-url.pipe";
import { SplitPipe } from "./form-guide/pipes/split.pipe";
import { TruncatePipe } from "./form-guide/pipes/truncate.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FilterByDateAndCityPipe } from "./form-guide/pipes/filter-by-date-and-city.pipe";
import { DateFilterPipe } from "./form-guide/pipes/date-filter.pipe";
// import { BreadcrumbComponent } from "../shared/breadcrumb/breadcrumb.component";
import { APIService } from "./Services/API-Service/api-service.service";
import { ConfigService } from "./Services/Config-Service/config-service.service";
import { AppHeaderComponent } from './app-header/app-header.component';
// import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
// import { BreadcrumbrouteComponent } from "./breadcrumb/breadcrumbroute/breadcrumbroute.component";
import { BreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { CrVersionComponent } from './Common/CR-version/cr-version/cr-version.component';
const components = [
  // AppHeaderComponent,
  // BreadcrumbComponent,
  // BreadcrumbrouteComponent
];

const pipes = [
  DropdownFilterPipe,
  FilterByPipe,
  FilterByNotPipe,
  FilterByPermitDatePipe,
  FilterByDateAndCityPipe,
  DropdownFilterPipe,
  HijriDatePipe,
  HijriDateTimePipe,
  SafeUrlPipe,
  SplitPipe,
  TruncatePipe,
  DateFilterPipe
];

const modules = [
  FormsModule,
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  NgbModule,
  HttpErrorModule,
  TranslateModule,
  BreadcrumbModule
];

const directives = [
  EmailAsyncValidatorDirective,
  EmailValidatorDirective,
  MustMatchDirective,
  MustNotMatchDirective,
  RegExValidatorDirective,
  UrlValidatorDirective
];

const providers = [
  APIService
]

@NgModule({
  imports: [...modules],
  declarations: [...components ,...pipes, ...directives],
  exports: [...components, ...modules, ...pipes, ...directives],
  providers: [...providers]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        //...pipes,
        ...providers
      ]
    };
  }
}

