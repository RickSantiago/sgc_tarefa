import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public idPessoa: any;

  constructor(public http: HttpClient) { }


  recebeDadosLogin(): Observable<any> {

    return this.http.get("http://177.126.81.87:8089/sgc/autenticacao/retornaDadosSessao").pipe(
      tap(response => {
        const { userData } = response
        this.idPessoa = userData.map(item => { this.idPessoa = item })
      },
      error =>{
        console.log('Não foi possivel obter os dados da sessão', error);
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('idPessoa')
        sessionStorage.removeItem('token')
      })
    )
  }

}
