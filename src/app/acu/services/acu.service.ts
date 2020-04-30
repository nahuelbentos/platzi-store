import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { CopiarMoverParameters } from '@core/model/copiarMoverParameters.model';
import { AgendaCurso } from '@acu/components/agenda/modals/agenda-curso/agenda-curso.component';

export interface LiberarParameters {
  fechaClase: Date;
  horaClase: number;
  movil: number;
}

export interface DuplicarDiaParameters {
  fechaClase: Date;
  fechaNueva: Date;
  EsAgCuAviso: number;
}
@Injectable({
  providedIn: 'root'
})
export class AcuService {

  xmlhttp = new XMLHttpRequest();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httOptionsXml = {
    headers: new HttpHeaders({
      'Content-Type': 'application/soap+xml'
    })
  };

  constructor(
    private http: HttpClient) {
  }

  getTablaAgenda() {
    return this.http.post(`${environment.url_ws}/wsObtenerTablaAgenda`, {}, this.httpOptions)
      .subscribe((res: any) => {
        console.log('res: ', res);
        console.log('res.TablaAgenda', res.TablaAgenda);

        // return response.json();
      });
  }


  getClaseAgenda(fechaClase: string, horaClase: number, movCod: number) {
    return this.http.post(`${environment.url_ws}/wsObtenerAgendaClase`, {
      FechaClase: fechaClase,
      HoraClase: horaClase,
      MovCod: movCod
    }, this.httpOptions);

  }

  getInstructorAgenda(fechaClase: string, horaClase: number, EscInsId: string) {
    return this.http.post(`${environment.url_ws}/wsObtenerInstructorAgenda`, {
      Fecha: fechaClase,
      Hora: horaClase,
      EscInsId
    }, this.httpOptions);

  }

  getAgenda() {
    return this.http.post(`${environment.url_ws}/wsObtenerTablaAgenda`, {});
  }

  getAgendaPorFecha(fecha: any, tipo: string) {
    return this.http.post(`${environment.url_ws}/wsObtenerAgendaPorFecha`, {
      fecha,
      tipo
    });
  }

  validarCopiarMoverClase(fechaClase: string, horaClase: number, movCod: number) {
    return this.http.post(`${environment.url_ws}/WSValidarCopiarMoverClase`, {
      FchClase: fechaClase,
      MovCod: movCod,
      Hora: horaClase
    }, this.httpOptions);

  }

  duplicarDiaAgenda(params: DuplicarDiaParameters) {
    return this.http.post(`${environment.url_ws}/wsDuplicarDiaAgenda`, {
      FchClase: params.fechaClase,
      FechaNueva: params.fechaNueva,
      EsAgCuAviso: params.EsAgCuAviso
    }, this.httpOptions);

  }

  moverDiaAgenda(params: DuplicarDiaParameters) {
    return this.http.post(`${environment.url_ws}/wsMoverDiaAgenda`, {
      FchClase: params.fechaClase,
      FechaNueva: params.fechaNueva,
      EsAgCuAviso: params.EsAgCuAviso
    }, this.httpOptions);

  }

  liberarDiaAgenda(FchClase: Date) {
    return this.http.post(`${environment.url_ws}/wsLiberarDiaAgenda`, {
      FchClase
    }, this.httpOptions);

  }

  copiarMoverClase(params: CopiarMoverParameters) {
    return this.http.post(`${environment.url_ws}/WSCopiarMoverClase`, {
      Accion: params.accion,
      FchClaseOld: params.fechaClaseOld,
      HorClaseOld: params.horaClaseOld,
      MovilOld: params.movilOld,
      FchClase: params.fechaClase,
      HorClase: params.horaClase,
      Movil: params.movil
    }, this.httpOptions);

  }

  liberarClase(params: LiberarParameters) {
    return this.http.post(`${environment.url_ws}/wsLiberarClase`, {
      FchClase: params.fechaClase,
      HorClase: params.horaClase,
      Movil: params.movil
    }, this.httpOptions);

  }

  alumnoYaAsignado(aluNro: number) {


    const fechaClaseStr = localStorage.getItem('fechaClase').substring(0, 10);
    const horaClaseStr = localStorage.getItem('horaClase');
    const movilCodStr = localStorage.getItem('movilCod');

    const fechaClase = Date.parse(fechaClaseStr);
    const horaClase = parseInt(horaClaseStr, 10);
    const movilCod = parseInt(movilCodStr, 10);

    console.log('parametros: ');
    console.log(' AluNro: ', aluNro);
    console.log(' fechaClase: ', fechaClase);
    console.log(' horaClase: ', horaClase);
    console.log(' movCod: ', movilCod);

    console.log('fechaClaseStr: ', fechaClaseStr);


    return this.http.post(`${environment.url_ws}/wsAlumnoYaAsignado`, {

      AluNro: aluNro,
      FchClase: fechaClaseStr,
      HorClase: horaClase,
      EscMovCod: movilCod
    });
  }

  alumnoTieneExcepcion(aluNro: number) {

    const fechaClaseStr = localStorage.getItem('fechaClase').substring(0, 10);
    const horaClaseStr = localStorage.getItem('horaClase');
    const movilCodStr = localStorage.getItem('movilCod');

    const fechaClase = Date.parse(fechaClaseStr);
    const horaClase = parseInt(horaClaseStr, 10);

    console.log('aluNro: ', aluNro);
    console.log('fechaClaseStr: ', fechaClaseStr);
    console.log('horaClase: ', horaClase);
    console.log('fechaClase: ', fechaClase);
    return this.http.post(`${environment.url_ws}/wsAlumnoTieneExcepcion`, {
      AluNro: aluNro,
      FchClase: fechaClaseStr,
      HorClase: horaClase
    });
  }


  existeAlumno(aluNro: number) {
    return this.http.post(`${environment.url_ws}/wsExisteAlumno`, {
      AluNro: aluNro
    });
  }

  licenciaInstructor(insId: string) {

    const fechaClaseStr = localStorage.getItem('fechaClase');
    console.log('fechastr: ', fechaClaseStr);
    const fechaClase = Date.parse(fechaClaseStr);
    console.log('fechaClase: ', fechaClase);
    return this.http.post(`${environment.url_ws}/wsLicenciaInstructor`, {
      NroInstructor: insId,
      FchClase: fechaClaseStr
    });
  }

  instructorYaAsignado(insId: string) {

    const fechaClaseStr = localStorage.getItem('fechaClase').substring(0, 10);
    const horaClaseStr = localStorage.getItem('horaClase');
    const movilCodStr = localStorage.getItem('movilCod');

    const fechaClase = Date.parse(fechaClaseStr);
    const horaClase = parseInt(horaClaseStr, 10);
    const movilCod = parseInt(movilCodStr, 10);
    console.log('insId: ', insId);
    console.log('fechaClaseStr: ', fechaClaseStr);
    console.log('horaClase: ', horaClase);
    console.log('movilCod: ', movilCod);
    console.log('fechaClase: ', fechaClase);
    return this.http.post(`${environment.url_ws}/wsInstructorYaAsignado`, {
      NroInstructor: insId,
      FchClase: fechaClaseStr,
      HorClase: horaClase,
      EscMovCod: movilCod
    });
  }

  getAlumnos() {
    return this.http.post(`${environment.url_ws}/wsObtenerAlumnos`, {});
  }

  obtenerAlumnos(pageSize: number, pageNumber: number, filtro: string) {
    return this.http.get(`${environment.url_ws}/wsGetAlumnos?PageSize=${pageSize}&PageNumber=${pageNumber}&Filtro=${filtro}`);
  }

  getCursos() {
    return this.http.post(`${environment.url_ws}/wsObtenerCursos`, {});
  }

  getCurso(TipCurId) {
    return this.http.post(`${environment.url_ws}/wsObtenerCurso`, { TipCurId });

  }

  guardarAgendaInstructor(agendaCurso: AgendaCurso) {
    return this.http.post(`${environment.url_ws}/wsGuardarAgendaInstructor`, {
      agendaCurso
    });
  }

  getSocios(cantidad: number, page: number, tipo: string, filtro: number) {

    return this.http.get(`${environment.url_ws}/wsGetSDTSocios?PageSize=${cantidad}&PageNumber=${page}&Tipo=${tipo}&Filtro=${filtro}`);
  }

  getFacturasPendientes(cantidad: number, page: number, socId: number) {
    return this.http.get(`${environment.url_ws}/wsGetFacturasPendientes?PageSize=${cantidad}&PageNumber=${page}&SocId=${socId}`);
  }

  getInstructores() {
    return this.http.post(`${environment.url_ws}/wsObtenerInstructores`, {});
  }
}



function xml2json(xml) {
  try {
    let obj = {};
    if (xml.children.length > 0) {
      for (let i = 0; i < xml.children.length; i++) {
        const item = xml.children.item(i);
        const nodeName = item.nodeName;

        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
    console.log(e.message);
  }
}
