import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

@Directive({
    selector: '[mustNotMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustNotMatchDirective, multi: true }]
})
export class MustNotMatchDirective implements Validator {
    @Input('mustNotMatch') mustNotMatch: string[] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        return MustNotMatch(this.mustNotMatch[0], this.mustNotMatch[1])(formGroup);
    }
}


// custom validator to check that two fields match
export function MustNotMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // return null if controls haven't initialised yet
        if (!control || !matchingControl) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value == matchingControl.value) {
            matchingControl.setErrors({ mustNotMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}