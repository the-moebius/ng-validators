
import {FormControl} from '@angular/forms';


export function isTrueValidator () {
  return function validateIsTrue (control: FormControl) {
    if (true === control.value) {
      return null;
    } else {
      return { isTrue: true };
    }
  }
}
