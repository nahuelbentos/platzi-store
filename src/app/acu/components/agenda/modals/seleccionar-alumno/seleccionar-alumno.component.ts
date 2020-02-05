import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SeleccionarAlumnoDataSource, AlumnoItem } from './seleccionar-alumno-datasource';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';

@Component({
  selector: 'app-seleccionar-alumno',
  templateUrl: './seleccionar-alumno.component.html',
  styleUrls: ['./seleccionar-alumno.component.scss']
})
export class SeleccionarAlumnoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<AlumnoItem>;
  dataSource: SeleccionarAlumnoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nro', 'nombre', 'apellido', 'ci', 'direccion'];

  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    private acuService: AcuService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.agendaClase = this.data.agendaClase;
    // tslint:disable-next-line: max-line-length
    // const day = Number(this.agendaClase.FechaClase.substring(this.agendaClase.FechaClase.length - 2, this.agendaClase.FechaClase.length));
    // const month = Number(this.agendaClase.FechaClase.substring(5, 7));
    // const year = Number(this.agendaClase.FechaClase.substring(0, 4));

    // this.fechaClase.setDate(day);
    // this.fechaClase.setMonth(month - 1);
    // this.fechaClase.setFullYear(year);


    // this.hora.setHours(this.agendaClase.Hora, 0);
    // this.instructorAsignado = `${this.agendaClase.EsAgCuInsId.toString().trim()} ${this.agendaClase.EsAgCuInsNom}`;
    // this.movil = this.agendaClase.EscMovCod;
    // this.buildForm();
  }

  ngOnInit() {
    this.dataSource = new SeleccionarAlumnoDataSource();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
