import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  constructor(public http: HttpClient) { }

  criaAtividade(
    idTarefa: number,
    idResponsavel:number,
    descricao: string ):Observable<any>{
      return this.http.post<any>("http://177.126.81.87:8089/sgc/tarefa/criaAtividade", {
        idTarefa: idTarefa,
        responsavel: idResponsavel,
        descricao: descricao
      },
      {
        reportProgress: true,
        observe: 'events'
      }
      ).pipe(
        tap(result => {
          return result
        })
      )
  }



  finalizaAtividade(idAtividade):Observable<any>{
    return this.http.post<any>("http://177.126.81.87:8089/sgc/tarefa/finalizaAtividade", {
      idAtividade: idAtividade,
    },
    {
      reportProgress: true,
      observe: 'events'
    }
    ).pipe(
      tap(result => {
        return result
      })
    )
  }

  desfinalizaAtividade(idAtividade):Observable<any>{
    return this.http.post<any>("http://177.126.81.87:8089/sgc/tarefa/desfazerFinalizacaoAtividade", {
      idAtividade: idAtividade,
    },
    {
      reportProgress: true,
      observe: 'events'
    }
    ).pipe(
      tap(result => {
        return result
      })
    )
  }
}


