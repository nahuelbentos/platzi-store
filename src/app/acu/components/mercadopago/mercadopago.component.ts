import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, Inject, ElementRef, DoCheck, AfterViewChecked } from '@angular/core';
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
import { Time, DOCUMENT } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { environment as T, environment } from '@environments/environment';



import * as $ from 'jquery';

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
export class MercadopagoComponent implements AfterViewInit, OnInit, DoCheck, AfterViewChecked {

  // @ViewChild(MatTable, { static: false }) table: MatTable<CuotaSocial>;

  // dataSource: MercadopagoDataSource;
  // displayedColumns: string[] = ['select', 'id', 'nombreSocio', 'precio', 'fecha'];
  displayedColumns: string[] = ['select', 'correlativo', 'mesAnio', 'cuota',
    'serie', 'numeroDoc', 'fecha'];
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

  checked: boolean;
  validCheck: boolean;
  publicKey = environment.mercadopago.publicKey;
  amount = 0;

  addEvent = false;

  constructor(
    private formBuilder: FormBuilder,
    private acuService: AcuService,
    public dialog: MatDialog,
    private elementRef: ElementRef
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


    const script = document.createElement('script');
    script.id = 'scriptMercadoPago';
    script.type = 'text/javascript';
    script.src = 'https://www.mercadopago.com.uy/integrations/v1/web-tokenize-checkout.js';
    script.setAttribute('data-public-key', `${this.publicKey}`);
    script.setAttribute('data-transaction-amount', '100');


    const form = document.createElement('form');
    form.id = 'formMercadoPago';
    form.action = 'https://www.mi-sitio.com/procesar-pago';
    form.method = 'POST';
    form.appendChild(script);

    // form.prepend
    this.elementRef.nativeElement.prepend(form);


  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.


  }

  modificarAmount() {

    const script = document.querySelector('#scriptMercadoPago');
    script.setAttribute('data-transaction-amount', `${this.amount}`);
  }

  ngDoCheck(): void {
    // Called every time that the input properties of a component or a directive are checked. 
    // Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
    if (!this.addEvent) {

      // const form_aux = document.querySelector('#formMercadoPago');
      const button = document.querySelector('#formMercadoPago > button');

      if (button) {
        this.addEvent = true;

        button.addEventListener('click', () => {
          console.log('amount::: ', this.amount.toString());

          const script = document.querySelector('#scriptMercadoPago');
          console.log('2 script: ', script);
          script.removeAttribute('data-transaction-amount');
          script.setAttribute('data-transaction-amount', `${this.amount}`);
          console.log('2 script: ', script);
          // script.setAttribute('data-transaction-amount', `${this.amount}`);

          console.log('click en form mercado pago.');
        });
      }

    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.limpiarSelect() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);

        this.amount += Number.parseFloat(row.CCMovImp);
        this.modificarAmount();
        row.Seleccionado = true;
      });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FacturaData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Correlativo + 1}`;

  }

  clickCheck(event: Event, element: any) {
    event.stopPropagation();

  }

  changeCheck(event: MatCheckboxChange, element: any) {
    if (event) {
      const resp = this.validarSelect(element);
      if (resp.isValid) {

        this.selection.toggle(element);

      } else {
        event.source.checked = !event.source.checked;
      }
    }

  }


  selectionToggle(element: any) {
    const resp = this.validarSelect(element);
    if (resp.isValid) {
      this.selection.toggle(element);
    }
  }

  limpiarSelect() {

    this.selection.clear();
    this.dataSource.data.forEach(row => {
      row.Seleccionado = false;
    });
  }

  validarSelect(element: any): any {
    const resp = {
      isValid: true,
      value: false
    };

    for (const row of this.dataSource.data) {
      if (((element.Correlativo - 1) === row.Correlativo) && !row.Seleccionado) {
        resp.isValid = false;
        break;
      }

      if (element.Correlativo === row.Correlativo) {

        const aux = this.dataSource.data.find((e) => e.Correlativo === element.Correlativo + 1);
        if (!aux || !aux.Seleccionado) {
          row.Seleccionado = !row.Seleccionado;

          const value = Number.parseFloat(row.CCMovImp);
          this.amount = (row.Seleccionado) ? this.amount + value : this.amount - value;
          this.modificarAmount();
          break;
        }

        resp.isValid = false;
        break;
      }

    }
    if (!resp.isValid) {
      this.errorMensaje();
    }
    return resp;


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
    // let socios = JSON.parse(localStorage.getItem('Socios'));


    this.acuService.getSocios(100, 1, tipo, parametro)
      .subscribe((res: any) => {
        const response = new Response(res);

        //  socios = res.Socios;
        this.openDialogSocios(res.Socios, res.Cantidad, tipo, parametro);
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
      }
    }).then((res2) => {
      if (res2.dismiss === Swal.DismissReason.timer) {
      }
    });

  }

  errorMensaje() {
    Swal.fire({
      title: 'Error!',
      text: 'La selección/deselección de facturas debe ser secuencial.',
      icon: 'error',
      timer: 5000,
      showConfirmButton: false,
      onClose: () => {
      }
    }).then((res2) => {
      if (res2.dismiss === Swal.DismissReason.timer) {
      }
    });

  }

  private openDialogSocios(socios, cantidad, tipo, filtro) {
    const sociosDialogRef = this.dialog.open(SeleccionarSocioComponent, {
      height: 'auto',
      width: '700px',
      data: {
        filtro,
        tipo,
        cantidad,
        socios,
      }
    });

    sociosDialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.socio = result;
        this.form.patchValue({
          socioId: result.SocId,
          socioNombre: result.Nombre
        });

        this.acuService.getFacturasPendientes(result.SocId)
          .subscribe((res: any) => {
            this.actualizarDatasource(res.FacturasPendientes, res.FacturasPendientes.length);
            // this.dataSource = new MatTableDataSource(res.Facturas);
          });

      }

    });

  }

  get socioNombreField() {
    return this.form.get('socioNombre');
  }

  actualizarDatasource(data, cantidad) {
    this.validCheck = true;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = cantidad;
    this.dataSource.sort = this.sort;
    this.validCheck = false;
  }

  pagar(event: Event) {
    event.preventDefault();
  }
}
export interface FacturaData {
  Anio: number;
  CCMovImp: string;
  Correlativo: number;
  EsCuoEsp: string;
  EsCuotaActual: string;
  FDDocCod: string;
  FDDocFechCh: Date;
  FDDocNroCh: string;
  FDDocSerie: string;
  Mes: number;
  MesNom: string;
  OrigenLinea: string;
  PromEspId: number;
  Seleccionado: boolean;
  Situacion: string;
  pendiente: string;
}
