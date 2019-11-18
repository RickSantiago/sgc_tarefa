import { AddParticipanteComponent } from './../add-participante/add-participante.component';
import { CriarTarefaComponent } from './../criar-tarefa/criar-tarefa.component';
import { AtividadesService } from './../../../services/atividades.service';
import { CriaAtividadeComponent } from '../../tarefas/cria-atividade/cria-atividade.component';
import { MatDialog } from '@angular/material/dialog';
import { TarefasService } from './../../../services/tarefas.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard-tarefa',
  templateUrl: './dashboard-tarefa.component.html',
  styleUrls: ['./dashboard-tarefa.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DashboardTarefaComponent implements OnInit {

  private userSession: any;
  public tarefas: any = [];

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

  descricao: string;
  idResponsavel: any;

  isErrorUsuario: boolean = false;
  isErrorTarefa: boolean = false;
  participantesSelecionados: any = [];
  atividadesCriadas: any = [];
  isRotina: boolean;
  idPessoaSession: string;


  private mediaMatch: MediaQueryList = matchMedia("(max-width:950px)");

  constructor(

    public http: HttpClient,
    public authService: AuthService,
    public tarefasService: TarefasService,
    public atividadesServices: AtividadesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.retornaUsuario();
      this.retornaTarefasDoTitular();
    }, 1000)

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

  retornaTarefasDoTitular() {
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



  removeParticipanteTarefa(idParticipante, idTarefa){
      this.tarefasService.removeParticipante(idParticipante,
         idTarefa).subscribe(
        data => {
          console.log("Participante removido ", data)
          this.retornaTarefasDoTitular();
        },
        error => {
          console.log("Erro: ", error)
        }
      );
  }

  marcaAtividadeCompleta(idAtividade){
    this.atividadesServices.finalizaAtividade(idAtividade).subscribe(
      data => {
        console.log('Finalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasDoTitular();
      },
      error => {
          console.log('Erro ao finalizar atividade: ', error, ' ', idAtividade)
      }
    );
  }

  desmarcaAtividadeCompleta(idAtividade){
    this.atividadesServices.desfinalizaAtividade(idAtividade).subscribe(
      data => {
        console.log('Desfinalizada com sucesso: ', idAtividade, ' ', data)
        this.retornaTarefasDoTitular();
      },
      error => {
          console.log('Erro ao desfinalizar atividade: ', error, ' ', idAtividade)
      }
    );
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

      console.log(`Dialog resultado: `, 'Nome: ', nome,
        'Descricao: ', descricao,
        'idTarefa: ', idTarefa,
        'Participante : ', participantes,
        'idResponsavel: ', idResponsavel);

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

  openDialogTarefa() {

    let dialogRef = this.dialog.open(CriarTarefaComponent, {
      width: '90%',
      data: {
        idTitular: this.idPessoaSession,
        titulo: this.tituloTarefa,
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
        descricao,
        participantesSelecionados,
        isRotina,
        atividadesDaTarefa }
        = result

      console.log(`Dialog resultado: `);

      console.log('Participantes: ', participantesSelecionados.map(item => item.id));
      console.log('Descricao: ', descricao);
      console.log('idTitular: ', idTitular);
      console.log('É rotina? ', isRotina);
      console.log('Atividade', atividadesDaTarefa.map(item => item.descricao));


      this.tarefasService.criarTarefa(
        idTitular,
        titulo,
        descricao,
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

  openDialogParticipante(idTarefa) {

    console.log('ID TAREFA ', idTarefa)

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
       }
        = result

      console.log(`Dialog resultado: `);

      console.log('Participantes: ', participantesSelecionados.map(item => item.id));
      console.log('idTarefa: ', idTarefa);


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

}
