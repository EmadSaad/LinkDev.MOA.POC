import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RequestSubmissionInfoComponent } from './components/request-submission-info/request-submission-info.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
    
  ],
  declarations: [RequestSubmissionInfoComponent],
  exports:[RequestSubmissionInfoComponent]
})
export class RequestSubmissionInfoModule { }
