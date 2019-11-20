import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.scss']
})
export class ListaTarefasComponent implements OnInit {

  public tarefas: any = [];
  public userSession: any;
  public idPessoaSession: string;
  public isErrorUsuario: boolean;

  private mediaMatch: MediaQueryList = matchMedia("(max-width:950px)");
  isErrorTarefa: boolean;

  constructor(

    public http: HttpClient,
    public authService: AuthService,
    public tarefasService: TarefasService,
    public atividadesServices: AtividadesService,
   ) { }

  ngOnInit() {

    this.retornaUsuario();
    this.retornaTarefasAtividadeDoParticipante();

    setInterval(() => {
      console.log('Atualizou')
      this.retornaTarefasAtividadeDoParticipante();
    }, 5000);

  }

  telaMenor(){
    return this.mediaMatch.matches;
  }

  retornaUsuario() {
    try {
      this.userSession = sessionStorage
        .getItem('user').valueOf()

        this.idPessoaSession = sessionStorage
        .getItem('person').valueOf()
      this.isErrorUsuario = false
    }
    catch (error) {
      this.isErrorUsuario = true
      console.log('Não encontrado id Usuario ', error)
    }

  }

  retornaTarefasAtividadeDoParticipante() {
    this.tarefasService
      .retornaTarefasParticipante(this.idPessoaSession).subscribe(
        data => {
          const { tarefas } = data;

          this.tarefas = tarefas;
          this.isErrorTarefa = false
        },
        error => {
          this.isErrorTarefa = true
          console.log(error)
          console.log(this.isErrorTarefa)
        }
      );
  }

  marcaAtividadeCompleta(idAtividade, idTarefa){
    this.atividadesServices.finalizaAtividade(idAtividade, idTarefa, this.idPessoaSession).subscribe(
      data => {
        console.log('Finalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasAtividadeDoParticipante();
      },
      error => {
          console.log('Erro ao finalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }

  desmarcaAtividadeCompleta(idAtividade, idTarefa){
    this.atividadesServices.desfinalizaAtividade(idAtividade, idTarefa, this.idPessoaSession).subscribe(
      data => {
        console.log('Desfinalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasAtividadeDoParticipante();
      },
      error => {
          console.log('Erro ao desfinalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }


}
