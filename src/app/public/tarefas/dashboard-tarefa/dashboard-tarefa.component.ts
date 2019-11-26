import { ExcluiTarefaComponent } from './../exclui-tarefa/exclui-tarefa.component';
import { EditaTarefaComponent } from './../edita-tarefa/edita-tarefa.component';
import { ExcluiAtividadeComponent } from './../exclui-atividade/exclui-atividade.component';
import { AlertsService } from './../../../services/alerts.service';
import { ListaTarefasComponent } from './../lista-tarefas/lista-tarefas.component';
import { ResponsavelAtividadeComponent } from './../responsavel-atividade/responsavel-atividade.component';
import { AddParticipanteComponent } from './../add-participante/add-participante.component';
import { CriarTarefaComponent } from './../criar-tarefa/criar-tarefa.component';
import { AtividadesService } from './../../../services/atividades.service';
import { CriaAtividadeComponent } from '../../tarefas/cria-atividade/cria-atividade.component';
import { MatDialog } from '@angular/material/dialog';
import { TarefasService } from './../../../services/tarefas.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-tarefa',
  templateUrl: './dashboard-tarefa.component.html',
  styleUrls: ['./dashboard-tarefa.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardTarefaComponent implements OnInit {

  private userSession: any;
  public tarefas: any = [];
  public tarefasAtribuidas: any = [];
  public tarefasParticipo: any = [];
  public tarefasConcluidas: any = [];
  public selectedIndex = 0;

  public todosParticipantes: any = [];
  public chipParticipanteSelecionado: any = [];
  public participanteFiltrado: Observable<String[]>;
  public participantesArray: any = [];

  private desativarTextoLivre = false;
  public removivel = true;

  public participanteControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('participanteInput', { static: false }) participanteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  tituloTarefa: string;
  descricaoTarefa: string;
  prazo: string;
  horaPrazo: string;

  descricao: string;
  idResponsavel: any;

  isErrorUsuario: boolean = false;
  isErrorTarefa: boolean = false;
  participantesSelecionados: any = [];
  atividadesCriadas: any = [];
  isRotina: boolean;
  idPessoaSession;
  public hoje: string = new Date().toLocaleDateString();
  public hojeHora: string = new Date().toLocaleString();

  public routeId;


  private mediaMatch: MediaQueryList = matchMedia("(max-width:950px)");

  constructor(

    public http: HttpClient,
    public authService: AuthService,
    public tarefasService: TarefasService,
    public atividadesServices: AtividadesService,
    public dialog: MatDialog,
    public alert: AlertsService,
    private route: ActivatedRoute,
    private router: Router

  ) {



  }

  ngOnInit() {

    // console.log(location.pathname.split('/')[2]);


    // this.verificaLogin();
    this.recebeSessao();

    setTimeout(() => {
      this.retornaUsuario();
      this.retornaTarefasDoTitular();
      this.retornaTarefasAtividadeDoParticipante();
      this.retornaTarefasParticipanteLogado();
      this.retornaTarefasParticipanteConcluidas();
    }, 500)



    // setInterval(() => {
    //   console.log('Atualizou')
    //   this.retornaTarefasDoTitular();
    // }, 5000);



  }

  telaMenor() {
    return this.mediaMatch.matches;
  }

  verificaTabs(tabSelecionada) {
    console.log(tabSelecionada);
    if (tabSelecionada == 0) {

    }
    if (tabSelecionada == 1) {

    }
  }

  recebeSessao() {

    if (location.pathname.split('/')[1] == 'dashboard-tarefa') {

      this.routeId = location.pathname.split('/')[2];
      this.authService.recebeDadosLogin(this.routeId).subscribe(
        data => {
          const { userData } = data

          sessionStorage.setItem('user', userData.map(id => id.userId))
          sessionStorage.setItem('person', userData.map(idPerson => idPerson.pessoaId))
          sessionStorage.setItem('token', userData.map(tk => tk.token))

        },
        error => {
          console.log(error)
        }
      );
    }
    if (location.pathname.split('/')[1] != 'dashboard-tarefa' && this.idPessoaSession) {

      const idPessoa = sessionStorage.getItem('person').valueOf()
      console.log(parseInt(idPessoa))

      this.authService.recebeDadosLogin(parseInt(idPessoa)).subscribe(
        data => {
          // const { userData } = data

          // sessionStorage.setItem('user', userData.map(id => id.userId))
          // sessionStorage.setItem('person', userData.map(idPerson => idPerson.pessoaId))
          // sessionStorage.setItem('token', userData.map(tk => tk.token))

        },
        error => {
          console.log(error)
        }
      );
      console.log('nao é a mesma url');

    }
    if (location.pathname.split('/')[1] != 'dashboard-tarefa' && !this.idPessoaSession) {
      this.authService.recebeDadosLogin(null);
    }

  }

  // verificaLogin(){
  //   this.routeId = location.pathname.split('/')[2];
  //   this.authService.recebeDadosLogin(this.routeId);

  // }

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

  retornaTarefasDoTitular() {
    // console.log('To aqui');

    this.tarefasService
      .retornaTarefasTitular(this.idPessoaSession).subscribe(
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

  retornaTarefasAtividadeDoParticipante() {
    this.tarefasService
      .retornaTarefasParticipante(this.idPessoaSession).subscribe(
        data => {
          const { tarefas } = data;

          this.tarefasAtribuidas = tarefas;
          this.isErrorTarefa = false
        },
        error => {
          console.log(error)
        }
      );
  }

  retornaTarefasParticipanteLogado() {
    this.tarefasService
      .retornaTarefasPessoaParticipa(this.idPessoaSession).subscribe(
        data => {
          const { tarefas } = data;

          this.tarefasParticipo = tarefas;
          // console.log(this.tarefasParticipo)
          this.isErrorTarefa = false
        },
        error => {
          this.isErrorTarefa = true
          console.log(error)
          console.log(this.isErrorTarefa)
        }
      );
  }

  retornaTarefasParticipanteConcluidas() {
    this.tarefasService
      .retornaTarefasConcluidas(this.idPessoaSession).subscribe(
        data => {
          const { tarefas } = data;

          this.tarefasConcluidas = tarefas;
          // console.log(this.tarefasParticipo)
          this.isErrorTarefa = false
        },
        error => {
          this.isErrorTarefa = true
          console.log(error)
          console.log(this.isErrorTarefa)
        }
      );
  }

  removeParticipanteTarefa(idParticipante, idTarefa) {
    this.tarefasService.removeParticipante(idParticipante,
      idTarefa).subscribe(
        data => {
          // console.log("Participante removido ", data)
          this.retornaTarefasDoTitular();
        },
        error => {
          if (error.status == 403) {
            this.alert.snackProibirRemoveParticipante(`
            Esse participante não pode ser removido,
            existe(m) atividade(s) relacionada a ele, para remove-lo, edite a atividade do qual ele é responsavel`, "Ok")
          }
          console.log("Erro: ", error, ' status ', error.status);
        }
      );
  }

  marcaAtividadeCompleta(idAtividade, idTarefa) {
    this.atividadesServices.finalizaAtividade(idAtividade, idTarefa, this.idPessoaSession).subscribe(
      data => {
        // console.log('Finalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasDoTitular();
      },
      error => {
        console.log('Erro ao finalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }

  desmarcaAtividadeCompleta(idAtividade, idTarefa) {
    this.atividadesServices.desfinalizaAtividade(idAtividade, idTarefa, this.idPessoaSession).subscribe(
      data => {
        // console.log('Desfinalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasDoTitular();
      },
      error => {
        console.log('Erro ao desfinalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }

  openDialogTarefa() {

    let dialogRef = this.dialog.open(CriarTarefaComponent, {
      width: '90%',
      data: {
        idTitular: this.idPessoaSession,
        titulo: this.tituloTarefa,
        prazo: this.prazo,
        horaPrazo: this.horaPrazo,
        descricao: this.descricaoTarefa,
        participantesSelecionados: this.participantesSelecionados,
        atividadesDaTarefa: this.atividadesCriadas,
        isRotina: this.isRotina
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const {
        idTitular,
        titulo,
        prazo,
        horaPrazo,
        descricao,
        participantesSelecionados,
        isRotina,
        atividadesDaTarefa }
        = result

      this.tarefasService.criarTarefa(
        idTitular,
        titulo,
        descricao,
        prazo,
        horaPrazo,
        isRotina,
        participantesSelecionados,
        atividadesDaTarefa).subscribe(
          data => {
            console.log(data)
            this.retornaTarefasDoTitular();
          },
          error => {
            console.log(error);
          }
        );

    })
  }

  openDialogEditaTarefa(task) {

    let dialogRef = this.dialog.open(EditaTarefaComponent, {
      width: '90%',
      data: {
        idTarefa: task.id,
        titulo: task.titulo,
        prazo: task.prazo,
        horaPrazo: task.horaPrazo,
        descricao: task.descricao,
        isRotina: task.rotina,

      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const {
        idTarefa,
        titulo,
        prazo,
        horaPrazo,
        descricao,
        isRotina }
        = result

      this.tarefasService.editaTarefa(
        idTarefa,
        titulo,
        descricao,
        prazo,
        horaPrazo,
        isRotina,
      ).subscribe(
        data => {
          console.log(data)
          this.retornaTarefasDoTitular();
        },
        error => {
          console.log(error);
        }
      );

    })
  }

  openDialogExcluirTarefa(task) {

    let dialogRef = this.dialog.open(ExcluiTarefaComponent, {
      width: '60%',
      data: {
        idTarefa: task.id, titulo: task.titulo
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const { idTarefa } = result

      this.tarefasService.deletaTarefa(idTarefa).subscribe(
        data => {
          this.retornaTarefasDoTitular();
        },
        error => {
          if (error.status == 403) {
            this.alert.snackProibirRemoveParticipante(`Não foi possui excluir
           a tarefa,
          verifique se ela possui alguma atividade incompleta
           com responsavel atribuido a ela.`, "Ok")
          }
          console.log("Erro: ", error, ' status ', error.status);
        }
      );

    })
  }

  openDialogAtividade(task) {

    let dialogRef = this.dialog.open(CriaAtividadeComponent, {
      width: '90%',
      data: {
        nome: task.titular, idTarefa: task.id, descricao: this.descricao,
        participantes: task.participantes, idResponsavel: this.idResponsavel
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const { nome, descricao, idTarefa, participantes, idResponsavel } = result

      // console.log(`Dialog resultado: `, 'Nome: ', nome,
      //   'Descricao: ', descricao,
      //   'idTarefa: ', idTarefa,
      //   'Participante : ', participantes,
      //   'idResponsavel: ', idResponsavel);

      this.atividadesServices.criaAtividade(idTarefa, idResponsavel, descricao).subscribe(
        data => {
          this.retornaTarefasDoTitular();
        },
        error => {
          console.log(error);
        }
      );

    })
  }

  openDialogEditarAtividade(atv, participantes) {

    console.log(atv);
    console.log(participantes)


    let dialogRef = this.dialog.open(ResponsavelAtividadeComponent, {
      width: '90%',
      data: {
        idAtividade: atv.id, descricao: atv.descricao,
        participantes: participantes, idResponsavel: this.idResponsavel,
        responsavelAtual: atv.responsavel
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const { idAtividade, participantes, idResponsavel, descricao } = result

      // console.log(
      //   'idATIVIDAE: ', idAtividade,
      //   'Participante : ', participantes,
      //   'idResponsavel: ', idResponsavel,
      //   'Descricao: ', descricao);

      this.atividadesServices.updateAtividade(idAtividade, idResponsavel, descricao).subscribe(
        data => {
          this.retornaTarefasDoTitular();
        },
        error => {
          console.log(error);
        }
      );

    })
  }

  openDialogExcluirAtividade(atv) {

    console.log(atv);

    let dialogRef = this.dialog.open(ExcluiAtividadeComponent, {
      width: '90%',
      data: {
        idAtividade: atv.id, descricao: atv.descricao,
        responsavelAtual: atv.responsavel
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const { idAtividade } = result

      // console.log(
      //   'idATIVIDAE: ', idAtividade,
      //   'Participante : ', participantes,
      //   'idResponsavel: ', idResponsavel,
      //   'Descricao: ', descricao);

      this.atividadesServices.deletaAtividade(idAtividade).subscribe(
        data => {
          this.retornaTarefasDoTitular();
        },
        error => {
          if (error.status == 403) {
            this.alert.snackProibirRemoveParticipante(`Não foi possui excluir a atividade,
          verifique se ela possui algum responsavel atribuido.`, "Ok")
          }
          console.log("Erro: ", error, ' status ', error.status);
        }
      );

    })
  }



  openDialogParticipante(idTarefa) {

    let dialogRef = this.dialog.open(AddParticipanteComponent, {
      width: '90%',
      data: {
        idTarefa: idTarefa,
        participantesSelecionados: this.participantesSelecionados,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      const {
        idTarefa,
        participantesSelecionados,
      } = result

      // console.log(`Dialog resultado: `);

      // console.log('Participantes: ', participantesSelecionados.map(item => item.id));
      // console.log('idTarefa: ', idTarefa);


      this.tarefasService.addParticipante(
        idTarefa,
        participantesSelecionados,
      ).subscribe(
        data => {
          console.log(data)
          this.retornaTarefasDoTitular();
        },
        error => {
          console.log(error);
        }
      );

    })
  }

  logout() {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('person')
    sessionStorage.removeItem('token')
    location.reload();
  }

}
