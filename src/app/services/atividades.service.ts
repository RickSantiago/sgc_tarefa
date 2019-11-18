import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  constructor(public http: HttpClient, public envService: EnvService) { }

  criaAtividade(
    idTarefa: number,
    idResponsavel:number,
    descricao: string ):Observable<any>{
      return this.http.post<any>(`${this.envService.API_URL_TAREFA}criaAtividade`, {
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
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}finalizaAtividade`, {
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
    return this.http.post<any>(`${this.envService.API_URL_TAREFA}desfazerFinalizacaoAtividade`, {
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


