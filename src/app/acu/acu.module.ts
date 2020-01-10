import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AcuRoutingModule } from './acu-routing.module';
import { MaterialModule } from '@material/material.module';


import { AgendaComponent } from './components/agenda/agenda.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AgendaComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    AcuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AcuModule { }
