import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './components/error.component';

@NgModule({
  declarations: [
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule {

}
