import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcuService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

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
    // .subscribe((res: any) => {
    //   console.log('res: ', res);
    //   console.log('res.AgendaClase', res.AgendaClase);

    //   // return response.json();
    // });

  }


  getAgenda() {
    return this.http.post(`${environment.url_ws}/wsObtenerTablaAgenda`, {});
  }
}
