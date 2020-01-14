import { Component, OnInit, Inject } from '@angular/core';
import { AcuService } from '../../services/acu.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendarClaseComponent } from './modals/agendar-clase/agendar-clase.component';


export interface AgendaElement {
  Movil: string;
  Hora0: string;
  Hora1: string;
  Hora2: string;
  Hora3: string;
  Hora4: string;
  Hora5: string;
  Hora6: string;
  Hora7: string;
  Hora8: string;
  Hora9: string;
  Hora10: string;
  Hora11: string;
  Hora12: string;
  Hora13: string;
  Hora14: string;
  Hora15: string;
  Hora16: string;
  Hora17: string;
  Hora18: string;
  Hora19: string;
  Hora20: string;
  Hora21: string;
  Hora22: string;
  Hora23: string;
  Hora24: string;
}
export interface DataAgenda {
  Hora: number;
  MovCod: number;
  Valor: string;
  Disponible: boolean;
  AluId: string;
  AluApe1: string;
  EsAgCuInsId: string;
  EsAgCuInsNom: string;
  EsAgCuInsNomCorto: string;
  TipCurId: number;
}


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  animal: string;
  name: string;

  agendaDisplayedColumns: string[] = ['Movil'];
  columns: string[] = [];
  agendaDataSource: AgendaElement[] = [];
  agenda: any[] = [];
  moviles: any[] = [];
  horas: any[] = [];
  fechaClase = '';

  horaMovilPlano: DataAgenda[] = null;
  // horaMovilPlano: [{
  //   Hora: string;
  //   MovCod: number;
  //   AluId: number;
  //   EsAgCuInsId: string;

  // }] = null;

  constructor(
    private acuService: AcuService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log('Fuciona?');
    this.acuService.getAgenda()
      .subscribe((res: any) => {
        console.log('Agenda: ', res);

        this.agenda = res.TablaAgenda;
        this.moviles = res.TablaAgenda.Moviles;
        this.horas = res.TablaAgenda.Horas;
        this.fechaClase = res.TablaAgenda.FechaClase;
        console.log('2)horas: ', this.horas);
        this.columns = this.horas.map(item => item.Hora.toString()); // this.moviles.map(item => item.MovCod.toString());
        this.horaMovilPlano = res.TablaAgenda.HoraMovilPlano;
        this.agendaDataSource = this.makeDataSource(this.horas, this.moviles);

        this.agendaDisplayedColumns = this.agendaDisplayedColumns.concat(this.columns);
        console.log('agendaDisplayedColumns: ', this.agendaDisplayedColumns);

      });
  }

  makeDataSource(
    horas: any[],
    moviles: any[]) {

    const col: any[] = [];
    console.log('horas: ', horas);
    console.log('moviles: ', moviles);


    let i = 0;
    let j = 0;
    for (const m of moviles) {

      const o = {};
      // tslint:disable-next-line: no-string-literal
      o['Movil'] = m.MovCod;

      for (const h of horas) {
        let val = this.existeEnHorasMoviles(h, m);
        // if (val === '') {
        //   j--;
        //   val = 'L'; // j.toString() + ' ';
        // } else {
        //   i++;
        //   val = 'O' + ' ' + val;
        // }
        o['Hora' + h.Hora] = val;
      }

      console.log('object: ', o);
      col.push(o);
    }

    console.log('col: ', col);

    return col;


  }

  existeEnHorasMoviles(hora: any, movil: any) {

    for (const h of this.horaMovilPlano) {
      if (h.Hora === hora.Hora && h.MovCod === movil.MovCod) {
        console.log(`Hora movil: ${h}`);
        return `${h.EsAgCuInsId} ${h.AluApe1.substring(0, 10)}`;
      }
    }

    return '';

  }


  showAlert(movil: number, hora: number): void {
    console.log(`Movil: ${movil}, Hora: ${hora}`);
    this.acuService.getClaseAgenda(this.fechaClase, hora, movil)
      .subscribe((res: any) => {
        console.log('Agenda: ', res);

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



  }


  public saveEmail(email: string): void {
    // ... save user email
  }

  public handleRefusalToSetEmail(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  testAlert() {
    alert('ok');
  }
}



export interface DialogData {
  FechaClase: string;
  Hora: number;
  EscMovCod: number;
  AluId: string;
  AluNro: string;
  AluNomApe: string;
  Cursos: string[];
  CantidadClasesPracticas: number;
  EsAgCuTipCla: string;
  EsAgCuClaAdiSN: string;
  EscInsId: string;
  EscInsNom: string;
  EsAgCuInsId: string;
  EsAgCuInsNom: string;
  EsAgCuDet: string;
  EsAgCuEst: string;
  EsAgCuObs: string;
  EsAgCuDetAviso: string;
  EscCurEmp: string;
  EsAgCuInNoCorto: string;
  EsAgCuNroCla: number;
  EsAgCuEstOld: string;
  EsAgCuAvisoOld: number;
  EsAgCuAviso: number;
  EsAgCuDetAvisoOld: string;
}

/*
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: './modals/agendar-clase/agendar-clase.component.html',
  // templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContentExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
*/
