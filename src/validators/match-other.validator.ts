
import { AbstractControl } from '@angular/forms';


export interface MatchOtherValidatorErrors {
  matchOther?: true;
}


export function matchOtherValidator(otherControlName: string) {

  let thisControl: (AbstractControl | undefined);
  let otherControl: (AbstractControl | undefined);

  return function matchOtherValidate(
    control: AbstractControl

  ): MatchOtherValidatorErrors | null {

    if (!control.parent) {
      return null;
    }

    // Initializing the validator on first call
    if (!thisControl) {

      thisControl = control;

      otherControl = (control.parent.get(otherControlName) || undefined);
      if (!otherControl) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }

      // Updating validity of this control when value in other control changes
      otherControl.valueChanges.subscribe(() => thisControl!.updateValueAndValidity());

    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return { matchOther: true };
    }

    return null;

  }

}
