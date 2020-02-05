import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { NavComponent } from './components/nav/nav.component';
import { AgendarClaseComponent } from './components/agenda/modals/agendar-clase/agendar-clase.component';
import { SeleccionarAlumnoComponent } from './components/agenda/modals/seleccionar-alumno/seleccionar-alumno.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'agenda',
        component: AgendaComponent
      },
      {
        path: 'agendaclase',
        component: AgendarClaseComponent
      },
      {
        path: 'seleccionarAlumno',
        component: SeleccionarAlumnoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcuRoutingModule { }
