import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { AcuService } from '@acu/services/acu.service';

import { FormGroup } from '@angular/forms';

export class MyValidators {

  existeAlumno;

  constructor(private acuService: AcuService) {
    this.existeAlumno = aluNro => this.acuService.existeAlumno(aluNro);
  }


  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static fechaPosteriorAHoy(control: AbstractControl) {
    const value = control.value;
    const hoy = new Date();
    console.log(value);

    if (value > hoy) {
      return { fecha_invalid: true };
    }
    return null;
  }

  static fechaAnteriorAHoy(control: AbstractControl) {
    const value = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    value.setHours(0, 0, 0, 0);
    console.log('fechaAnteriorAHoy');
    console.log(' value: ', value);
    console.log(' hoy: ', hoy);
    console.log(' value < hoy: ', value < hoy);


    if (value < hoy) {
      return { fecha_invalid: true };
    }
    return null;
  }

  static alumnoYaAsignado(control: AbstractControl, existe: boolean) {
    const value = control.value;
    console.log('value: ', value);
    console.log(value);
    if (false) {
      return { alumno_invalid: true };
    }
    return null;
  }

  static instructorDeLicencia(control: AbstractControl) {
    const value = control.value;

    if (value === 'S') {
      return { alumno_invalid: true };
    }
    return null;
  }



  isAlumnoValido(control: AbstractControl, existe: boolean) {
    const value = control.value;
    console.log('value: ', value);
    console.log(value);
    this.existeAlumno(value);

    if (value > 10000 || !existe) {
      return { alumno_invalid: true };
    }
    return null;
  }

}


export class FuncionesAuxiliares {

  constructor(private acuService: AcuService) { }

  public existeAlumno(aluNro: number) {
    return this.acuService.existeAlumno(aluNro);
  }

}

// static fechaAnteriorAParameter(parameter: AbstractControl): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     if (control.value !== undefined && (isNaN(control.value) || control.value < parameter.value)) {
//       // tslint:disable-next-line: object-literal-key-quotes
//       return { 'fechaAnteriorInvalid': true };
//     }
//     return null;
//   };
// }

// static fechaPosteriorAParameter(parameter: AbstractControl): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     if (control.value !== undefined && (isNaN(control.value) || control.value > parameter.value)) {
//       // tslint:disable-next-line: object-literal-key-quotes
//       return { 'fechaPosteriorInvalid': true };
//     }
//     return null;
//   };
// }



// custom validator to check that two fields match
export function validateFechaAnterior(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {

    const fecha1 = formGroup.controls[controlName];
    const fecha2 = formGroup.controls[matchingControlName];


    if (fecha2.errors && !fecha2.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (fecha1.value < fecha2.value) {
      fecha2.setErrors({ fechaAnteriorInvalid: true });
    } else {
      fecha2.setErrors(null);
    }
  }
}



