
import {FormControl} from '@angular/forms';


export function skypeNameValidator () {

  const validator = new SkypeNameValidator();

  return function validateSkypeName (control: FormControl) {
    return validator.validate(control.value);
  }

}

export class SkypeNameValidator {

  private skypeNameMatcher = /^[a-z][a-z\d.,\-_]{5,31}$/i;


  public validate (value: string): any {

    if (!value) {
      return null;
    }

    if (!this.skypeNameMatcher.test(value)) {
      return {
        skypeName: true
      };
    }

    return null;

  }

}
