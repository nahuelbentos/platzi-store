import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

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
