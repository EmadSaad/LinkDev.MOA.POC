import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import { regularExpressionValidator } from '../validators/RegularExpressionValidator';

@Directive({
  selector: '[emailRegex]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {

  private emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

  validate(control: AbstractControl): ValidationErrors {
    return regularExpressionValidator(new RegExp(this.emailPattern))(control);
  }
}