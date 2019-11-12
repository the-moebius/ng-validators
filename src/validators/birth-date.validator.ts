
import { AbstractControl } from '@angular/forms';
import { LocalDate, nativeJs } from 'js-joda';

// @todo: fix this after issue is resolved
// https://github.com/moment/moment/issues/5288
// @ts-ignore
import { isMoment, Moment } from 'moment/src/lib/moment/constructor';


export interface BirthDateValidatorOptions {
  minYearsOld?: number;
  maxYearsOld?: number;
}

export interface BirthDateValidatorErrors {
  birthDateMinYearsOld?: { minYearsOld: number },
  birthDateMaxYearsOld?: { maxYearsOld: number },
}


export function birthDateValidator(options: BirthDateValidatorOptions) {

  const validator = new BirthDateValidator(options);

  return function validateBirthDate(control: AbstractControl) {
    return validator.validate(control.value);
  }

}


export class BirthDateValidator {

  private currentDate = LocalDate.now();


  constructor(private options: BirthDateValidatorOptions) {
  }


  public validate(
    birthDate?: Date | LocalDate | Moment

  ): BirthDateValidatorErrors | null {

    if (!birthDate) {
      return null;
    }

    // Converting from native date or moment to LocalDate
    if (birthDate instanceof Date || isMoment(birthDate)) {
      birthDate = LocalDate.from(nativeJs(birthDate));
    }

    const yearsOld = Math.floor(
      birthDate.until(this.currentDate).toTotalMonths() / 12
    );

    const {
      minYearsOld = 0,
      maxYearsOld = 0,

    } = this.options;

    const errors: BirthDateValidatorErrors = {};

    if (minYearsOld > 0 && yearsOld < minYearsOld) {
      errors.birthDateMinYearsOld = {
        minYearsOld,
      };
    }

    if (maxYearsOld > 0 && yearsOld > maxYearsOld) {
      errors.birthDateMaxYearsOld = {
        maxYearsOld,
      };
    }

    return (
      Object.keys(errors).length > 0 ?
        errors :
        null
    );

  }

}
