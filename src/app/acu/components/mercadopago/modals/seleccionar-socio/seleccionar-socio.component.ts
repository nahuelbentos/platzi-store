import { Component, OnInit, ViewChild, Inject, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MercadopagoComponent } from '../../mercadopago.component';
import { AcuService } from '@acu/services/acu.service';

export interface SocioData {
  SocId: string;
  Nombre: string;
  SocMes: string;
  SocNroCI: string;
  SocNroMat: string;
}


@Component({
  selector: 'app-seleccionar-socio',
  templateUrl: './seleccionar-socio.component.html',
  styleUrls: ['./seleccionar-socio.component.scss']
})
export class SeleccionarSocioComponent implements AfterViewInit, OnInit, AfterViewChecked {

  displayedColumns: string[] = ['actions', 'SocId', 'Nombre', 'SocMes', 'SocNroCI', 'SocNroMat'];
  dataSource: MatTableDataSource<SocioData>;

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
    public dialogRef: MatDialogRef<MercadopagoComponent>,
    public dialog: MatDialog,
    private acuService: AcuService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('this.data: ', this.data);
    const socios = this.data.socios;

    this.filtro = this.data.filtro;
    this.cantidad = this.data.cantidad;
    console.log('socios: ', socios);
    this.actualizarDatasource(this.data.socios);
    this.length = this.cantidad;
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(socios);



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

      this.paginator.length = this.length;
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
        this.getSocios(1000, 1, this.filtro);
      }, 500);
    });

  }

  // applyFilter(filterValue: string) {

  //   // const filter = (filterValue) ? filterValue : '';
  //   // this.getSocios(1000, 1, filter);

  // }

  getSocios(pageSize, pageNumber, filtro) {
    console.log('pageSize: ', pageSize);
    console.log('pageNumber: ', pageNumber);
    console.log('filtro: ', filtro);

    this.acuService.getSocios(pageSize, pageNumber, 'FREE', filtro)
      .subscribe((res: any) => {
        console.log('3) res.socios22: ', res);

        this.actualizarDatasource(res.Socios);
      });
  }

  updateEvent($event: PageEvent) {

    console.log('entro en updateEvent ');
    this.pageEvent = $event;

    this.acuService.getSocios(100, this.pageEvent.pageIndex, ' ', 0) // (1000, this.pageEvent.pageIndex)
      .subscribe((res: any) => {
        console.log('res.socios: ', res);

        this.actualizarDatasource(res.Socios);
      });
    console.log('pageIndex: ', this.pageEvent.pageIndex);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  actualizarDatasource(data) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator.length = cantidad;
    this.dataSource.sort = this.sort;
  }
}
