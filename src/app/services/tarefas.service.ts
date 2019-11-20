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



  constructor( private _snackBar: MatSnackBar, public authService: AuthService, public http: HttpClient, public envService: EnvService) {

  }


  retornaTarefasTitular(idPessoa): Observable<any> {
    return this.http.get(`${this.envService.API_URL_TAREFA}retornaTarefasTitular?idPessoa=${idPessoa}`)
      .pipe(
        tap(response => response)
      )
  }

  retornaTarefasParticipante(idPessoa): Observable<any> {
    return this.http.get(`${this.envService.API_URL_TAREFA}retornaTarefaResponsavel?idPessoa=${idPessoa}`)
      .pipe(
        tap(response => response)
      )
  }

  snackRemoveParticipante(message: string, action: string) {
   this._snackBar.open(message, action, {
        duration: 3000
      });

      console.log('foi chamado');
    }

  removeParticipante(idParticipante, idTarefa): Observable<any>{
      return this.http.post(`${this.envService.API_URL_TAREFA}removeParticipante`, {
        idParticipante: idParticipante,
        idTarefa: idTarefa
      }).pipe(
        tap(result => {
         this.snackRemoveParticipante("Participante removido com sucesso", "Ok!");

          return result
        })
      );
  }

  criarTarefa(
    idTitular:number,
    titulo:string,
    descricao:string,
    isRotina:boolean,
    participantesSelecionados:any,
    atividadesDaTarefa:any): Observable<any> {
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}criarTarefa`, {
      idTitular: idTitular,
      titulo: titulo,
      descricao: descricao,
      isRotina: isRotina,
      participantes: participantesSelecionados,
      atividades: atividadesDaTarefa
    }).pipe(
      tap(result => {
        console.log("resulto:")
        console.log(result)
        return result
      })
    );
  }

  addParticipante(idTarefa: number, participantesSelecionados: any): Observable<any> {
   return  this.http.post<any>(`${this.envService.API_URL_TAREFA}adicionaParticipante`, {
    idTarefa: idTarefa,
    participantes: participantesSelecionados,

  }).pipe(
    tap(result => {
      console.log("resulto:")
      console.log(result)
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
