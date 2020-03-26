import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AcuRoutingModule } from './acu-routing.module';
import { MaterialModule } from '@material/material.module';


import { AgendaComponent } from './components/agenda/agenda.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgendarClaseComponent } from './components/agenda/modals/agendar-clase/agendar-clase.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SeleccionarAlumnoComponent } from './components/agenda/modals/seleccionar-alumno/seleccionar-alumno.component';
import { SeleccionarInstructorComponent } from './components/agenda/modals/seleccionar-instructor/seleccionar-instructor.component';
import { SeleccionarFechaComponent } from './components/agenda/modals/seleccionar-fecha/seleccionar-fecha.component';
import { SeleccionarAccionAgendaComponent } from './components/agenda/modals/seleccionar-accion-agenda/seleccionar-accion-agenda.component';
import { AgendaInstructorComponent } from './components/agenda/agenda-instructor/agenda-instructor.component';
import { MercadopagoComponent } from './components/mercadopago/mercadopago.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SeleccionarSocioComponent } from './components/mercadopago/modals/seleccionar-socio/seleccionar-socio.component';




@NgModule({
  declarations: [
    AgendaComponent,
    NavComponent,
    AgendarClaseComponent,
    SeleccionarAlumnoComponent,
    SeleccionarInstructorComponent,
    SeleccionarFechaComponent,
    SeleccionarAccionAgendaComponent,
    AgendaInstructorComponent,
    MercadopagoComponent,
    SeleccionarSocioComponent
  ],
  imports: [
    CommonModule,
    AcuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-UY' }
  ],
})
export class AcuModule { }
