import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  
  validateBudget(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const budget = control.value;
      if (control.touched && control.valid) {
        return budget && budget.toString().length <= limit
          ? null
          : { maxLengthExceeded: true };
      }
      return null;
    };
  }

  endDateAfterStartDateValidator(
    startDateField: string,
    endDateField: string
  ): ValidatorFn {
    return (
      control: AbstractControl
    ): {
      [key: string]: boolean;
    } | null => {
      const startDate = control.get(startDateField)?.value;
      const endDate = control.get(endDateField)?.value;

      if (!startDate || !endDate) {
        return null;
      }

      return new Date(endDate) > new Date(startDate)
        ? null
        : { endDateBeforeStartDate: true };
    };
  }

  startDateEndDateMatchValidator(
    startDateField: string,
    endDateField: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get(startDateField)?.value;
      const endDate = control.get(endDateField)?.value;

      if (startDate && endDate && startDate === endDate) {
        return { datesMatch: true };
      }

      return null;
    };
  }

  startAndEndDateMatchValidator(
    control: AbstractControl,
    startDateControl: string,
    endDateControl: string
  ): boolean {
    const startDate = control?.get(startDateControl)?.value;
    const endDate = control?.get(endDateControl)?.value;
    return startDate && endDate && startDate === endDate;
  }
}

// startAndEndDateMatchValidator is the easiet way to get the control error on view screen
