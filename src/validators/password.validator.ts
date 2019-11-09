
import { AbstractControl } from '@angular/forms';


export interface PasswordValidatorOptions {
  minLength?: number;
  maxLength?: number;
  requireLetters?: boolean;
  requireLowerCaseLetters?: boolean;
  requireUpperCaseLetters?: boolean;
  requireNumbers?: boolean;
  requireSpecialCharacters?: boolean;
}

export interface PasswordValidatorErrors {
  passwordMinLengthRequired?: {
    minLength: number;
  };
  passwordMaxLengthExceeded?: {
    maxLength: number;
  };
  passwordLetterRequired?: true;
  passwordLowerCaseLetterRequired?: true;
  passwordUpperCaseLetterRequired?: true;
  passwordNumberRequired?: true;
  passwordSpecialCharacterRequired?: true;
}


export function passwordValidator(options: PasswordValidatorOptions) {

  const validator = new PasswordValidator(options);

  return function validatePassword(control: AbstractControl) {
    return validator.validate(control.value);
  }

}


export class PasswordValidator {

  private letterMatcher = /[a-zA-Z]/;
  private lowerCaseLetterMatcher = /[a-z]/;
  private upperCaseLetterMatcher = /[A-Z]/;
  private numberMatcher = /[0-9]/;
  private specialCharactersMatcher = /[-+=_.,:;~`!@#$%^&*(){}<>\[\]"'\/\\]/;


  constructor(private options: PasswordValidatorOptions) {
  }


  public validate(value: string): PasswordValidatorErrors | null {

    if (!value) {
      return null;
    }

    const {
      minLength,
      maxLength,
      requireLetters,
      requireLowerCaseLetters,
      requireUpperCaseLetters,
      requireNumbers,
      requireSpecialCharacters,

    } = this.options;

    const errors: PasswordValidatorErrors = {};

    // Minimum length
    if (undefined !== minLength && minLength > 0 && value.length < minLength) {
      errors.passwordMinLengthRequired = {
        minLength: minLength,
      };
    }

    // Maximum length
    if (undefined !== maxLength && maxLength >= 0 && value.length > maxLength) {
      errors.passwordMaxLengthExceeded = {
        maxLength: maxLength,
      };
    }

    // Letters
    if (requireLetters && !this.letterMatcher.test(value)) {
      errors.passwordLetterRequired = true;
    }

    // Lower-case letters
    if (requireLowerCaseLetters && !this.lowerCaseLetterMatcher.test(value)) {
      errors.passwordLowerCaseLetterRequired = true;
    }

    // Upper-case letters
    if (requireUpperCaseLetters  && !this.upperCaseLetterMatcher.test(value)) {
      errors.passwordUpperCaseLetterRequired = true;
    }

    // Numbers
    if (requireNumbers && !this.numberMatcher.test(value)) {
      errors.passwordNumberRequired = true;
    }

    // Special characters
    if (requireSpecialCharacters && !this.specialCharactersMatcher.test(value)) {
      errors.passwordSpecialCharacterRequired = true;
    }

    return (
      Object.keys(errors).length > 0 ?
        errors :
        null
    );

  }

}
