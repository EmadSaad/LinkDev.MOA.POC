import { AbstractControl, ValidatorFn } from '@angular/forms';

// validation function
export function validateEmptyStringFactory(): ValidatorFn {
    return (c: AbstractControl) => {

        let isValid = c.value != null ? c.value.trim() !== '' : true ;

        if (isValid) {
            return null;
        } else {
            return {
                'required': {
                    valid: false
                }
            };
        }
    }
}