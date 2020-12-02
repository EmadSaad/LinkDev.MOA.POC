import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from '../components/file-upload.component';
import { SharedModule } from '../../../shared.module';
import { UploadersListComponent } from 'src/modules/shared/Documents/Components/Uploaders-List/Uploaders-List.component';


@NgModule({
  declarations: [
    FileUploadComponent,
    UploadersListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FileUploadComponent,
    UploadersListComponent
  ]
})
export class FileUploadModule { }
