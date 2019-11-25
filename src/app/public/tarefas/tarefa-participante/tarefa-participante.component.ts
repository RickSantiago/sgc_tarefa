import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tarefa-participante',
  templateUrl: './tarefa-participante.component.html',
  styleUrls: ['./tarefa-participante.component.scss']
})
export class TarefaParticipanteComponent implements OnInit {

  public tarefas: any = [];
  public userSession: any;
  public idPessoaSession: string;
  public isErrorUsuario: boolean;
  public hoje:string = new Date().toLocaleDateString();

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
    this.retornaTarefasParticipanteLogado();

    setInterval(() => {
      console.log('Atualizou')
      this.retornaTarefasParticipanteLogado();
    }, 10000);

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

  retornaTarefasParticipanteLogado() {
    this.tarefasService
      .retornaTarefasPessoaParticipa(this.idPessoaSession).subscribe(
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
        this.retornaTarefasParticipanteLogado();
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
        this.retornaTarefasParticipanteLogado();
      },
      error => {
          console.log('Erro ao desfinalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }


}
