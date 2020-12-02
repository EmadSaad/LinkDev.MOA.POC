import { Directive, Input } from '@angular/core';
import { Validator, Validators, ValidationErrors, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[MinValue]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true }]
})
export class MinValueDirective implements Validator  {
  @Input("MinValue") minValue:number=0; 
  validate(control: AbstractControl): ValidationErrors {
    let validator = ((control.value as number) >= this.minValue)?null : {'MinValue': {valid: false}};
    return validator;
  }
}
