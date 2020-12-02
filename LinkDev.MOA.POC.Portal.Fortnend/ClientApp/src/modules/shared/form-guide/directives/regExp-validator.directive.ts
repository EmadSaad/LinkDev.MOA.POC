import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { regularExpressionValidator } from '../validators/RegularExpressionValidator';

@Directive({
  selector: '[regExpValidate]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RegExValidatorDirective, multi: true }]
})

export class RegExValidatorDirective implements Validator {

  @Input("regExpValidate")
  pattern: string;

  validate(control: AbstractControl): ValidationErrors { return regularExpressionValidator(new RegExp(this.pattern))(control); }
}
