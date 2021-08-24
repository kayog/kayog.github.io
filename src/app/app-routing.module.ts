import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadoClosedComponent } from './views/components/chamado/chamado-closed/chamado-closed.component';
import { ChamadoCreateComponent } from './views/components/chamado/chamado-create/chamado-create.component';
import { ChamadoDeleteComponent } from './views/components/chamado/chamado-delete/chamado-delete.component';
import { ChamadoListComponent } from './views/components/chamado/chamado-list/chamado-list.component';
import { ChamadoUpdateComponent } from './views/components/chamado/chamado-update/chamado-update.component';
import { ChamadoViewComponent } from './views/components/chamado/chamado-view/chamado-view.component';
import { ClienteCreateComponent } from './views/components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './views/components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './views/components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './views/components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './views/components/home/home.component';
import { TecnicoCreateComponent } from './views/components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './views/components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './views/components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './views/components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tecnicos',
    component: TecnicoListComponent
  },
  {
    path: 'tecnicos/create',
    component: TecnicoCreateComponent
  }
  ,
  {
    path: 'tecnicos/update/:id',
    component: TecnicoUpdateComponent
  }
  ,
  {
    path: 'tecnicos/delete/:id',
    component: TecnicoDeleteComponent
  },
  {
    path: 'clientes',
    component: ClienteListComponent
  },
  {
    path: 'clientes/create',
    component: ClienteCreateComponent
  }
  ,
  {
    path: 'clientes/update/:id',
    component: ClienteUpdateComponent
  }
  ,
  {
    path: 'clientes/delete/:id',
    component: ClienteDeleteComponent
  },
  { path: 'chamados',component: ChamadoListComponent},
  { path: 'chamados/closed',component: ChamadoClosedComponent},
  { path: 'chamados/create',component: ChamadoCreateComponent},
  {path: 'chamados/update/:id',component: ChamadoUpdateComponent},
  {path: 'chamados/delete/:id',component: ChamadoDeleteComponent},
  {path: 'chamados/view/:id',component: ChamadoViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
