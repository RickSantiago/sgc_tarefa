import { AlertsService } from './alerts.service';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {



  constructor(public authService: AuthService, public http: HttpClient, public envService: EnvService, public alert: AlertsService) {

  }


  retornaTarefasTitular(idPessoa): Observable<any> {
    return this.http.post(`${this.envService.API_URL_TAREFA}retornaTarefasTitular`,{idPessoa : idPessoa})
      .pipe(
        tap(response => response)
      )
  }

  retornaTarefasParticipante(idPessoa): Observable<any> {
    return this.http.post(`${this.envService.API_URL_TAREFA}retornaTarefaResponsavel`,{idPessoa : idPessoa})
      .pipe(
        tap(response => response)
      )
  }

  retornaTarefasPessoaParticipa(idPessoa): Observable<any> {
    return this.http.post(`${this.envService.API_URL_TAREFA}retornaTarefaParticipantePessoaLogada`,{idPessoa : idPessoa})
      .pipe(
        tap(response => response)
      )
  }

  retornaTarefasConcluidas(idPessoa): Observable<any> {
    return this.http.post(`${this.envService.API_URL_TAREFA}retornaTarefaParticipanteConcluida`,{idPessoa : idPessoa})
      .pipe(
        tap(response => response)
      )
  }

  removeParticipante(idParticipante, idTarefa): Observable<any> {
    return this.http.post(`${this.envService.API_URL_TAREFA}removeParticipante`, {
      idParticipante: idParticipante,
      idTarefa: idTarefa
    }).pipe(
      tap(result => {
        this.alert.snackRemoveParticipante("Participante removido com sucesso", "Ok!");

        return result
      })
    );
  }

  criarTarefa(
    idTitular: number,
    titulo: string,
    descricao: string,
    prazo: string,
    horaPrazo: string,
    isRotina: boolean,
    participantesSelecionados: any,
    atividadesDaTarefa: any): Observable<any> {
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}criarTarefa`, {
      idTitular: idTitular,
      titulo: titulo,
      descricao: descricao,
      prazo: prazo,
      horaPrazo: horaPrazo,
      isRotina: isRotina,
      participantes: participantesSelecionados,
      atividades: atividadesDaTarefa
    }).pipe(
      tap(result => {

        this.alert.snackCriarTarefa("Tarefa criada com sucesso!", "Ok!")
        return result
      })
    );
  }

  editaTarefa(
    idTarefa: any,
    titulo: string,
    descricao: string,
    prazo: string,
    horaPrazo: string,
    isRotina: boolean,
  ): Observable<any> {
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}editaTarefa`, {
      idTarefa: idTarefa,
      titulo: titulo,
      descricao: descricao,
      prazo: prazo,
      horaPrazo: horaPrazo,
      isRotina: isRotina,
    }).pipe(
      tap(result => {
        this.alert.snackCriarTarefa("Tarefa editada com sucesso!", "Ok!")
        return result
      })
    );
  }

  deletaTarefa(
      idTarefa:any
  ): Observable<any> {
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}excluiTarefa`, {
      idTarefa: idTarefa
    }).pipe(
      tap(result => {
        this.alert.snackCriarTarefa("Tarefa excluida com sucesso!", "Ok!")
        return result
      })
    );
  }

  addParticipante(idTarefa: number, participantesSelecionados: any): Observable<any> {
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}adicionaParticipante`, {
      idTarefa: idTarefa,
      participantes: participantesSelecionados,

    }).pipe(
      tap(result => {
        this.alert.snackAdicionarParticipante("Participante adicionado", "Ok!")
        return result
      })
    );
  }

  // retornaListaParticipantes(){
  //   this.http.get(`http://localhost:9003/pessoa/retornaParticipantes`).pipe(
  //     map(
  //       response => {
  //         response
  //       }
  //     )
  //   )
  // }
}
