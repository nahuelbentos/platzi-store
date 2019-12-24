import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent implements OnInit {


  title = 'platzi-store';
  items = ['Nahuel', 'Rita', 'Juan'];
  power = 10;
  objeto = {
    id: '1',
    image: 'assets/images/camiseta.png',
    title: 'Camiseta',
    price: 80000,
    description: 'bla bla bla bla bla'
  };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  addItem() {
    this.items.push('nuevo item');
  }
  deleteI() {
    console.log('Si se ejecuta');
  }

  deleteItem(index: number) {
    console.log('Si se ejecuta');
    this.items.splice(index, 1);
  }
}
