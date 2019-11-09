
import { AbstractControl } from '@angular/forms';


export interface SkypeNameValidatorErrors {
  skypeName?: true;
}


export function skypeNameValidator() {

  const validator = new SkypeNameValidator();

  return function validateSkypeName(control: AbstractControl) {
    return validator.validate(control.value);
  }

}

export class SkypeNameValidator {

  private skypeNameMatcher = /^[a-z][a-z\d.,\-_]{5,31}$/i;


  public validate(value: string): SkypeNameValidatorErrors | null {

    if (value && !this.skypeNameMatcher.test(value)) {
      return { skypeName: true };
    }

    return null;

  }

}
