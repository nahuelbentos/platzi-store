import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AgendaComponent } from '../../agenda.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { existeAlumnoValidator } from '@utils/validators/existe-alumno-validator.directive';
import { licenciaInstructorValidator } from '@utils/validators/licencia-instructor-validator.directive';
import { instructorYaAsignadoValidator } from '@utils/validators/instructor-ya-asignado-validator.directive';
import { alumnoYaAsignadoValidator } from '@utils/validators/alumno-ya-asignado.directive';
import { alumnoTieneExcepcionValidator } from '@utils/validators/alumno-tiene-excepecion.directive';
import { SeleccionarAlumnoComponent } from '../seleccionar-alumno/seleccionar-alumno.component';
import { SeleccionarInstructorComponent } from '../seleccionar-instructor/seleccionar-instructor.component';

import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { SeleccionarFechaComponent } from '../seleccionar-fecha/seleccionar-fecha.component';



export interface AgendaClase {
  FechaClase: string;
  Hora: number;
  EscMovCod: number;
  TrnMode: string;
  AluId: string;
  AluNro: string;
  AluNomApe: string;
  Cursos: string[];
  CantidadClasesPracticas: number;
  EsAgCuTipCla: string;
  EsAgCuClaAdiSN: string;
  EscInsId: string;
  EscInsNom: string;
  EsAgCuInsId: string;
  EsAgCuInsNom: string;
  EsAgCuDet: string;
  EsAgCuEst: string;
  EsAgCuObs: string;
  EsAgCuDetAviso: string;
  EscCurEmp: string;
  EsAgCuInNoCorto: string;
  EsAgCuNroCla: number;
  EsAgCuEstOld: string;
  EsAgCuAvisoOld: number;
  EsAgCuAviso: number;
  EsAgCuDetAvisoOld: string;
  AvisoInstructor: string;
}


@Component({
  selector: 'app-agendar-clase',
  templateUrl: './agendar-clase.component.html',
  styleUrls: ['./agendar-clase.component.scss']
})
export class AgendarClaseComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  selected = ' ';
  agendaClase: AgendaClase;
  hora: Date = new Date();
  fechaClase: Date = new Date();
  movil: number;
  instructorAsignado = '';
  curso: string;
  hoy = new Date();

  // para el dialog
  alumno: any;

  // constructor() { }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgendaComponent>,
    private acuService: AcuService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.agendaClase = this.data.agendaClase;
    const day = Number(this.agendaClase.FechaClase.substring(this.agendaClase.FechaClase.length - 2, this.agendaClase.FechaClase.length));
    const month = Number(this.agendaClase.FechaClase.substring(5, 7));
    const year = Number(this.agendaClase.FechaClase.substring(0, 4));

    this.fechaClase.setDate(day);
    this.fechaClase.setMonth(month - 1);
    this.fechaClase.setFullYear(year);


    this.hora.setHours(this.agendaClase.Hora, 0);
    this.instructorAsignado = `${this.agendaClase.EsAgCuInsId.toString().trim()} ${this.agendaClase.EsAgCuInsNom}`;
    this.movil = this.agendaClase.EscMovCod;
    this.buildForm();
  }
  ngOnInit() {

    // toISOString, es el formato que leyo bien la api.
    localStorage.setItem('fechaClase', this.fechaClase.toISOString());


    console.log('1) Hora: ', this.hora.toDateString());
    console.log('2) Hora: ', this.hora.toString());
    console.log('3) Hora: ', this.hora.toISOString());
    console.log('4) Hora: ', this.hora.toJSON());
    console.log('5) Hora: ', this.hora.toLocaleDateString());
    console.log('6) Hora: ', this.hora.toLocaleString());
    console.log('7) Hora: ', this.hora.toLocaleTimeString());
    console.log('8) Hora: ', this.hora.toTimeString());
    console.log('9) Hora: ', this.hora.toUTCString());
    const horaStr = this.agendaClase.Hora * 100;
    localStorage.setItem('horaClase', horaStr.toString());

    console.log('1) Movil: ', this.movil.toString());
    localStorage.setItem('movilCod', this.movil.toString());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  private buildForm() {
    console.log('agenda from buildForm: ', this.agendaClase);
    if (this.agendaClase) {
      this.form = this.formBuilder.group({
        fechaClase: [this.fechaClase],
        movil: [this.agendaClase.EscMovCod, [Validators.required]],
        alumnoNumero: [
          this.agendaClase.AluNro,
          [Validators.required], // sync validators
          [
            existeAlumnoValidator(this.acuService),
            alumnoYaAsignadoValidator(this.acuService),
            alumnoTieneExcepcionValidator(this.acuService)
          ] // async validators
        ],
        alumnoNombre: [this.agendaClase.AluNomApe, [Validators.required]],
        curso: [this.agendaClase.Cursos[0], [Validators.required]],
        tipoClase: [this.agendaClase.EsAgCuTipCla],
        numeroClase: [this.agendaClase.EsAgCuNroCla],
        claseAdicional: [this.agendaClase.EsAgCuClaAdiSN],
        avisoInstructor: [this.agendaClase.AvisoInstructor],
        instructorAsignado: [this.instructorAsignado],
        instructor: [
          this.agendaClase.EscInsId,
          [Validators.required], // sync validators
          [licenciaInstructorValidator(this.acuService), instructorYaAsignadoValidator(this.acuService)] // async validators

        ],
        detalle: [this.agendaClase.EsAgCuDet],
        estadoClase: [this.agendaClase.EsAgCuEst],
        observaciones: [this.agendaClase.EsAgCuObs],
        aviso: [this.agendaClase.EsAgCuDetAviso],
      });

    } else {
      this.form = this.formBuilder.group({
        fechaClase: ['', [Validators.required]],
        movil: ['', [Validators.required]],
        alumnoNumero: [
          '',
          [Validators.required], // sync validators
          [
            existeAlumnoValidator(this.acuService),
            alumnoYaAsignadoValidator(this.acuService),
            alumnoTieneExcepcionValidator(this.acuService)
          ] // async validators
        ],
        alumnoNombre: ['', [Validators.required]],
        curso: ['', [Validators.required]],
        tipoClase: [''],
        numeroClase: [''],
        claseAdicional: [''],
        avisoInstructor: [''],
        instructorAsignado: [''],
        instructor: [
          '',
          [Validators.required], // sync validators
          [licenciaInstructorValidator(this.acuService), instructorYaAsignadoValidator(this.acuService)] // async validators

        ],
        detalle: [''],
        estadoClase: [''],
        observaciones: [''],
        aviso: [''],
      });
    }
  }

  seleccionarInstructor() {
    let instructores = JSON.parse(localStorage.getItem('Instructores'));

    if (!instructores) {
      this.acuService.getInstructores()
        .subscribe((res: any) => {
          console.log(' res  : ', res);
          console.log(' res.Instructores  : ', res.Instructores);
          instructores = res.Instructores;
          localStorage.setItem('Instructores', JSON.stringify(instructores));
          this.openDialogInstructores(instructores);
        });
    } else {
      this.openDialogInstructores(instructores);
    }
  }

  private openDialogInstructores(instructores) {
    const instructoresDialogRef = this.dialog.open(SeleccionarInstructorComponent, {
      height: 'auto',
      width: '700px',
      data: {
        instructores,
      }
    });

    instructoresDialogRef.afterClosed().subscribe(result => {
      console.log('2) The dialog was closed: ', result);
      this.alumno = result;
      this.form.patchValue({
        instructor: result.EscInsId,
        instructorAsignado: result.EscInsNom
      });
    });

  }

  seleccionarAlumno() {
    let alumnos = JSON.parse(localStorage.getItem('Alumnos'));

    if (!alumnos) {
      this.acuService.getAlumnos()
        .subscribe((res: any) => {
          console.log(' res  : ', res);
          console.log(' res.Alumnos  : ', res.Alumnos);
          alumnos = res.Alumnos;
          localStorage.setItem('Alumnos', JSON.stringify(alumnos));
          this.openDialogAlumnos(alumnos);
        });
    } else {
      this.openDialogAlumnos(alumnos);
    }
  }

  private openDialogAlumnos(alumnos) {
    const alumnosDialogRef = this.dialog.open(SeleccionarAlumnoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        alumnos,
      }
    });

    alumnosDialogRef.afterClosed().subscribe(result => {
      console.log('2) The dialog was closed: ', result);
      this.alumno = result;
      this.form.patchValue({
        alumnoNombre: result.AluNomComp,
        alumnoNumero: result.AluNro
      });
    });

  }

  get alumnoNombreField() {
    return this.form.get('alumnoNombre');
  }

  get alumnoNumeroField() {
    return this.form.get('alumnoNumero');
  }
  get instructorAsignadoField() {
    return this.form.get('instructorAsignado');
  }

  get instructorField() {
    return this.form.get('instructor');
  }
  get cursoField() {
    return this.form.get('curso');
  }

  guardarClase(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const agendaClase = this.form.value;


    }
  }

  confirmarLiberarClase() {
    Swal.fire({
      title: 'Confirmación de Usuario',
      text: 'Se liberará la hora, perdiendose datos actuales. ¿Confirma el proceso?',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log('Resultado:: ', result);

        Swal.fire({
          title: 'Confirmado!',
          text: 'Se liberó la hora, correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          onClose: () => {
            console.log('Cieerro antes de timer');
          }
        }).then((res) => {
          if (res.dismiss === Swal.DismissReason.timer) {
            console.log('Cierro  con el timer');
          }
        });

      }
    });

  }

  moverClase() {
    const fechaDialogRef = this.dialog.open(SeleccionarFechaComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        fecha: this.fechaClase,
      }
    });

    fechaDialogRef.afterClosed().subscribe((fechaSeleccionada: Date) => {
      console.log('2) The dialog  fecha was closed: ', fechaSeleccionada);
      if (fechaSeleccionada < this.hoy && !(fechaSeleccionada.toLocaleDateString() === this.hoy.toLocaleDateString())) {
        Swal.fire({
          title: 'Confirmación de Usuario',
          text: 'La fecha seleccionada es menor a la actual. ¿Confirma continuar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            console.log('Resultado:: ', result);

            Swal.fire({
              title: 'Confirmado!',
              text: 'Se liberó la hora, correctamente',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              onClose: () => {
                console.log('Cieerro antes de timer');
              }
            }).then((res) => {
              if (res.dismiss === Swal.DismissReason.timer) {
                console.log('Cierro  con el timer');
              }
            });

          }
        });
      }
      // this.alumno = result;
      // this.form.patchValue({
      //   alumnoNombre: result.AluNomComp,
      //   alumnoNumero: result.AluNro
      // });
    });

  }


  private openDialogFecha() {

  }

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
