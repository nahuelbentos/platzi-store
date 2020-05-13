import { FormGroup } from '@angular/forms';

export function ValidateFechaPosterior(controlName: string, matchingControlName: string) {
    console.log('validateFechaPosterior');
    return (formGroup: FormGroup) => {
        const fecha1 = formGroup.controls[controlName];
        const fecha2 = formGroup.controls[matchingControlName];

        const value1 = new Date(fecha1.value);
        const value2 = new Date(fecha2.value);
        value1.setHours(0, 0, 0, 0);
        value2.setHours(0, 0, 0, 0);

        if (fecha2.errors && !fecha2.errors.fechaPosteriorInvalid) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (value1 > value2) {
            fecha2.setErrors({ fechaPosteriorInvalid: true });
        } else {
            fecha2.setErrors(null);
        }
    };
}


// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    console.log('MustMatch');
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

