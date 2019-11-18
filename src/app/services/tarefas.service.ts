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



  constructor( private _snackBar: MatSnackBar, public authService: AuthService, public http: HttpClient) {

  }


  retornaTarefasTitular(idPessoa): Observable<any> {
    return this.http.get(`http://177.126.81.87:8089/sgc/tarefa/retornaTarefasTitular?idPessoa=${idPessoa}`)
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
      return this.http.post(`http://177.126.81.87:8089/sgc/tarefa/removeParticipante`, {
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
    return this.http.post<any>(`http://177.126.81.87:8089/sgc/tarefa/criarTarefa`, {
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
   return  this.http.post<any>(`http://177.126.81.87:8089/sgc/tarefa/adiconaParticipante`, {
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
