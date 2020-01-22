import { AbstractControl } from '@angular/forms';

import { AcuService } from '@acu/services/acu.service';

export class MyValidators {

  constructor(acuService: AcuService) { }

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static isAlumnoValido(control: AbstractControl, existe: boolean) {
    const value = control.value;
    console.log('value: ', value);
    console.log(value);
    if (value > 10000 || !existe) {
      return { alumno_invalid: true };
    }
    return null;
  }

  static alumnoYaAsignado(control: AbstractControl, existe: boolean) {
    const value = control.value;
    console.log('value: ', value);

    console.log(value);

    if (!existeAlumno(value)) {
      return { alumno_invalid: true };
    }
    return null;
  }

  static instructorDeLicencia(control: AbstractControl) {
    const value = control.value;
    // acuService.
    //   console.log(value);
    if (value === 'S') {
      return { alumno_invalid: true };
    }
    return null;
  }

}



function existeAlumno(alumnoNumero: number): boolean {
  const acuService: AcuService;
  // acuService.
  return true;
}