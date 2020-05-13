import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';
import { SeleccionarCursoComponent } from '../seleccionar-curso/seleccionar-curso.component';

import { AgendaComponent } from '../../agenda.component';
import { MyErrorStateMatcher } from '../agendar-clase/agendar-clase.component';
import { SeleccionarAlumnoComponent } from '../seleccionar-alumno/seleccionar-alumno.component';
import { AltaAlumnoComponent } from '../alta-alumno/alta-alumno.component';
import { MyValidators } from '@utils/validators';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ValidateFechaPosterior } from '@utils/custom-validator';


export interface InscripcionCurso {
  TrnMode: string;
  FechaClase: string;
  Hora: number;
  EscInsId: string;
  EscInsNom: string;
  TipCurId: number;
  TipCurNom: string;
  EscAgeInsObservaciones: string;
  mensaje: string;
  AluNro: number;
  AluNomApe: string;
  AluCI: number;
  AluTel1: number;
  AluTel2: number;
}

@Component({
  selector: 'app-inscripcion-curso',
  templateUrl: './inscripcion-curso.component.html',
  styleUrls: ['./inscripcion-curso.component.scss']
})
export class InscripcionCursoComponent {



  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  selected = ' ';
  inscripcionCurso: InscripcionCurso;
  hora: Date = new Date();
  fechaClase: Date = new Date();
  instructor: string;
  instructorAsignado = '';
  cursoNombre: string;
  hoy = new Date();
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  horasLibres = [];

  // para el dialog
  curso: any;

  // validacionesFecha
  fecha1: Date;
  fecha2: Date;
  fecha3: Date;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgendaComponent>,
    private acuService: AcuService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Estoy en el constructor de agenda-curso, la res es: ', this.data);
    this.inscripcionCurso = this.data.inscripcionCurso;

    // tslint:disable-next-line: max-line-length
    const day = Number(this.inscripcionCurso.FechaClase.substring(this.inscripcionCurso.FechaClase.length - 2, this.inscripcionCurso.FechaClase.length));
    const month = Number(this.inscripcionCurso.FechaClase.substring(5, 7));
    const year = Number(this.inscripcionCurso.FechaClase.substring(0, 4));

    this.fechaClase.setDate(day);
    this.fechaClase.setMonth(month - 1);
    this.fechaClase.setFullYear(year);
    this.generateHorasLibres();
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      fechaClase: [this.fechaClase, [Validators.required, MyValidators.fechaPosteriorAHoy]],
      cursoId: [
        '',
        [Validators.required], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
      cursoNombre: [''],
      cursoClasesPracticas: [''],
      cursoClasesTeoricas: [''],
      cursoExamenPractico: [''],
      cursoExamenTeorico: [''],
      escCurTe1: ['', Validators.required],
      escCurTe2: ['', Validators.required],
      escCurTe3: ['', Validators.required],
      escCurIni: ['', [Validators.required, MyValidators.fechaAnteriorAHoy]],
      alumnoNumero: [
        '',
        [Validators.required], // sync validators
        // [
        //   existeAlumnoValidator(this.acuService),
        //   alumnoYaAsignadoValidator(this.acuService),
        //   alumnoTieneExcepcionValidator(this.acuService)
        // ] // async validators
      ],
      alumnoNombre: [''],
      alumnoCI: [''],
      alumnoTelefono: [''],
      alumnoCelular: [''],
      disponibilidadLunes: [''],
      disponibilidadMartes: [''],
      disponibilidadMiercoles: [''],
      disponibilidadJueves: [''],
      disponibilidadViernes: [''],
      disponibilidadSabado: [''],
      observaciones: ['']
    }, {
      validator: [
        ValidateFechaPosterior('escCurIni', 'escCurTe1'),
        ValidateFechaPosterior('escCurTe1', 'escCurTe2'),
        ValidateFechaPosterior('escCurTe2', 'escCurTe3')]
    }
    );
  }


  seleccionarCurso() {
    let cursos = JSON.parse(localStorage.getItem('Cursos'));

    if (!cursos) {
      this.acuService.getCursos()
        .subscribe((res: any) => {
          console.log('Cursos: ', res);

          cursos = res;
          console.log('cursos: ', cursos);
          localStorage.setItem('cursos', JSON.stringify(cursos));
          this.openDialogCursos(cursos);
        });
    } else {
      this.openDialogCursos(cursos);
    }
  }

  cambiarDiaFecha1(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log('cambiarDiaFecha1');
    console.log(`${type}: ${event.value}`);
    this.fecha1 = event.value;
  }
  cambiarDiaFecha2(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log('cambiarDiaFecha2');
    console.log(`${type}: ${event.value}`);
    this.fecha2 = event.value;
  }
  cambiarDiaFecha3(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log('cambiarDiaFecha3');
    console.log(`${type}: ${event.value}`);
    this.fecha3 = event.value;
  }

  private openDialogCursos(cursos) {
    const cursosDialogRef = this.dialog.open(SeleccionarCursoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        cursos,
      }
    });

    cursosDialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
      this.curso = result;
      this.inscripcionCurso.TipCurId = result.TipCurId;
      this.inscripcionCurso.TipCurNom = result.TipCurNom;
      this.addInfoCursoToForm(result);

    });

  }

  obtenerCurso() {
    const cursoId = this.form.get('cursoId').value;
    console.log('obtenerCurso - cursoId: ', cursoId);
    if (cursoId !== '') {

      this.acuService.getCurso(cursoId)
        .subscribe((res: any) => {
          console.log('obtenerCurso - res: ', res);
          if (res.TipCurId === '0') {

            Swal.fire({
              icon: 'warning',
              title: 'No encontrado!',
              text: 'El código del curso no existe, seleccione un existente.'
            }).then((res2) => {
              if (res2.dismiss === Swal.DismissReason.timer) {
                console.log('Cierro  con ela timer');
              }
            });
          }

          res.TipCurId = cursoId;
          this.inscripcionCurso.TipCurId = res.TipCurId;
          this.inscripcionCurso.TipCurNom = res.TipCurNom;
          this.addInfoCursoToForm(res);
        });

    }
  }

  addInfoCursoToForm(result: any) {

    // cursoClasesPracticas: [''],
    // cursoClasesTeoricas: [''],
    // cursoExamenPractico: [''],
    // cursoExamenTeorico: [''],
    const examenPractico = (result.TipCurExaPra === 'S');
    const examenTeorico = (result.TipCurExaTeo === 'S');
    const escCurIni = new Date();
    this.form.patchValue({
      cursoId: result.TipCurId,
      cursoNombre: result.TipCurNom,
      cursoClasesPracticas: result.TipCurClaPra,
      cursoClasesTeoricas: result.TipCurClaTeo,
      cursoExamenPractico: examenPractico,
      cursoExamenTeorico: examenTeorico,
      escCurIni,
    });
  }


  guardarClase(event: Event) {
    event.preventDefault();
    console.log('Submit, form valid: ', this.form.valid);
    console.log('Submit, form value: ', this.form.value);
    console.log('Submit, form value.cursoId: ', this.form.value.cursoId);

    if (this.form.invalid) {
      console.log('Submit, form invalid: ', this.form.invalid);
      return;
    }


    const existe: boolean = JSON.parse(localStorage.getItem('existe'));

    if (this.form.valid) {
      console.log('form.value: ', this.form.value);
      console.log('this.inscripcionCurso: ', this.inscripcionCurso);
      this.acuService.guardarAgendaInstructor(this.inscripcionCurso)
        .subscribe((res: any) => {
          console.log('res: ', res);
          console.log('mensaje: ', res.mensaje);
          this.inscripcionCurso.mensaje = res.mensaje;
        });


    }
  }


  seleccionarAlumno() {
    let alumnos = JSON.parse(localStorage.getItem('Alumnos'));

    let cantidad = localStorage.getItem('Cantidad');



    if (!alumnos) {

      this.acuService.obtenerAlumnos(20, 1, '')
        .subscribe((res: any) => {
          console.log('res: ', res);
          console.log('res.Cantidad: ', res.Cantidad);
          console.log('res.Alumnos: ', res.Alumnos);
          alumnos = res.Alumnos;
          cantidad = res.Cantidad;
          localStorage.setItem('Alumnos', JSON.stringify(alumnos));
          localStorage.setItem('Cantidad', cantidad);

          this.openDialogAlumnos(alumnos, cantidad);
        });

    } else {
      this.openDialogAlumnos(alumnos, cantidad);
    }
  }


  altaAlumno() {
    this.openDialogAltaAlumnos();
  }

  private openDialogAltaAlumnos() {
    const alumnosDialogRef = this.dialog.open(AltaAlumnoComponent, {
      height: 'auto',
      width: '700px',
    });

    alumnosDialogRef.afterClosed().subscribe(result => {
      // this.alumno = result;
      console.log('1.alumno: ' + result);
      console.log('2.alumno: ' + JSON.stringify(result));

      this.addInfoAlumnoAlForm(result);
    });

  }

  private openDialogAlumnos(alumnos, cantidad) {
    const alumnosDialogRef = this.dialog.open(SeleccionarAlumnoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        alumnos,
        cantidad
      }
    });

    alumnosDialogRef.afterClosed().subscribe(result => {
      // this.alumno = result;
      console.log('1.alumno: ' + result);
      console.log('2.alumno: ' + JSON.stringify(result));

      this.addInfoAlumnoAlForm(result);
    });

  }

  addInfoAlumnoAlForm(result) {
    this.form.patchValue({
      alumnoNumero: result.AluNro,
      alumnoNombre: result.AluNomComp,
      alumnoCI: this.formatCI(result.AluCI, result.AluDV),
      alumnoTelefono: result.AluTel1,
      alumnoCelular: result.AluTel2,
    });

  }

  get alumnoNumeroField() {
    return this.form.get('alumnoNumero');
  }

  get alumnoNombreField() {
    return this.form.get('alumnoNombre');
  }

  get alumnoCIField() {
    return this.form.get('alumnoCI');
  }

  get alumnoTelefonoField() {
    return this.form.get('alumnoTelefono');
  }

  get alumnoCelularField() {
    return this.form.get('alumnoCelular');
  }

  get cursoNombreField() {
    return this.form.get('cursoNombre');
  }

  get cursoIdField() {
    return this.form.get('cursoId');
  }

  get escCurTe1Field() {
    return this.form.get('escCurTe1');
  }

  get escCurTe2Field() {
    return this.form.get('escCurTe2');
  }
  get escCurTe3Field() {
    return this.form.get('escCurTe3');
  }
  get escCurIniField() {
    return this.form.get('escCurIni');
  }


  get observacionesField() {
    return this.form.get('observaciones');
  }

  formatCI(value: string, digitoVerificador?: string): string {


    const ci = value;
    const cant: any = Math.ceil(ci.length / 3);

    let cadena = new Array(cant);
    let substring = ci;
    let corte;
    let result = '';

    for (let i = 0; i < cant; i++) {


      corte = (substring.length - 3);
      cadena[i] = substring.substring(corte, substring.length);
      substring = substring.substring(corte, 0);


    }

    cadena = cadena.reverse();

    for (let i = 0; i < cadena.length; i++) {
      if (i + 1 < cadena.length) {
        result += cadena[i] + '.';
      } else {
        result += cadena[i] + '-';
      }
    }
    console.log('result: ', result);

    return result + digitoVerificador;
  }

  generateHorasLibres() {
    for (let i = 6; i < 21; i++) {
      const horaIni = i;
      const horaFin = i + 1;
      const o = {
        value: `${horaIni * 100}-${horaFin * 100}`,
        description: `${horaIni}:00 - ${horaFin}:00`,
        horaIni: `${horaIni * 100}`,
        horaFin: `${horaFin * 100}`,
      };
      this.horasLibres.push(o);
    }

    console.log('horas libres: ', this.horasLibres);
  }

}
