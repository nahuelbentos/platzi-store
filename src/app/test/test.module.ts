import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { BotonMpComponent } from './components/boton-mp/boton-mp.component';
import { TestComponent } from './components/containers/test/test.component';


@NgModule({
  declarations: [TestComponent, BotonMpComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TestModule { }
