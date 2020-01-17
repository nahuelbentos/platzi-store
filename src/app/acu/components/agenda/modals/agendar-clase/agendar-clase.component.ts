import { Component, OnInit, Inject, ErrorStateMatcher } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AgendaComponent } from '../../agenda.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyValidators } from '@utils/validators';
import { AcuService } from '@acu/services/acu.service';




@Component({
  selector: 'app-agendar-clase',
  templateUrl: './agendar-clase.component.html',
  styleUrls: ['./agendar-clase.component.scss']
})
export class AgendarClaseComponent {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  selected = ' ';
  agendaClase: AgendaClase;
  hora: Date = new Date();
  fechaClase: Date = new Date();
  movil: number;
  instructorAsignado = '';
  curso: string;

  // constructor() { }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgendaComponent>,
    private acuService: AcuService,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  testSoap1() {
    this.acuService.soap();
    // .subscribe((res: any) => {
    //   console.log('res: ', res);


    // });
  }

  testSoap() {
    this.acuService.getValidation1()
      .subscribe((res: any) => {
        console.log('res: ', res);


      });
  }

  private buildForm() {
    console.log('agenda from buildForm: ', this.agendaClase);
    if (this.agendaClase) {
      this.form = this.formBuilder.group({
        fechaClase: [this.fechaClase],
        movil: [this.agendaClase.EscMovCod, [Validators.required]],
        alumnoNumero: [this.agendaClase.AluNro, [MyValidators.existeAlumno]],
        alumnoNombre: [this.agendaClase.AluNomApe, [Validators.required]],
        curso: [this.agendaClase.Cursos[0], [Validators.required]],
        tipoClase: [this.agendaClase.EsAgCuTipCla],
        numeroClase: [this.agendaClase.EsAgCuNroCla],
        claseAdicional: [this.agendaClase.EsAgCuClaAdiSN],
        avisoInstructor: [this.agendaClase.AvisoInstructor],
        instructorAsignado: [this.instructorAsignado],
        detalle: [this.agendaClase.EsAgCuDet],
        estadoClase: [this.agendaClase.EsAgCuEst],
        observaciones: [this.agendaClase.EsAgCuObs],
        aviso: [this.agendaClase.EsAgCuDetAviso],
      });

    } else {
      this.form = this.formBuilder.group({
        fechaClase: ['', [Validators.required]],
        movil: ['', [Validators.required]],
        alumnoNumero: ['', [MyValidators.isAlumnoValido]],
        alumnoNombre: ['', [Validators.required]],
        curso: ['', [Validators.required]],
        tipoClase: [''],
        numeroClase: [''],
        claseAdicional: [''],
        avisoInstructor: [''],
        instructorAsignado: [''],
        detalle: [''],
        estadoClase: [''],
        observaciones: [''],
        aviso: [''],
      });
    }
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

  get cursoField() {
    return this.form.get('curso');
  }

  guardarClase(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const agendaClase = this.form.value;


    }
  }

}

export interface AgendaClase {
  FechaClase: string;
  Hora: number;
  EscMovCod: number;
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


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
