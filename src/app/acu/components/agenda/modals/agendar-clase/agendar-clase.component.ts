import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendaComponent } from '../../agenda.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyValidators } from '@utils/validators';




@Component({
  selector: 'app-agendar-clase',
  templateUrl: './agendar-clase.component.html',
  styleUrls: ['./agendar-clase.component.scss']
})
export class AgendarClaseComponent implements OnInit {

  form: FormGroup;
  selected = ' ';
  agendaClase: AgendaClase;
  hora: Date = new Date();
  fechaClase: Date = new Date();
  movil: number;
  instructorAsignado = '';
  curso = '';

  // constructor() { }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.agendaClase = this.data.agendaClase;

    console.log('1)fecha: ', this.agendaClase.FechaClase);
    let day = Number(this.agendaClase.FechaClase.substring(this.agendaClase.FechaClase.length - 2, this.agendaClase.FechaClase.length));
    let month = Number(this.agendaClase.FechaClase.substring(5, 7));
    let year = Number(this.agendaClase.FechaClase.substring(0, 4));

    this.fechaClase.setDate(day);
    this.fechaClase.setMonth(month);
    this.fechaClase.setFullYear(year);

    console.log('2)day: ', day);
    console.log('2)year: ', year);
    console.log('2)month: ', month);
    // this.fechaClase = this.agendaClase.FechaClase;
    console.log('2)fecha: ', this.fechaClase);
    // console.log('fecha.getDate(): ', this.fechaClase.getDate().toString());
    // console.log('fecha.getUTCDate(): ', this.fechaClase.getUTCDate());
    this.hora.setHours(this.agendaClase.Hora, 0);
    this.instructorAsignado = `${this.agendaClase.EsAgCuInsId.toString().trim()} ${this.agendaClase.EsAgCuInsNom}`;
    this.movil = this.agendaClase.EscMovCod;
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('data: ', this.data);


  }


  private buildForm() {
    console.log('agenda from buildForm: ', this.agendaClase);
    if (this.agendaClase) {
      this.form = this.formBuilder.group({
        fechaClase: [this.agendaClase.FechaClase],
        movil: [this.agendaClase.EscMovCod, [Validators.required]],
        alumnoNumero: [this.agendaClase.AluNro],
        alumnoNombre: [this.agendaClase.AluNomApe],
        curso: [this.curso],
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
        alumnoNumero: [''],
        alumnoNombre: [''],
        curso: [''],
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
