import { NgModule } from '@angular/core';
import { RichHtmlComponent } from '../components/rich-html.component';
import { FormsModule } from '@angular/forms';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    RichHtmlComponent
    
  ],
  imports:[
    FormsModule

  ],
  exports:[
  
    RichHtmlComponent  ]
})
export class RichHtmlModule { }
