import { AbstractControl } from '@angular/forms';

import { AcuService } from '@acu/services/acu.service';

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
