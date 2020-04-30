import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SeleccionarSocioComponent } from './modals/seleccionar-socio/seleccionar-socio.component';
import { MyErrorStateMatcher } from '../agenda/modals/agendar-clase/agendar-clase.component';

import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { Time } from '@angular/common';


// export interface CuotaSocialData {
//   id: number;
//   nombreSocio: string;
//   precio: string;
//   fecha: string;
// }

@Component({
  selector: 'app-mercadopago',
  templateUrl: './mercadopago.component.html',
  styleUrls: ['./mercadopago.component.scss']
})
export class MercadopagoComponent implements AfterViewInit, OnInit {

  // @ViewChild(MatTable, { static: false }) table: MatTable<CuotaSocial>;

  // dataSource: MercadopagoDataSource;
  displayedColumns: string[] = ['select', 'id', 'nombreSocio', 'precio', 'fecha'];
  dataSource: MatTableDataSource<FacturaData>;

  selection = new SelectionModel<FacturaData>(true, []);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  socioId: number;
  socioNombre: string;
  tipo: string;
  parametro: number;
  cantidad: number;
  // para el dialog
  socio: any;



  constructor(
    private formBuilder: FormBuilder,
    private acuService: AcuService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
    this.buildForm();
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = this.cantidad;
    this.dataSource.sort = this.sort;

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FacturaData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.FacCod + 1}`;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      tipo: [
        '',
        [], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
      parametro: [
        '',
        [], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
      socioId: [
        '',
        [Validators.required], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
      socioNombre: [
        '',
        [], // sync validators
        [
          // existeAlumnoValidator(this.acuService),
          // alumnoYaAsignadoValidator(this.acuService),
          // alumnoTieneExcepcionValidator(this.acuService)
        ] // async validators
      ],
    });
  }

  seleccionarSocio(tipo, parametro) {
    console.log('1)tipo: ', tipo);
    console.log('2)parametro: ', parametro);
    // let socios = JSON.parse(localStorage.getItem('Socios'));


    this.acuService.getSocios(100, 1, tipo, parametro)
      .subscribe((res: any) => {
        console.log('3) res.socios22: ', res);
        const response = new Response(res);

        //  socios = res.Socios;
        this.openDialogSocios(res.Socios, res.Cantidad, tipo);
        // localStorage.setItem('Socios', JSON.stringify(socios));
      });

  }

  verMensaje() {
    Swal.fire({
      title: 'Pago realizado!',
      text: 'Se realizo el pago de la factura, correctamente!',
      icon: 'success',
      timer: 5000,
      showConfirmButton: false,
      onClose: () => {
        console.log('Cieerro antes de timer');
      }
    }).then((res2) => {
      if (res2.dismiss === Swal.DismissReason.timer) {
        console.log('Cierro  con el timer');
      }
    });

  }

  private openDialogSocios(socios, cantidad, tipo) {
    const sociosDialogRef = this.dialog.open(SeleccionarSocioComponent, {
      height: 'auto',
      width: '700px',
      data: {
        tipo,
        cantidad,
        socios,
      }
    });

    sociosDialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);

      if (result) {
        this.socio = result;
        this.form.patchValue({
          socioId: result.SocId,
          socioNombre: result.Nombre
        });

        this.acuService.getFacturasPendientes(200, 1, result.SocId)
          .subscribe((res: any) => {
            console.log('3) facturas: ', res.Facturas);
            this.actualizarDatasource(res.Facturas, res.Facturas.length);
            // this.dataSource = new MatTableDataSource(res.Facturas);
          });

      }


    });

  }

  get socioNombreField() {
    return this.form.get('socioNombre');
  }

  actualizarDatasource(data, cantidad) {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = cantidad;
    this.dataSource.sort = this.sort;
  }

  pagar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const agendaClase = this.form.value;


    }
  }
}


export interface FacturaData {
  FacCod: number;
  FacNro: number;
  SOCID: number;
  FacNom: string;
  FacApe: string;
  FacDir: string;
  FacDto: number;
  FacDes: string;
  FacFech: Date;
  FacRuc: number;
  FacConFin: string;
  MonTipo: number;
  FacAnu: string;
  FacUsrAnu: string;
  FacUsrIns: string;
  FacNroSector: number;
  FacPrdId: number;
  FacFmaPgo: string;
  FacNroMat: string;
  FacSecId: string;
  FacUsrPrn: string;
  FacFchPgo: Date;
  FacTotRed: number;
  FacHora: Time;
  FacRed: number;
  FacCiCaNro: number;
  FacUltLin: number;
  FacPromEspId: number;
  FacCntCuoEsp: number;
  FACCLICOD: number;
  FacSerie: string;
  FacNroDocCli: number;
  FacTpoDocCli: number;
  FacTiDoId: number;
  FacFHCorr: Date;
  FacCAEEstatus: string;
  FacPrcEstatus: string;
  FacOrigen: string;
  FacRucCh: string;
  FacCodPaiDocCli: string;
  FacTitTel: string;
  TpTiId: string;
  FacTitId: number;
}