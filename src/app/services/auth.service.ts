import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public idPessoa: any;

  constructor(public http: HttpClient, public envService: EnvService) { }


  recebeDadosLogin(routeId: number): Observable<any> {
    console.log('USER ROUTE ID ', routeId);

    return this.http.post<any>(`${this.envService.API_URL}autenticacao/retornaDadosSessao`, {
      idPessoa: routeId
    }).pipe(

      tap(response => {
        const { userData } = response
        this.idPessoa = userData.map(item => { this.idPessoa = item })
      },
      error =>{
        console.log('Não foi possivel obter os dados da sessão', error);
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('person')
        sessionStorage.removeItem('token')
      })
    )
  }

}
