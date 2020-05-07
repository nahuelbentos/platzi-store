import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit,
  AfterViewChecked,
  OnChanges,
  DoCheck,
  AfterContentChecked,
  SimpleChanges
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';

export interface AlumnoData {
  AluId: string;
  AluNro: string;
  AluNom: string;
  AluApe1: string;
  AluNomComp: string;
  AluCI: string;
  AluConNom: string;
  AluConPar: string;
  AluConTel: string;
  AluDV: number;
  AluDepId: number;
  AluDir: string;
  AluEst: string;
  AluEstMotBaj: string;
  AluFchNac: string;
  AluLocId: number;
  AluMail: string;
  AluPar: string;
  AluTel1: string;
  AluTel2: string;
  SocId: string;
}


@Component({
  selector: 'app-seleccionar-alumno',
  styleUrls: ['seleccionar-alumno.component.scss'],
  templateUrl: 'seleccionar-alumno.component.html',
})
// , AfterViewChecked
// tslint:disable-next-line: max-line-length
export class SeleccionarAlumnoComponent implements OnInit, AfterViewInit, AfterViewChecked { // , DoCheck, AfterContentChecked, AfterViewChecked   AfterViewInit,

  displayedColumns: string[] = ['actions', 'AluNro', 'AluNomComp', 'AluCI'];
  dataSource: MatTableDataSource<AlumnoData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // MatPaginator Output
  pageEvent: PageEvent;

  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  cantidad = 60000;
  length: number;

  filtro: string;



  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    private acuService: AcuService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.alumnos = this.data.alumnos;
    console.log('this.data: ', this.data);
    console.log('cantidad: ', this.data.cantidad);


    this.filtro = this.data.filtro;
    this.cantidad = this.data.cantidad;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data.alumnos);

    this.length = this.data.cantidad;
  }
  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.paginator.length = this.length;
      this.paginator.length = this.length;
      console.log(' 2) this.length: ', this.length);
    });
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.paginator.length = this.cantidad;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = this.cantidad;
    this.dataSource.sort = this.sort;


    // Get the input box
    const input = document.getElementById('search');

    // Init a timeout variable to be used below
    let timeout = null;

    // Listen for keystroke events
    input.addEventListener('keyup', (e) => {
      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);

      // Make a new timeout set to go off in 1000ms (1 second)
      timeout = setTimeout(() => {

        console.log('Input Value:', this.filtro);
        this.getAlumnos(1000, 1, this.filtro);
      }, 500);
    });
  }



  applyFilter(filterValue: string) {


    // const filter = (filterValue) ? filterValue : '';

    // this.getAlumnos(1000, 1, filter);

  }

  getAlumnos(pageSize, pageNumber, filtro) {
    console.log('filtro: ', filtro);

    this.acuService.obtenerAlumnos(pageSize, pageNumber, filtro)
      .subscribe((res: any) => {

        this.actualizarDatasource(res.Alumnos);


      });
  }

  ejecutoEvent(pageEvento: PageEvent) {
    this.pageEvent = pageEvento;
    const filter = (this.filtro) ? this.filtro : '';

    console.log('ejecutoEvent');
    this.getAlumnos(pageEvento.pageSize, pageEvento.pageIndex, filter);

  }

  actualizarDatasource(data) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator.length = cantidad;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
