import { Component, OnInit } from '@angular/core';
import { AcuService } from '../../services/acu.service';
import { MatDialog } from '@angular/material/dialog';


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

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  agendaDisplayedColumns: string[] = ['Movil'];
  columns: string[] = [];
  agendaDataSource: AgendaElement[] = [];
  agenda: any[] = [];
  moviles: any[] = [];
  horas: any[] = [];
  horaMovilPlano: [{
    Hora: string;
    MovCod: number;
    AluId: number;
  }] = null;

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
        if (val === '') {
          j--;
          val = 'L'; // j.toString() + ' ';
        } else {
          i++;
          val = 'O'; // i.toString() + ' ' + val;
        }
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
        return h.AluId;
      }
    }

    return '';

  }

  showAlert() {

    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContentExampleDialog { }
