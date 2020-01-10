import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AcuRoutingModule } from './acu-routing.module';
import { MaterialModule } from '@material/material.module';


import { AgendaComponent, DialogContentExampleDialog } from './components/agenda/agenda.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AgendaComponent,
    NavComponent,
    DialogContentExampleDialog
  ],
  imports: [
    CommonModule,
    AcuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class AcuModule { }
