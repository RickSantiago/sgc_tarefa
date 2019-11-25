import { ListaTarefasComponent } from './public/tarefas/lista-tarefas/lista-tarefas.component';
import { DashboardTarefaComponent } from './public/tarefas/dashboard-tarefa/dashboard-tarefa.component';
import { DetalheTarefaComponent } from './public/tarefas/detalhe-tarefa/detalhe-tarefa.component';
import { CriarTarefaComponent } from './public/tarefas/criar-tarefa/criar-tarefa.component';
import { SidenavComponent } from './public/sidenav/sidenav.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: DashboardTarefaComponent,
    children:[
      {
        path: 'criar-tarefa', component: CriarTarefaComponent
      },
      {
        path: 'logout', component: DashboardTarefaComponent
      },
      {
        path: 'dashboard-tarefa', redirectTo: '/'
      },
      {
        path: 'lista-tarefas', component: ListaTarefasComponent
      },
      {
        path: 'detalhe:id', component: DetalheTarefaComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
