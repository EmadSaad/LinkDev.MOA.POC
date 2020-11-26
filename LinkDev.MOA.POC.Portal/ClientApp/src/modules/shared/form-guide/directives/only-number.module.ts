import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnlyNumber } from './only-number.directive';
import { MinValueDirective } from './min-value.directive';
import { MinimumNumberDirective } from './minimum-number.directive';
import { MaximumNumberDirective } from './maximum-number.directive';

@NgModule({
    declarations: [
        OnlyNumber,
        MinValueDirective,
        MinimumNumberDirective,
        MaximumNumberDirective
    ],
    imports: [
        CommonModule,
        FormsModule

    ],
    exports: [
        OnlyNumber,
        MinValueDirective,
        MinimumNumberDirective,
        MaximumNumberDirective
    ]
})
export class OnlyNumberModule { }
