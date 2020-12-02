
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[maximumNumber]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaximumNumberDirective, multi: true }]
})
export class MaximumNumberDirective implements Validator {
    @Input()
    maximumNumber: number;

    validate(c: FormControl): { [key: string]: any } {
        let v = c.value;
        return (v > this.maximumNumber) ? { "maximumNumber": true } : null;
    }
} 
