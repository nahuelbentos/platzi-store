import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AgendarClaseComponent } from '../agendar-clase/agendar-clase.component';
import { AcuService } from '@acu/services/acu.service';

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
    const movil = parseInt(localStorage.getItem('movil'), 0);
    const hora = parseInt(localStorage.getItem('hora'), 0);
    const existe: boolean = JSON.parse(localStorage.getItem('existe'));


    console.log('fechaClase: ', fechaClase);
    console.log('movil: ', movil);
    console.log('hora: ', hora);
    console.log('localStorage.getItem(existe): ', localStorage.getItem('existe'));
    console.log('existe: ', existe);

    switch (key) {

      case 'abrir-clase':
        console.log('abrir-clase: ', key);

        // const fechaClase = localStorage.getItem('fechaClase');
        // const movil = parseInt(localStorage.getItem('movil'), 0);
        // const hora = parseInt(localStorage.getItem('hora'), 0);

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
        console.log('mover-clase: ', key);
        this.setPegarStorage();
        break;

      case 'copiar-clase':
        console.log('pegar : ', this.pegar);
        this.setPegarStorage();
        console.log('copiar-clase: ', key);
        break;

      case 'liberar-clase':
        console.log('pegar : ', this.pegar);
        this.setPegarStorage();
        console.log('liberar-clase: ', key);
        break;

      case 'pegar-clase':
        console.log('Pegar :::: existe: ', existe);
        if (existe) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ese turno ya esta ocupado, elegi otro!'
          });
        } else {

          Swal.fire({
            icon: 'success',
            title: 'Clase copiada con exito!',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(' pegar : ', this.pegar);
          this.setPegarStorage();
          console.log('pegar-clase: ', key);
        }
        break;

      case 'cancelar':
        break;

      default:
        break;
    }
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  setPegarStorage() {

    this.pegar = !this.pegar;
    localStorage.setItem('pegar-clase', this.pegar.toString());
  }
}
