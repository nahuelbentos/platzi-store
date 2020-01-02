import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@environments/environment';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  it('should be created - PA BUENA', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllProducts', () => {

    it('should return products - pa buena', () => {

      // arrange
      const expectData = [
        {
          id: '1',
          title: 'Titulo de prueba',
          price: 1000,
          description: 'Descripcion de prueba',
          image: 'img/img.jpg'
        },
        {
          id: '2',
          title: 'Titulo de prueba 2 ',
          price: 222,
          description: 'Descripcion de prueba 2',
          image: 'img/img.jpg'
        },
      ];

      let dataError, dataResponse;

      // act
      service.getAllProducts()
        .subscribe(response => {
          dataResponse = response;
        },
          error => {
            dataError = error;
          });

      const req = httpTestingController.expectOne(`${environment.url_api}/products/`);
      req.flush(expectData);

      // assert

      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });


  });

});


