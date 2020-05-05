import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { SeleccionarCursoComponent } from '../seleccionar-curso/seleccionar-curso.component';

import { AgendaComponent } from '../../agenda.component';
import { MyErrorStateMatcher } from '../agendar-clase/agendar-clase.component';
import { SeleccionarAlumnoComponent } from '../seleccionar-alumno/seleccionar-alumno.component';
import { existeAlumnoValidator } from '@utils/validators/existe-alumno-validator.directive';
import { alumnoYaAsignadoValidator } from '@utils/validators/alumno-ya-asignado.directive';
import { alumnoTieneExcepcionValidator } from '@utils/validators/alumno-tiene-excepecion.directive';
import { AltaAlumnoComponent } from '../alta-alumno/alta-alumno.component';


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
export class InscripcionCursoComponent implements OnInit {



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

  // para el dialog
  curso: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgendaComponent>,
    private acuService: AcuService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Estoy en el constructor de agenda-curso, la res es: ', this.data);
    console.log('Estoy en el constructor de agenda-curso, la res es: ', this.data);
    this.inscripcionCurso = this.data.inscripcionCurso;
    // console.log('   this.agendaCurso es: ', this.agendaCurso);
    // const day = Number(this.agendaCurso.FechaClase.substring(this.agendaCurso.FechaClase.length - 2, this.agendaCurso.FechaClase.length));
    // const month = Number(this.agendaCurso.FechaClase.substring(5, 7));
    // const year = Number(this.agendaCurso.FechaClase.substring(0, 4));

    // this.fechaClase.setDate(day);
    // this.fechaClase.setMonth(month - 1);
    // this.fechaClase.setFullYear(year);

    // this.cursoNombre = (this.agendaCurso) ? this.agendaCurso.TipCurNom : '';

    // this.hora.setHours(this.agendaCurso.Hora, 0);
    // this.instructor = this.agendaCurso.EscInsId;
    this.buildForm();
  }

  ngOnInit() {

    // // toISOString, es el formato que leyo bien la api.
    // localStorage.setItem('fechaClase', this.fechaClase.toISOString());
    // const horaStr = this.agendaCurso.Hora * 100;
    // localStorage.setItem('horaClase', horaStr.toString());
    // localStorage.setItem('instructorCod', this.instructor.toString());

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      fechaClase: ['', [Validators.required]],
      instructor: ['', [Validators.required]],
      cursoId: [
        '',
        [Validators.required], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
      cursoNombre: ['', [Validators.required]],
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
      alumnoCI: [''],
      alumnoTelefono: [''],
      alumnoCelular: [''],
      observaciones: ['']
    });
  }


  seleccionarCurso() {
    let cursos = JSON.parse(localStorage.getItem('Cursos'));

    if (!cursos) {
      this.acuService.getCursos()
        .subscribe((res: any) => {
          console.log('Cursos: ', res);

          cursos = res.Cursos;
          localStorage.setItem('cursos', JSON.stringify(cursos));
          this.openDialogCursos(cursos);
        });
    } else {
      this.openDialogCursos(cursos);
    }
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
      this.curso = result;
      this.cursoNombre = this.inscripcionCurso.TipCurNom = result.TipCurNom;

      this.form.patchValue({
        cursoId: result.TipCurId,
        cursoNombre: result.TipCurNom
      });
    });

  }

  obtenerCurso(cursoId) {
    this.acuService.getCurso(cursoId)
      .subscribe((res: any) => {
        console.log('res: ', res);
        // this.inscripcionCurso.TipCurId = res.Curso.TipCurId;
        this.cursoNombre = this.inscripcionCurso.TipCurNom = res.Curso.TipCurNom;
      });
  }


  guardarClase(event: Event) {
    event.preventDefault();
    console.log('Submit, form valid: ', this.form.valid);
    console.log('Submit, form value: ', this.form.value);
    console.log('Submit, form value.cursoId: ', this.form.value.cursoId);

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
    let alumnos = JSON.parse(localStorage.getItem('Alumnos'));

    let cantidad = localStorage.getItem('Cantidad');



    // if (!alumnos) {

    //   this.acuService.obtenerAlumnos(20, 1, '')
    //     .subscribe((res: any) => {
    //       console.log('res: ', res);
    //       console.log('res.Cantidad: ', res.Cantidad);
    //       console.log('res.Alumnos: ', res.Alumnos);
    //       alumnos = res.Alumnos;
    //       cantidad = res.Cantidad;
    //       localStorage.setItem('Alumnos', JSON.stringify(alumnos));
    //       localStorage.setItem('Cantidad', cantidad);

    //       this.openDialogAltaAlumnos(alumnos, cantidad);
    //     });

    // } else {
    this.openDialogAltaAlumnos(alumnos, cantidad);
    // }
  }

  private openDialogAltaAlumnos(departamentoLocalidades, cantidad) {
    const alumnosDialogRef = this.dialog.open(AltaAlumnoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        departamentoLocalidades,
        cantidad
      }
    });

    alumnosDialogRef.afterClosed().subscribe(result => {
      // this.alumno = result;
      console.log('1.alumno: ' + result);
      console.log('2.alumno: ' + JSON.stringify(result));

      this.form.patchValue({
        alumnoNumero: result.AluNro,
        alumnoNombre: result.AluNomComp,
        alumnoCI: this.formatCI(result.AluCI, result.AluDV),
        alumnoTelefono: result.AluTel1,
        alumnoCelular: result.AluTel2,
      });
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

      this.form.patchValue({
        alumnoNumero: result.AluNro,
        alumnoNombre: result.AluNomComp,
        alumnoCI: this.formatCI(result.AluCI, result.AluDV),
        alumnoTelefono: result.AluTel1,
        alumnoCelular: result.AluTel2,
      });
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

}
