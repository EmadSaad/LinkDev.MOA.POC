import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Modules
import { IslamicDatePickerModule } from "./islamic-date-picker/modules/datepicker.module";
//import { DatePickerModule } from './date-picker/modules/datepicker.module';
import { TextBoxModule } from "./text-box/modules/textbox.module";
import { PasswordTextBoxModule } from "./password-textbox/modules/password-textbox.module";
import { CounterModule } from "./counter/modules/counter.module";
import { BtnToggleModule } from "./btn-toggle/modules/btntoggle.module";
import { ModalModule } from "./modal/modules/modal.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClipboardModule } from "ngx-clipboard";
import { MessageModule } from "./message/modules/message.module";
import { RichHtmlModule } from "./rich-html/modules/richhtml.module";
import { VerificationCodeModule } from "./verification-code/modules/verificationcode.module";
import { NgxIntlTelInputModule } from "./intl-tel-input/ngx-intl-tel-input.module";
import { TimePickerModule } from "./time-picker/modules/time-picker.module";
import { FileUploadModule } from "./file-upload/modules/file-upload.module";
import { AttachmentModule } from "./attachment/modules/attachment.module";
import { MatTabsModule } from "@angular/material/tabs";
import { FormHierarchyModule } from "./form-hierarchy/form-hierarchy.module";
// Pipes
import { TruncatePipe } from "./pipes/truncate.pipe";
import { ProgressBarModule } from "./progress-bar/modules/progressbar.module";
import { FormGuideComponent } from "./form-guide.component";
import { MutliselectModule } from "./multiselect/mutliselect.module";
//import { ModalFormComponent } from './modal-form/modal-form.component';
import { NgbdDatepickerPopup } from "./date-picker/components/date-picker.component";
import { MultiSelectItem } from "../Models/MultiSelectItem.model";
import { EmailAsyncValidatorDirective } from "./directives/email-async-validator.directive";
import { EmailValidatorDirective } from "./directives/email-validator.directive";
import { MinValueDirective } from "./directives/min-value.directive";
import { MustMatchDirective } from "./directives/must-match.directive";
import { MustNotMatchDirective } from "./directives/must-not-match.directive";
import { OnlyNumber } from "./directives/only-number.directive";
import { UrlValidatorDirective } from "./directives/url-validator.directive";
import { RegExValidatorDirective } from "./directives/regExp-validator.directive";
import { HijriDateTimePipe } from "./pipes/hijri-date-time.pipe";
import { SafeUrlPipe } from "./pipes/safe-url.pipe";
import { SplitPipe } from "./pipes/split.pipe";
import { HijriDatePipe } from "./pipes/hijri-date.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { TextAreaModule } from "./textarea/modules/textarea.module";
import { GridModule } from "./grid/grid.module";
import { DatePickerGreModule } from "./date-picker/modules/datepicker.module";
import { AlertsModule } from "./alerts/modules/alerts.module";
import { SharedModule } from "../shared.module";
import { GridEmitterModule } from "./gridEmmitter/gridEmitter.module";
import { CurrencyInputModule } from "./currency-input/modules/currency-input.module";

@NgModule({
  declarations: [
    //TruncatePipe,
    // BreadcrumbComponent,
    FormGuideComponent,
    //BreadcrumbComponent,
    //BreadcrumbrouteComponent
    // ModalFormComponent,
    //EmailAsyncValidatorDirective,
    //EmailValidatorDirective,
    //MustMatchDirective,
    //MustNotMatchDirective,
    // RegExValidatorDirective,
    // UrlValidatorDirective,
    // HijriDateTimePipe,
    // SafeUrlPipe,
    // SplitPipe,
    // HijriDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IslamicDatePickerModule,
    DatePickerGreModule,
    TextBoxModule,
    PasswordTextBoxModule,
    CounterModule,
    BtnToggleModule,
    ModalModule,
    NgbModule.forRoot(),
    ClipboardModule,
    MessageModule,
    RichHtmlModule,
    VerificationCodeModule,
    NgxIntlTelInputModule,
    TimePickerModule,
    FileUploadModule,
    AttachmentModule,
    ProgressBarModule,
    MutliselectModule,
    MatTabsModule,
    TextAreaModule,
    GridModule,
    GridEmitterModule,
    FormHierarchyModule,
    AlertsModule,
    SharedModule,
    CurrencyInputModule
    // TranslateModule
    // DatetimePickerModule
  ],
  exports: [
    FormGuideComponent,
    IslamicDatePickerModule,
    DatePickerGreModule,
    TextBoxModule,
    PasswordTextBoxModule,
    CounterModule,
    BtnToggleModule,
    ModalModule,
    NgbModule,
    ClipboardModule,
    MessageModule,
    RichHtmlModule,
    VerificationCodeModule,
    NgxIntlTelInputModule,
    TimePickerModule,
    FileUploadModule,
    AttachmentModule,
    ProgressBarModule,
    MutliselectModule,
    MatTabsModule,
    CurrencyInputModule
    // BreadcrumbComponent,
    // BreadcrumbrouteComponent
    //DatetimePickerModule,
  ],
  providers: [],
  entryComponents: [
    // ModalFormComponent
  ]
})
export class FormGuideModule { }
