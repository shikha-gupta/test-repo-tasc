import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredMinLengthCustomValidator(lengthRe: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = (String(control.value) && (String(control.value).length >= lengthRe)) ? true : false;
      return forbidden ? null : { 'requiredMinLengthCustom': true } ;
    };
  }

export function requiredAtLeastOneUpperCaseValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { 'requiredAtLeastOneUpperCase': true };
  };
}

export function requiredAtLeastOneSpecialCharacterValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { 'requiredAtLeastOneSpecialCharacter': true };
  };
}
export function requiredAtLeastOneNumericValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { 'requiredAtLeastOneNumeric': true };
  };
}

export function requiredNoSpaceValidator(valueRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = valueRe.test(control.value);
    return forbidden ? null : { 'requiredNoSpace': true };
  };
}

export function requiredEmailValidator(valueRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = valueRe.test(String(control.value).toLowerCase());
    return forbidden ? null : { 'requiredEmail': true };
  };
}

