import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface AlumnoData {
  AluId: string;
  AluNro: string;
  AluNom: string;
  AluApe1: string;
  AluNomComp: string;
  AluCI: number;
}
/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-seleccionar-alumno',
  styleUrls: ['seleccionar-alumno.component.scss'],
  templateUrl: 'seleccionar-alumno.component.html',
})
export class SeleccionarAlumnoComponent implements OnInit {

  // displayedColumns: string[] = ['AluId', 'AluNro', 'AluNom', 'AluApe1', 'AluNomComp', 'AluCI'];
  displayedColumns: string[] = ['actions', 'AluNro', 'AluNomComp', 'AluCI'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('this.data: ', this.data);
    console.log('this.data.alumnos: ', this.data.alumnos);
    const alumnos = this.data.alumnos;
    // console.log('Alumnos: ', alumnos);
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(alumnos);
  }

  ngOnInit() {
    console.log('this.data: ', this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
