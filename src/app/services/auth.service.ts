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


  recebeDadosLogin(): Observable<any> {

    return this.http.get(`${this.envService.API_URL}autenticacao/retornaDadosSessao`).pipe(
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
