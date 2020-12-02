import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCommentsComponent } from './request-comments/request-comments.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
    
  ],
  declarations: [RequestCommentsComponent],
  exports:[RequestCommentsComponent]
})
export class RequestCommentsModule { }
