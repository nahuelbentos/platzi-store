import { AbstractControl } from '@angular/forms';

import { AcuService } from '@acu/services/acu.service';
import { HttpClient as http } from '@angular/common/http';

export class MyValidators {

  // constructor(private http: HttpClient) { }

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static existeAlumno(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { alumno_invalid: true };
    }
    return null;
  }

  static instructorDeLicencia(control: AbstractControl) {
    const value = control.value;
    const acuService: AcuService = new AcuService(http);
    // acuService.
    //   console.log(value);
    if (value = 'S') {
      return { alumno_invalid: true };
    }
    return null;
  }

}
