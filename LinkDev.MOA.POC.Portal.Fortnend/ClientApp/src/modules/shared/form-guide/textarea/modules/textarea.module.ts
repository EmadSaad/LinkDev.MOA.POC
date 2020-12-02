import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnlyNumber } from '../../directives/only-number.directive';
import { OnlyNumberModule } from '../../directives/only-number.module';
import { TranslateModule } from '@ngx-translate/core';
import { TextareaComponent } from '../components/textarea.component';

@NgModule({
  declarations: [
      TextareaComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    OnlyNumberModule,
    TranslateModule

  ],
  exports:[
    TextareaComponent
  ]
})
export class TextAreaModule { }
