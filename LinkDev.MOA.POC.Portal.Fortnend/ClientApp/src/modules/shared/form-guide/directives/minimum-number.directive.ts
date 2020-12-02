import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: ' [minimumNumber]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinimumNumberDirective, multi: true }]
})
export class MinimumNumberDirective implements Validator {

    @Input()
    minimumNumber: number;

    validate(c: FormControl): { [key: string]: any } {
        debugger;
        let v = Number(c.value);
        return (v < this.minimumNumber) ? { "minimumNumber": true } : null;
    }
} 
