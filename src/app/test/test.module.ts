import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TestModule { }
