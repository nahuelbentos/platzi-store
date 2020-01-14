import { Component, OnInit, Inject } from '@angular/core';
import { AgendaComponent, DialogData } from '../../agenda.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agendar-clase',
  templateUrl: './agendar-clase.component.html',
  styleUrls: ['./agendar-clase.component.scss']
})
export class AgendarClaseComponent implements OnInit {

  selected = ' ';
  agendaClase: AgendaClase;
  constructor(
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('Estoy en agendar-clase, mi data es ', this.data.agendaClase);
    this.agendaClase = this.data.agendaClase;
    console.log('Estoy en agendar-clase, mi agendaClase es ', this.agendaClase);
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
}