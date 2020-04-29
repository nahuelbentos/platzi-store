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
  alumnos: AlumnoData[];


  filtro: string;
  resultsLength: number;
  cantidad: number;

  // MatPaginator Output
  pageEvent: PageEvent;

  length: number;
  pageSize: number;
  pageindex: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(
    public dialogRef: MatDialogRef<AgendarClaseComponent>,
    public dialog: MatDialog,
    private acuService: AcuService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.alumnos = this.data.alumnos;
    console.log('alumnos: ', this.alumnos);
    console.log('cantidad: ', this.data.cantidad);


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.alumnos);

    this.cantidad = this.data.cantidad;
    this.length = this.data.cantidad;
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.resultsLength = this.cantidad;
  }


  ngAfterViewInit() {
    console.log('AfterViewInit:');

    console.log(' 1) datasources: ', this.dataSource);
    this.resultsLength = this.cantidad;
    console.log(' 2) this.resultsLength: ', this.resultsLength);
    this.paginator.length = this.cantidad;
    console.log(' 2) this.cantidad: ', this.cantidad);
  }

  ngAfterViewChecked() {
    this.paginator.length = this.cantidad;
  }

  applyFilter(filterValue: string) {

    this.filtro = filterValue;
    const filter = (this.filtro) ? this.filtro : '';
    console.log('1) datasources: ', this.dataSource);
    console.log('2) datasources.filterData: ', this.dataSource.filteredData);
    // if (this.dataSource.filteredData.length === 0) {
    console.log('applyFilter');
    console.log('   filter: ', filter);

    this.getAlumnos(10, 1, filter);

    this.dataSource.filter = filterValue.trim().toLowerCase();
    // } else {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // }
  }


  ejecutoEvent(pageEvento: PageEvent) {
    this.pageEvent = pageEvento;
    const filter = (this.filtro) ? this.filtro : '';

    if ((pageEvento.pageSize * (pageEvento.pageIndex + 1)) > this.alumnos.length) {
      console.log('ejecutoEvent');
      this.getAlumnos(pageEvento.pageSize, pageEvento.pageIndex, filter);

      // this.acuService.obtenerAlumnos(pageEvento.pageSize, pageEvento.pageIndex, filter)
      //   .subscribe((res: any) => {

      //     const aux: AlumnoData[] = res.Alumnos;
      //     this.alumnos = this.alumnos.concat(aux); // = [... this.alumnos, res.Alumnos];

      //     this.dataSource = new MatTableDataSource(this.alumnos);
      //     this.dataSource.paginator = this.paginator;
      //     this.resultsLength = this.cantidad;
      //     this.dataSource.sort = this.sort;
      //   });

    }
    // this.getAlumnos(this.pageEvent.pageSize, this.pageEvent.pageIndex, this.filtro);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAlumnos(pageSize, pageNumber, filtro) {
    console.log('filtro: ', filtro);
    this.acuService.obtenerAlumnos(pageSize, pageNumber, filtro)
      .subscribe((res: any) => {

        console.log(' res: ', res);

        const aux: AlumnoData[] = res.Alumnos;
        if (this.filtro === '') {
          this.alumnos = this.alumnos.concat(aux);
        } else {
          this.alumnos = aux;
        }
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = this.cantidad;
        this.dataSource.sort = this.sort;

      });
  }

}
