import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AcuRoutingModule } from './acu-routing.module';
import { MaterialModule } from '@material/material.module';


import { AgendaComponent } from './components/agenda/agenda.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '@shared/shared.module';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';


@NgModule({
  declarations: [
    AgendaComponent,
    NavComponent,
    DialogContentComponent
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
