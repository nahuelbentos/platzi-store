import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { AcuService } from '@acu/services/acu.service';
import { CopiarMoverParameters } from '@core/model/copiarMoverParameters.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-seleccionar-accion-agenda',
  templateUrl: './seleccionar-accion-agenda.component.html',
  styleUrls: ['./seleccionar-accion-agenda.component.scss']
})


export class SeleccionarAccionAgendaComponent {
  animal: any;
  pegar: boolean;
  constructor(
    // tslint:disable-next-line: variable-name
    private _bottomSheetRef: MatBottomSheetRef<SeleccionarAccionAgendaComponent>,
    private acuService: AcuService,
    public dialog: MatDialog, ) {
    this.pegar = JSON.parse(localStorage.getItem('pegar-clase'));
  }

  openLink(event: MouseEvent, key: string): void {
    console.log('Event: ', event);

    const fechaClase = localStorage.getItem('fechaClase');

    const fecha: Date = JSON.parse(localStorage.getItem('fecha'));
    const movil = parseInt(localStorage.getItem('movil'), 0);
    const hora = parseInt(localStorage.getItem('hora'), 0);
    const existe: boolean = JSON.parse(localStorage.getItem('existe'));
    const mainParameters = JSON.parse(localStorage.getItem('mainParameters'));

    let continuar = true;
    switch (key) {

      case 'abrir-clase':
        console.log('abrir-clase: ', key);

        this.acuService.getClaseAgenda(fechaClase, hora, movil)
          .subscribe((res: any) => {
            console.log('Agendaaaaaaaaaaaaa: ', res);

            const dialogRef = this.dialog.open(AgendarClaseComponent, {
              data: {
                agendaClase: res.AgendaClase,
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed: ', result);
              this.animal = result;
            });

          });
        break;

      case 'mover-clase':
      case 'copiar-clase':
        console.log(key);
        // parametros: FechaOld, MovilOld, HoraOld

        const copiarMoverParameters = {
          accion: (key === 'mover-clase') ? 'MOVER' : 'COPIAR',
          fechaOld: mainParameters.fecha,
          movilOld: mainParameters.movil,
          horaOld: mainParameters.hora,
        };

        localStorage.setItem('copiarMoverParameters', JSON.stringify(copiarMoverParameters));

        this.setPegarStorage();
        break;

      case 'liberar-clase':

        Swal.fire({
          title: 'Confirmación de usuario',
          text: 'ATENCIÓN: Se liberará la hora, perdiendose los datos actuales. ¿Confirma continuar?',
          icon: 'warning',
          showCancelButton: true,
          // confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            console.log('confirmar 1');
          }

          this._bottomSheetRef.dismiss();
          event.preventDefault();
        });



        break;

      case 'pegar-clase':

        const oldParameters = JSON.parse(localStorage.getItem('copiarMoverParameters'));
        console.log('oldParameters :::: ', oldParameters);
        console.log('mainParameters :::: ', mainParameters);

        console.log('fechaOld :::: ', oldParameters.fechaOld);
        console.log('fecha :::: ', mainParameters.fecha);

        console.log(Date.parse(oldParameters.fechaOld) > Date.parse(mainParameters.fecha));

        if (existe) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ese turno ya esta ocupado, elegi otro!'
          });
        } else {
          if (oldParameters.fechaOld > mainParameters.fecha) {
            continuar = false;
            Swal.fire({
              title: 'Confirmación de usuario',
              text: 'ATENCIÓN: La fecha seleccionada es anterior a la actual. ¿Confirma continuar?',
              icon: 'warning',
              showCancelButton: true,
              // confirmButtonColor: '#3085d6',
              // cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.value) {
                console.log('confirmar 1')
                this.copiarMoverClase(oldParameters, mainParameters);
              }

              this._bottomSheetRef.dismiss();
              event.preventDefault();
            });

          } else {
            this.copiarMoverClase(oldParameters, mainParameters);
          }



        }
        console.log('antes del break 1')
        break;

      case 'cancelar':
        this.setPegarStorage();
        break;

      case 'confirmar':
        this.acuService.validarCopiarMoverClase(fechaClase, hora, movil)
          .subscribe((res: any) => {

            console.log('Respuesta confirmmmm: ', res);

            if (res.confirm) {

              Swal.fire({
                title: 'Confirmación de usuario',
                text: res.texto,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                  Swal.fire({
                    title: 'Confirmado!',
                    text: 'Confirmaste!',
                    icon: 'success',
                  });
                }
              });
            } else {

            }

          });

        break;

      default:
        break;
    }
    if (continuar) {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }

  setPegarStorage() {

    this.pegar = !this.pegar;
    localStorage.setItem('pegar-clase', this.pegar.toString());
  }

  copiarMoverClase(oldParameters, mainParameters) {

    const params: CopiarMoverParameters = {
      accion: oldParameters.accion,
      fechaClaseOld: oldParameters.fechaOld,
      horaClaseOld: oldParameters.horaOld,
      movilOld: oldParameters.movilOld,
      fechaClase: mainParameters.fecha,
      horaClase: mainParameters.hora,
      movil: mainParameters.movil,
    };
    console.log('params :::: ', params);

    this.acuService.copiarMoverClase(params)
      .subscribe((res: any) => {

        console.log('Respuesta copar-mover: ', res);

        Swal.fire({
          icon: 'success',
          title: res.Gx_msg,
          showConfirmButton: false,
          timer: 4000
        });

        localStorage.removeItem('copiarMoverParameters');
        localStorage.setItem('refreshAgenda', 'true');
      });


    this.setPegarStorage();
  }
}
