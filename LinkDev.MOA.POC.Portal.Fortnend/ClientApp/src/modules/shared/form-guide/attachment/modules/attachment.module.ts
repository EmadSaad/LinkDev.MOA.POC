import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttachmentComponent } from '../components/attachment.component';
import { FileUploadModule } from '../../file-upload/modules/file-upload.module';
// import { FormModule } from 'src/core/modules/form.Module';


@NgModule({
  declarations: [
    AttachmentComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    FileUploadModule,
    // FormModule
  ],
  exports:[
    AttachmentComponent
  ]
})
export class AttachmentModule { }
