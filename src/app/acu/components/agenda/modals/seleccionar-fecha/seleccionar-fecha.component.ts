import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
export interface DialogData {
  fecha: Date;
  invalidFechaAnterior: boolean;
}
@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.component.html',
  styleUrls: ['./seleccionar-fecha.component.scss'],
})
export class SeleccionarFechaComponent {

  fecha: Date;
  sabadoODomingo: number;
  hoy = new Date();
  invalidFechaAnterior: boolean;
  invalidFecha: boolean;

  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.fecha = data.fecha;
    this.invalidFechaAnterior = data.invalidFechaAnterior;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  diaAnterior() {

    this.modificarFecha(-1);

  }

  diaSiguiente() {
    this.modificarFecha(1);
  }

  validarFecha() {
    this.sabadoODomingo = this.fecha.getDay();
    // tslint:disable-next-line: max-line-length
    this.invalidFecha = (this.invalidFechaAnterior) && (this.fecha < this.hoy && !(this.fecha.toLocaleDateString() === this.hoy.toLocaleDateString()));
  }

  modificarFecha(addDay: number) {
    const result = new Date(this.fecha);
    result.setDate(result.getDate() + addDay);
    this.sabadoODomingo = result.getDay();
    this.fecha = result;
    this.invalidFecha = (this.fecha < this.hoy && !(this.fecha.toLocaleDateString() === this.hoy.toLocaleDateString()));

  }
}
