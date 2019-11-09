
import { AbstractControl } from '@angular/forms';


export interface IsTrueValidatorErrors {
  isTrue: true;
}


export function isTrueValidator() {
  return validateIsTrue;
}


function validateIsTrue(
  control: AbstractControl

): null | IsTrueValidatorErrors {

  if (true === control.value) {
    return null;
  } else {
    return { isTrue: true };
  }

}
