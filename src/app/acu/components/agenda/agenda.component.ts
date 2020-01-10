import { Component, OnInit } from '@angular/core';
import { AcuService } from '../../services/acu.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Horas {
  Hora: number;
  Moviles: [{
    MovCod: number;
    Valor: string;
    Disponible: boolean;
    AluId: number;
    EsAguCuInsId: string;
    TipCurId: number;
  }];
}
export interface AgendaElement {
  Movil: string;
  // Hora0: string;
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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  agendaDisplayedColumns: string[] = ['Movil'];
  columns: string[] = [];
  rows: string[] = [];
  dataSource = ELEMENT_DATA;
  agendaDataSource: AgendaElement[] = [];
  agenda: any[] = [];
  moviles: any[] = [];
  horas: Horas[] = [];
  horaMovilPlano: [] = [];
  constructor(private acuService: AcuService) { }

  ngOnInit() {
    this.acuService.getAgenda()
      .subscribe((res: any) => {
        console.log('Agenda: ', res);

        this.agenda = res.TablaAgenda;
        this.moviles = res.TablaAgenda.Moviles;
        this.horas = res.TablaAgenda.Horas;
        console.log('2)horas: ', this.horas);
        this.columns = this.horas.map(item => item.Hora.toString()); // this.moviles.map(item => item.MovCod.toString());
        this.rows = this.horas.map(item => item.Hora.toString());

        this.agendaDataSource = this.makeDataSource(this.columns, this.horas, this.moviles, res.TablaAgenda.HoraMovilPlano);

        this.agendaDisplayedColumns = this.agendaDisplayedColumns.concat(this.columns);
        console.log('agendaDisplayedColumns: ', this.agendaDisplayedColumns);

      });
  }

  makeDataSource(
    columns: string[],
    horas: Horas[],
    moviles: any[],
    horasMoviles: any[]) {

    const col: any[] = [];
    console.log('columns: ', columns);
    console.log('horas: ', horas);
    console.log('moviles: ', moviles);
    console.log('horasMoviles: ', moviles);


    // let i = 0;
    // let j = 0;
    // for (const h of horas) {

    //   const o = {};
    //   // tslint:disable-next-line: no-string-literal
    //   o['Movil'] = h.Hora;
    //   let valueI = 0
    //   for (const m of moviles) {
    //     let val = '';

    //     if (this.existeEnHorasMoviles(h, m, horasMoviles)) {
    //       i++;
    //       val = i.toString() + ' ' + m.Valor;
    //     } else {
    //       j--;
    //       val = j.toString() + ' ';
    //     }
    //     o['value' + valueI] = val;
    //     valueI++;
    //     //o[m.MovCod] = val;
    //   }
    //   console.log('object: ', o);
    //   col.push(o);

    // }

    let i = 0;
    let j = 0;
    for (const m of moviles) {

      const o = {};
      // tslint:disable-next-line: no-string-literal
      o['Movil'] = m.MovCod;

      for (const h of horas) {
        let val = this.existeEnHorasMoviles(h, m, horasMoviles);
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

  existeEnHorasMoviles(hora: any, movil: any, horaMovilPlano: any) {

    for (const h of horaMovilPlano) {
      if (h.Hora === hora.Hora && h.MovCod === movil.MovCod) {
        return h.AluId;
      }
    }

    return '';

  }

  showAlert() {
    alert('Hola');
  }
}
