import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MercadopagoComponent } from '../../mercadopago.component';

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

  constructor(
    public dialogRef: MatDialogRef<MercadopagoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const socios = this.data.socios;
    console.log('socios: ', socios);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(socios);
  }

  ngOnInit() {
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
