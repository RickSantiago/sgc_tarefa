import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidenavComponent } from './public/sidenav/sidenav.component';
import { CriarTarefaComponent } from './public/tarefas/criar-tarefa/criar-tarefa.component';
import { DetalheTarefaComponent } from './public/tarefas/detalhe-tarefa/detalhe-tarefa.component';
import { ListaTarefasComponent } from './public/tarefas/lista-tarefas/lista-tarefas.component';
import { DashboardTarefaComponent } from './public/tarefas/dashboard-tarefa/dashboard-tarefa.component';
import { CriaAtividadeComponent } from './public/tarefas/cria-atividade/cria-atividade.component';
import '../styles.scss';
import { AddParticipanteComponent } from './public/tarefas/add-participante/add-participante.component';
import { ResponsavelAtividadeComponent } from './public/tarefas/responsavel-atividade/responsavel-atividade.component';
import { TarefaParticipanteComponent } from './public/tarefas/tarefa-participante/tarefa-participante.component';
import { TarefaPartipanteConcluidaComponent } from './public/tarefas/tarefa-partipante-concluida/tarefa-partipante-concluida.component'

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CriarTarefaComponent,
    DetalheTarefaComponent,
    ListaTarefasComponent,
    DashboardTarefaComponent,
    CriaAtividadeComponent,
    AddParticipanteComponent,
    ResponsavelAtividadeComponent,
    TarefaParticipanteComponent,
    TarefaPartipanteConcluidaComponent,
  ],
  entryComponents: [
    CriaAtividadeComponent,
    CriarTarefaComponent,
     AddParticipanteComponent,
    ResponsavelAtividadeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot(options),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: [
    ListaTarefasComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
