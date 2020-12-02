import { ValidatorFn, AbstractControl } from '@angular/forms';

export function regularExpressionValidator(Regex: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value == '' || control.value == undefined || control.value == null) {
        return null;
      }
      const isMatched = Regex.test(control.value);
      return isMatched ? null : {'regex': {valid: false}};
    };
  }