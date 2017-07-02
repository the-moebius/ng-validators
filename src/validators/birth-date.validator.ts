
import {FormControl} from '@angular/forms';
import {LocalDate} from 'js-joda';


export interface BirthDateValidatorOptions {
  minYearsOld?: number;
  maxYearsOld?: number;
}


export function birthDateValidator (options: BirthDateValidatorOptions) {

  const validator = new BirthDateValidator(options);

  return function validateBirthDate (control: FormControl) {
    return validator.validate(control.value);
  }

}


export class BirthDateValidator {

  private currentDate = LocalDate.now();


  constructor (private options: BirthDateValidatorOptions) {
  }


  validate (value: LocalDate): any {

    if (!value) {
      return null;
    }

    const yearsOld = Math.floor(
      value.until(this.currentDate).toTotalMonths() / 12
    );

    const errors: any = {};

    if (this.options.minYearsOld > 0 && yearsOld < this.options.minYearsOld) {
      errors.birthDateMinYearsOld = {
        minYearsOld: this.options.minYearsOld
      };
    }

    if (this.options.maxYearsOld > 0 && yearsOld > this.options.maxYearsOld) {
      errors.birthDateMaxYearsOld = {
        maxYearsOld: this.options.maxYearsOld
      };
    }

    return Object.keys(errors).length > 0 ? errors : null;

  }

}
