import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
// import { xml2json } from 'xml-js';
import { NgxXml2jsonService } from 'ngx-xml2json';

import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';

@Injectable({
  providedIn: 'root'
})
export class AcuService {

  client: Client;
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
    private http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService,
    private soapservice: NgxSoapService) {
    this.soapservice.createClient(
      'http://192.1.0.71/ACU_Web.NetEnvironment/wsvalidacionesagendaclase.aspx?wsdl')
      .then(client => this.client = client);
    // .subscribe();
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


  alumnoYaAsignado(AluNro: number, fechaClase: any, horaClase: any, movCod: number) {

    console.log('parametros: ');
    console.log(' AluNro: ', AluNro);
    console.log(' fechaClase: ', fechaClase);
    console.log(' horaClase: ', horaClase);
    console.log(' movCod: ', movCod);

    this.xmlhttp.open('POST', `${environment.url_soap}/wsvalidacionesagendaclase.aspx`, true);

    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acu="ACU_Web">
   <soapenv:Header/>
   <soapenv:Body>
      <acu:wsValidacionesAgendaClase.ALUMNOYAASIGNADO>
         <acu:Alunro>${AluNro}</acu:Alunro>
         <acu:Fchclase>${fechaClase}</acu:Fchclase>
         <acu:Horclase>${horaClase}</acu:Horclase>
         <acu:Escmovcod>${movCod}</acu:Escmovcod>
      </acu:wsValidacionesAgendaClase.ALUMNOYAASIGNADO>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    this.xmlhttp.onreadystatechange = () => {
      if (this.xmlhttp.readyState === 4) {
        if (this.xmlhttp.status === 200) {


          const xml: any = this.xmlhttp.responseXML;


          console.log('responseText: ', this.xmlhttp.responseText);

          let json = xml2json(this.xmlhttp.responseXML);
          console.log('json: ', json);

          const xmlDoc = this.formatXMLResponse(this.xmlhttp.responseText);
          json = xml2json(xmlDoc);

          console.log('json: ', json);
          console.log(
            'json.Cabezal.cabezal1.VALIDATION1Response.Mensaje: ',
            json.response.value.ALUMNOYAASIGNADOResponse.Yaasignado);

          return json.response.value.ALUMNOYAASIGNADOResponse.Yaasignado;

        }
      }
    };

    // Send the POST request
    this.xmlhttp.setRequestHeader('Content-Type', 'text/json');
    this.xmlhttp.send(body);
  }

  alumnoTieneExcepcion(aluId: number, fechaClase: any, horaClase: any) {

    this.xmlhttp.open('POST', `${environment.url_soap}/wsvalidacionesagendaclase.aspx`, true);

    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acu="ACU_Web">
   <soapenv:Header/>
   <soapenv:Body>
      <acu:wsValidacionesAgendaClase.ALUMNOTIENEEXCEPCION>
         <acu:Aluid>${aluId}</acu:Aluid>
         <acu:Fchclase>${fechaClase}</acu:Fchclase>
         <acu:Horclase>${horaClase}</acu:Horclase>
      </acu:wsValidacionesAgendaClase.ALUMNOTIENEEXCEPCION>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    this.xmlhttp.onreadystatechange = () => {
      if (this.xmlhttp.readyState === 4) {
        if (this.xmlhttp.status === 200) {


          const xml: any = this.xmlhttp.responseXML;


          console.log('responseText: ', this.xmlhttp.responseText);

          let json = xml2json(this.xmlhttp.responseXML);
          console.log('json: ', json);

          const xmlDoc = this.formatXMLResponse(this.xmlhttp.responseText);
          json = xml2json(xmlDoc);

          console.log('json: ', json);
          console.log(
            'json.Cabezal.cabezal1.VALIDATION1Response.Mensaje: ',
            json.response.value.ALUMNOTIENEEXCEPCIONResponse.Tieneexcepcion);

        }
      }
    };

    // Send the POST request
    this.xmlhttp.setRequestHeader('Content-Type', 'text/json');
    this.xmlhttp.send(body);
  }

  soap() {

    this.xmlhttp.open('POST', `${environment.url_soap}/wsvalidacionesagendaclase.aspx`, true);

    // build SOAP request

    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acu="ACU_Web">
    <soapenv:Header/>
    <soapenv:Body>
       <acu:wsValidacionesAgendaClase.VALIDATION2>
          <acu:Id>1</acu:Id>
       </acu:wsValidacionesAgendaClase.VALIDATION2>
    </soapenv:Body>
 </soapenv:Envelope>
    `;

    this.xmlhttp.onreadystatechange = () => {
      if (this.xmlhttp.readyState === 4) {
        if (this.xmlhttp.status === 200) {
          // const convert =  xml2json.;

          const xml: any = this.xmlhttp.responseXML;


          console.log('responseText: ', this.xmlhttp.responseText);

          let json = xml2json(this.xmlhttp.responseXML);
          console.log('json: ', json);

          const xmlDoc = this.formatXMLResponse(this.xmlhttp.responseText);
          json = xml2json(xmlDoc);

          // resSubstring = this.xmlhttp.responseText.replace('xmlns:Soap', '');
          console.log('json: ', json);
          console.log('json.Cabezal.cabezal1.VALIDATION1Response.Mensaje: ', json.response.value.VALIDATION1Response.Mensaje);


        }
      }
    };
    // Send the POST request
    this.xmlhttp.setRequestHeader('Content-Type', 'text/json');
    // this.xmlhttp.setRequestHeader('Authorization', 'Basic myusername/password here');
    this.xmlhttp.send(body);

  }

  formatXMLResponse(xml: string) {

    let resSubstring: string = xml;
    resSubstring = resSubstring.replace('<?xml version = "1.0" encoding = "utf-8"?>', '');
    resSubstring = resSubstring.replace('SOAP-ENV:Envelope ', 'response');
    resSubstring = resSubstring.replace('SOAP-ENV:Envelope', 'response');
    resSubstring = resSubstring.replace('SOAP-ENV:Body', 'value');
    resSubstring = resSubstring.replace('SOAP-ENV:Body', 'value');
    resSubstring = resSubstring.replace('xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"', '');

    resSubstring = resSubstring.replace(' xmlns="ACU_Web"', '');
    resSubstring = resSubstring.replace(' xmlns="ACU_Web"', '');
    resSubstring = resSubstring.replace('wsValidacionesAgendaClase.', '');
    resSubstring = resSubstring.replace('wsValidacionesAgendaClase.', '');

    console.log('resSubstring: ', resSubstring);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(resSubstring, 'text/xml');

    console.log('xmlDoc: ', xmlDoc);
    return xmlDoc;
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
