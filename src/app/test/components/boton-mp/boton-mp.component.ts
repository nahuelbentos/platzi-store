import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-boton-mp',
  templateUrl: './boton-mp.component.html',
  styleUrls: ['./boton-mp.component.scss']
})
export class BotonMpComponent implements AfterViewInit, OnInit {

  constructor(
    private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // $(document).ready(() => {

    const script = document.createElement('script');
    script.id = 'scriptMercadoPago';
    script.type = 'text/javascript';
    script.src = 'https://www.mercadopago.com.uy/integrations/v1/web-tokenize-checkout.js';
    script.setAttribute('data-public-key', 'TEST-e11f1f78-a4b1-4177-b436-1c003c562703');
    script.setAttribute('data-transaction-amount', '100.0');


    const form = document.createElement('form');
    form.id = 'formMercadoPago';
    form.action = 'https://www.mi-sitio.com/procesar-pago';
    form.method = 'POST';
    form.appendChild(script);

    // form.prepend
    this.elementRef.nativeElement.prepend(form);
    console.log('form: ', form);

    alert('we call alert from JQuery');
    // });

  }
}
