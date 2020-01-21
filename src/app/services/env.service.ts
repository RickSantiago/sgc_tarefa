import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

//  API_URL = 'http://localhost:9003/';
//  API_URL_TAREFA = 'http://localhost:9003/tarefa/';

  API_URL = 'http://177.126.81.87:8089/sgc/';
  API_URL_TAREFA = 'http://177.126.81.87:8089/sgc/tarefa/';

  constructor() { }
}
