import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';


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


  getAgenda() {
    return this.http.post(`${environment.url_ws}/wsObtenerTablaAgenda`, {});
  }

  getAgendaPorFecha(fecha: any) {
    return this.http.post(`${environment.url_ws}/wsObtenerAgendaPorFecha`, {
      fecha
    });
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
