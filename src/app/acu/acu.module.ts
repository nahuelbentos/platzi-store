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
import { AgendaCursoComponent } from './components/agenda/modals/agenda-curso/agenda-curso.component';
import { SeleccionarCursoComponent } from './components/agenda/modals/seleccionar-curso/seleccionar-curso.component';
import { InscripcionCursoComponent } from './components/agenda/modals/inscripcion-curso/inscripcion-curso.component';
import { PaginatorComponent } from './components/agenda/aux/paginator/paginator.component';
import { TableComponent } from './components/agenda/aux/table/table.component';
import { AltaAlumnoComponent } from './components/agenda/modals/alta-alumno/alta-alumno.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';




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
    SeleccionarSocioComponent,
    AgendaCursoComponent,
    SeleccionarCursoComponent,
    InscripcionCursoComponent,
    PaginatorComponent,
    TableComponent,
    AltaAlumnoComponent
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
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-UY' }
  ],
})
export class AcuModule { }
