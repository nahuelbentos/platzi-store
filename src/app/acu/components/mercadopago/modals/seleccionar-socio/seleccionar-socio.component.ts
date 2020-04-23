import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
export class SeleccionarSocioComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<MercadopagoComponent>,
    public dialog: MatDialog,
    private acuService: AcuService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('this.data: ', this.data);
    const socios = this.data.socios;
    this.cantidad = this.data.cantidad;
    console.log('socios: ', socios);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(socios);

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = this.cantidad;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateEvent($event: PageEvent) {

    console.log('entro en updateEvent ');
    this.pageEvent = $event;

    this.acuService.getSocios(1000, this.pageEvent.pageIndex)
      .subscribe((res: any) => {
        console.log('res.socios: ', res);

        // const socios = res.Socios;
        // localStorage.setItem('Socios', JSON.stringify(socios));
      });
    console.log('pageIndex: ', this.pageEvent.pageIndex);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
