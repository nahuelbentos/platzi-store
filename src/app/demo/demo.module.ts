import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from './../shared/shared.module';
import { DemoComponent } from './components/demo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DemoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule,
    FormsModule
  ]
})
export class DemoModule {

}
