import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    DoCheck,
    OnDestroy
} from '@angular/core';

import { Product } from '../../../core/model/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {

    @Input() product: Product;

    @Output() productClicked: EventEmitter<any> = new EventEmitter();

    today: Date = new Date();
    constructor(private cartService: CartService) {
        console.log('constructor');
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //     //Add '${implements OnChanges}' to the class.
    //     console.log('ngOnChanges');
    //     console.log(changes);

    // }

    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        console.log('ngOnInit');


    }

    ngDoCheck(): void {
        // Called every time that the input properties of a component or a directive are checked.
        // Use it to extend change detection by performing a custom check.
        // Add 'implements DoCheck' to the class.
        console.log('ngDoCheck');

    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        console.log('ngOnDestroy');

    }
    addCart() {
        console.log('Añadir al carrito');
        this.productClicked.emit(this.product.id);
        this.cartService.addCart(this.product);

    }
}
