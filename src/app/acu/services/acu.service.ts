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

  httOptionsXml = {
    headers: new HttpHeaders({
      'Content-Type': 'application/soap+xml'
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

  getAgendaPorFecha(fecha: any) {
    return this.http.post(`${environment.url_ws}/wsObtenerAgendaPorFecha`, {
      fecha
    });
  }

  getValidation1() {
    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acu="ACU_Web">
    <soapenv:Header/>
    <soapenv:Body>
       <acu:wsValidacionesAgendaClase.VALIDATION1>
          <acu:Id>1</acu:Id>
       </acu:wsValidacionesAgendaClase.VALIDATION1>
    </soapenv:Body>
 </soapenv:Envelope>
    `;
    return this.http.post(`${environment.url_soap}/wsvalidacionesagendaclase.aspx`, body, this.httOptionsXml);
  }

  soap() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', `${environment.url_soap}/wsvalidacionesagendaclase.aspx`, true);

    // build SOAP request

    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acu="ACU_Web">
    <soapenv:Header/>
    <soapenv:Body>
       <acu:wsValidacionesAgendaClase.VALIDATION1>
          <acu:Id>1</acu:Id>
       </acu:wsValidacionesAgendaClase.VALIDATION1>
    </soapenv:Body>
 </soapenv:Envelope>
    `;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const json = xml2json(xmlhttp.responseXML);
          console.log('response: ', xmlhttp.response);
          console.log('responseXML: ', xmlhttp.responseXML);
          console.log('responseText: ', xmlhttp.responseText);
          console.log('responseURL: ', xmlhttp.responseURL);
          console.log('json: ', json);
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    // xmlhttp.setRequestHeader('Authorization', 'Basic myusername/password here');
    xmlhttp.send(body);

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
