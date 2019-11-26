import { AlertsService } from './alerts.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  constructor(public http: HttpClient, public envService: EnvService, public alert: AlertsService) { }

  criaAtividade(
    idTarefa: number,
    idResponsavel:number,
    descricao: string ):Observable<any>{
      return this.http.post<any>(`${this.envService.API_URL_TAREFA}criaAtividade`, {
        idTarefa: idTarefa,
        responsavel: idResponsavel,
        descricao: descricao
      }).pipe(
        tap(result => {
          this.alert.snackCriaAtividade("Atividade criada", "Ok!");
          return result
        })
      )

  }

  updateAtividade(
    idAtividade: number,
    idResponsavel:number,
    descricao: string):Observable<any>{
      return this.http.post<any>(`${this.envService.API_URL_TAREFA}editaAtividade`, {
        idAtividade: idAtividade,
        idResponsavel: idResponsavel,
        descricao: descricao,

      }).pipe(
        tap(result => {
          this.alert.snackAtualizaAtividade("Atividade atualizada", "Ok!");
          return result
        })
      )
  }

  deletaAtividade(idAtividade: number):Observable<any>{
      return this.http.post<any>(`${this.envService.API_URL_TAREFA}excluiAtividade`, {
        idAtividade: idAtividade,

      }).pipe(
        tap(result => {
          this.alert.snackAtualizaAtividade("Atividade excluida", "Ok!");
          return result
        })
      )
  }

  finalizaAtividade(idAtividade, idTarefa, idPessoaSessao):Observable<any>{
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}finalizaAtividade`, {
      idAtividade: idAtividade,
      idTarefa: idTarefa,
      idPessoa: idPessoaSessao
    }).pipe(
      tap(result => {
        this.alert.snackResolveAtividade("Atividade resolvida!", "Ok!")
        return result
      })
    )
  }

  desfinalizaAtividade(idAtividade, idTarefa, idPessoaSessao):Observable<any>{
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}desfazerFinalizacaoAtividade`, {
      idAtividade: idAtividade,
      idTarefa: idTarefa,
      idPessoa: idPessoaSessao
    }).pipe(
      tap(result => {
        this.alert.snackDesfazResolveAtividade("Atividade não resolvida", "Ok!")
        return result
      })
    )
  }
}


