import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextBoxComponent } from '../components/text-box.component';
import { OnlyNumber } from '../../directives/only-number.directive';
import { OnlyNumberModule } from '../../directives/only-number.module';
import { EmptyStringValidator } from '../../models/emptyStringValidator';
import { TranslateModule } from '@ngx-translate/core';
import { MinimumNumberDirective } from '../../directives/minimum-number.directive';
import { MaximumNumberDirective } from '../../directives/maximum-number.directive';


@NgModule({
    declarations: [
        EmptyStringValidator,
        TextBoxComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        OnlyNumberModule,
        TranslateModule

    ],
    exports: [
        EmptyStringValidator,
        TextBoxComponent
    ]
})
export class TextBoxModule { }
