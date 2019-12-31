import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/model/product.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productsService.getProduct(params.id);
        })
      );


  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
      .subscribe(product => {
        console.log(product);
        this.product = product;
      });
  }

  createProduct(product: Product) {
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3500,
      description: 'Nuevo producto pa buena '
    };

    this.productsService.createProduct(newProduct)
      .subscribe(res => {
        console.log('OK!!');
        console.log(res);
      });
  }

  updateProduct(id: string, changes: Partial<Product>) {
    const updateroduct: Partial<Product> = {
      price: 546464631356,
      description: 'edito producto pa buena '
    };

    this.productsService.updateProduct('2', updateroduct)
      .subscribe(res => {
        console.log('OK!!');
        console.log(res);
      });
  }

  deleteProduct(id: string) {

    this.productsService.deleteProduct('222')
      .subscribe(res => {
        console.log('OK!!');
        console.log(res);
      });
  }

  getRandomUsers() {
    this.productsService.getRandomUsers()
      .subscribe(
        users => { // ok
          console.log(users);
        },
        error => {
          console.error(error);
        }
      );
  }

}
