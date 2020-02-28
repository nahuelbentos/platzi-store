import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { AcuService } from '../../services/acu.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendarClaseComponent } from './modals/agendar-clase/agendar-clase.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SeleccionarAccionAgendaComponent } from './modals/seleccionar-accion-agenda/seleccionar-accion-agenda.component';


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
  HoraCoche: string;
  AluNro: number;
  InsEst: string;
  TipCurEst: string;
  EscCurEst: string;
  EsAgCuEst: string;
  EsAgCuAviso: number;
  MovilEstado: string;
  Situacion: string;
  HorasNoDisponibles: string;
  claseCelda: string;
}

export interface Cell {
  value: string;
  class: string;
  existe: boolean;
}


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, AfterViewInit {

  animal: string;
  name: string;
  sabadoODomingo: number;
  verAgenda: boolean;

  agendaDisplayedColumns: string[];
  columns: string[] = [];
  agendaDataSource: AgendaElement[];
  agenda: any[] = [];
  moviles: any[] = [];
  horas: any[] = [];
  fechaClase = '';
  fecha: Date;

  horaMovilPlano: DataAgenda[] = null;

  constructor(
    private acuService: AcuService,
    public dialog: MatDialog,
    // tslint:disable-next-line: variable-name
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    console.log('Fuciona?');
    this.fecha = new Date();
    this.getAgenda(this.fecha);
  }

  makeDataSource(
    horas: any[],
    moviles: any[]) {

    const col: any[] = [];

    for (const m of moviles) {

      const o = {};
      // tslint:disable-next-line: no-string-literal
      o['Movil'] = m.MovCod;

      for (const h of horas) {
        const cell = this.existeEnHorasMoviles(h, m);

        o['class' + h.Hora] = cell.class;
        // tslint:disable-next-line: no-string-literal
        o['existe' + h.Hora] = cell.existe;
        o['Hora' + h.Hora] = cell.value;
      }

      col.push(o);
    }
    return col;
  }

  existeEnHorasMoviles(hora: any, movil: any): Cell {
    const cell: Cell = {
      value: '',
      class: '',
      existe: false
    };
    for (const h of this.horaMovilPlano) {
      if (h.Hora === hora.Hora && h.MovCod === movil.MovCod) {
        cell.value = `${h.EsAgCuInsId} ${h.AluApe1.substring(0, 10)}`;
        cell.class = h.claseCelda;
        cell.existe = true;
      }
    }
    return cell;

  }


  showAlert(movil: number, hora: number, existe: boolean): void {
    const text = `Movil: ${movil} ; Hora: ${hora} ; Existe:  ${existe}`;
    console.log(text);
    localStorage.setItem('fechaClase', this.fechaClase);
    localStorage.setItem('fecha', JSON.stringify(this.fecha));
    localStorage.setItem('movil', movil.toString());
    localStorage.setItem('hora', hora.toString());
    localStorage.setItem('existe', existe.toString());

    const mainParameters = {
      fecha: this.fechaClase,
      movil,
      hora,
    };

    localStorage.setItem('mainParameters', JSON.stringify(mainParameters));
    const t = this._bottomSheet.open(SeleccionarAccionAgendaComponent);
    t.afterDismissed().subscribe(() => {
      console.log('fin open sheet');

      const refreshAgenda = localStorage.getItem('refreshAgenda');

      if (refreshAgenda) {
        localStorage.removeItem('refreshAgenda');
        this.getAgenda(this.fecha);
      }
    });

  }


  ngAfterViewInit() {
    this.getAgenda(this.fecha);

  }

  diaAnterior() {
    const result = new Date(this.fecha);
    result.setDate(result.getDate() - 1);
    this.sabadoODomingo = result.getDay();
    this.fecha = result;
    this.getAgenda(this.fecha);

  }

  diaSiguiente() {
    this.agendaDataSource = [];
    const result = new Date(this.fecha);
    result.setDate(result.getDate() + 1);
    this.sabadoODomingo = result.getDay();
    this.fecha = result;
    this.getAgenda(this.fecha);

  }

  blurFecha(fecha: Date) {
    console.log('blur fecha::', fecha);
    this.getAgenda(fecha);
  }
  getAgenda(fecha: Date) {
    this.verAgenda = false;
    const strFecha = this.formatDateToString(fecha);
    this.acuService.getAgendaPorFecha(strFecha)
      .subscribe((res: any) => {
        console.log('Agenda: ', res);

        this.agenda = res.TablaAgenda;
        this.moviles = res.TablaAgenda.Moviles;
        this.horas = res.TablaAgenda.Horas;
        this.fechaClase = res.TablaAgenda.FechaClase;
        this.columns = this.horas.map(item => item.Hora.toString());
        this.horaMovilPlano = res.TablaAgenda.HoraMovilPlano;
        this.agendaDataSource = this.makeDataSource(this.horas, this.moviles);

        this.agendaDisplayedColumns = ['Movil'];
        this.agendaDisplayedColumns = this.agendaDisplayedColumns.concat(this.columns);
        this.verAgenda = true;

      });
  }

  formatDateToString(fecha: Date): string {
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();

    let strDay;
    let strMonth;
    const strYear = year.toString();

    if (day < 10) {
      strDay = '0' + day.toString();
    } else {
      strDay = day.toString();
    }

    if (month < 10) {
      strMonth = '0' + month.toString();
    } else {
      strMonth = month.toString();
    }
    return `${strYear}-${strMonth}-${strDay}`;

  }
}
