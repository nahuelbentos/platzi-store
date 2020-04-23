import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AcuService } from '@acu/services/acu.service';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SeleccionarSocioComponent } from './modals/seleccionar-socio/seleccionar-socio.component';
import { MyErrorStateMatcher } from '../agenda/modals/agendar-clase/agendar-clase.component';


import { MercadopagoDataSource, CuotaSocial } from './mercadopago-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-mercadopago',
  templateUrl: './mercadopago.component.html',
  styleUrls: ['./mercadopago.component.scss']
})
export class MercadopagoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<CuotaSocial>;

  dataSource: MercadopagoDataSource;

  displayedColumns: string[] = ['select', 'id', 'nombreSocio', 'precio', 'fecha'];
  selection = new SelectionModel<CuotaSocial>(true, []);

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  socioId: number;
  socioNombre: string;
  tipo: string;
  parametro: number;

  // para el dialog
  socio: any;



  constructor(
    private formBuilder: FormBuilder,
    private acuService: AcuService,
    public dialog: MatDialog,
  ) {
    this.buildForm();
  }

  ngOnInit() {

    this.dataSource = new MercadopagoDataSource();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
  checkboxLabel(row?: CuotaSocial): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

  seleccionarSocio(tipo) {
    console.log('1)tipo: ', tipo);
    // let socios = JSON.parse(localStorage.getItem('Socios'));
    caches.open('testCache').then(
      (cache: Cache) => {
        let socios;

        cache.match(`http://192.1.0.86/ACU_WS.NetEnvironment/rest/wsGetSocios?CntPorPag=0&skip=0`).then(resp => {
          console.log('2) res cache 11: ', resp);
          if (resp) {

            resp.json().then(body => {
              console.log('3) body: ', body);
              socios = body;
              console.log('4) socios: ', socios);

              console.log('5) res socios: ', socios);


              if (!socios) {
                console.log('6) res cache:1 ', cache);
                // if (!socios) {
                this.acuService.getSocios(0, 0)
                  .subscribe((res: any) => {
                    console.log('7) res.socios22: ', res);
                    const response = new Response(res);
                    cache.put(`http://192.1.0.86/ACU_WS.NetEnvironment/rest/wsGetSocios?CntPorPag=0&skip=0`, response);

                    console.log('8) res cache:2 ', cache);
                    cache.add(`http://192.1.0.86/ACU_WS.NetEnvironment/rest/wsGetSocios?CntPorPag=0&skip=0`);

                    console.log('9) res cache:3 ', cache);

                    //  socios = res.Socios;
                    this.openDialogSocios(res.Socios, res.Cantidad, tipo);
                    // localStorage.setItem('Socios', JSON.stringify(socios));
                  });
              } else {

                this.openDialogSocios(socios.Socios, socios.Cantidad, tipo);
              }


            });
          } else {
            this.acuService.getSocios(0, 0)
              .subscribe((res: any) => {
                console.log('7) res.socios22: ', res);
                const response = new Response(res);
                cache.put(`http://192.1.0.86/ACU_WS.NetEnvironment/rest/wsGetSocios?CntPorPag=0&skip=0`, response);

                console.log('8) res cache:2 ', cache);
                cache.add(`http://192.1.0.86/ACU_WS.NetEnvironment/rest/wsGetSocios?CntPorPag=0&skip=0`);

                console.log('9) res cache:3 ', cache);

                //  socios = res.Socios;
                this.openDialogSocios(res.Socios, res.Cantidad, tipo);
                // localStorage.setItem('Socios', JSON.stringify(socios));
              });
          }



        });

      }
    );


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
      this.socio = result;
      this.form.patchValue({
        socioId: result.SocId,
        socioNombre: result.Nombre
      });


    });

  }

  get socioNombreField() {
    return this.form.get('socioNombre');
  }

  pagar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const agendaClase = this.form.value;


    }
  }
}
