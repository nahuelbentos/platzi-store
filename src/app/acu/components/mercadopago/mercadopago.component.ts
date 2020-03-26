import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MercadopagoDataSource, MercadopagoItem } from './mercadopago-datasource';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/model/product.model';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-mercadopago',
  templateUrl: './mercadopago.component.html',
  styleUrls: ['./mercadopago.component.scss']
})
export class MercadopagoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<MercadopagoItem>;
  dataSource: MercadopagoDataSource;

  products: Product[] = [];
  // environment: environment;

  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];


  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });

  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        console.log(`OK!!!!! ----  Respuesta: ${res}`);
        if (res) {
          const index = this.products.findIndex(product => product.id === id);
          this.products.splice(index, 1);
          this.products = [...this.products];
        }
        this.fetchProducts();
      });

  }
}
