import { EnvService } from './../../../services/env.service';
import { DashboardTarefaComponent } from './../dashboard-tarefa/dashboard-tarefa.component';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Atividade {
  descricao: string;
}

@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.component.html',
  styleUrls: ['./criar-tarefa.component.scss']
})
export class CriarTarefaComponent implements OnInit {

  public formDialogTarefa: FormGroup;
  public formDataTarefa: FormData;

  public todosParticipantes: any = [];

  public chipParticipanteSelecionado: any = [];
  public participanteFiltrado: Observable<String[]>;
  public participantesArray: any = [];

  private desativarTextoLivre = false;
  public removivel = true;

  public participanteControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public isRotinaCheckbox: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  atividades: any = [];
  prazo: any;
  horaPrazo: any;

  @ViewChild('participanteInput', { static: false }) participanteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  constructor(
    public envService: EnvService,
    public http: HttpClient,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DashboardTarefaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) {
    this.formDialogTarefa = fb.group({
      idResponsavel: [null],
    })
  }

  ngOnInit() {
    this.participanteFiltrado = this.participanteControl.valueChanges.pipe(
      startWith(null),
      map(participaneteNome => this.filtrarValorAlterado(participaneteNome))
    );

    this.retornaListaParticipantes();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.atividades.push({ descricao: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(atividade: Atividade): void {
    const index = this.atividades.indexOf(atividade);

    if (index >= 0) {
      this.atividades.splice(index, 1);
    }
  }

  public retornaListaParticipantes() {
    this.http.get(`${this.envService.API_URL}pessoa/retornaParticipantes`).subscribe(
      response => {
        this.todosParticipantes = response
      },
      error => {
        console.log(error)
      }
    )
  }

  public addParticipante(event: MatChipInputEvent): void {
    if (!this.desativarTextoLivre) {
      // only allowed to select from the filtered autocomplete list
      console.log('Texto livre é false');
      console.log('Voce precis selecionar o participante da lista');
      return;
    }


    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (this.matAutocomplete.isOpen) {
      return;
    }

    // Add our engineer
    const valor = event.value;
    if ((valor || '').trim()) {
      this.selecionaParticipantePeloNome(valor.trim());
    }

    this.resetInputs();
  }

  public removeParticipante(participante): void {
    const index = this.chipParticipanteSelecionado.indexOf(participante);
    if (index >= 0) {
      this.chipParticipanteSelecionado.splice(index, 1);
      this.resetInputs();
      console.log(this.chipParticipanteSelecionado.map(item => item.id))
    }
  }

  public participanteSelecionado(event: MatAutocompleteSelectedEvent): void {
    this.selecionaParticipantePeloNome(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.participanteInput.nativeElement.value = '';
    // clear control value and trigger engineerControl.valueChanges event
    this.participanteControl.setValue(null);
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filtrarValorAlterado(nomeParticipante: string | null): String[] {
    let resultado: String[] = [];
    //
    // Remove the engineers we have already selected from all engineers to
    // get a starting point for the autocomplete list.
    //
    let todosParticipantesNaoSelecionados = this.todosParticipantes.filter(participante => this.chipParticipanteSelecionado.indexOf(participante) < 0);
    if (nomeParticipante) {
      resultado = this.filtrarParticipante(todosParticipantesNaoSelecionados, nomeParticipante);

    } else {
      resultado = todosParticipantesNaoSelecionados.map(participante => participante.nome);
    }
    return resultado;
  }

  private filtrarParticipante(participanteLista: any, nomeParticipante: String): String[] {
    let participanteFiltradoLista: any = [];
    const filterValue = nomeParticipante.toLowerCase();
    let coincideNomeParticipante = participanteLista.filter(participante => participante.nome.toLowerCase().indexOf(filterValue) === 0);
    if (coincideNomeParticipante.length || this.desativarTextoLivre) {
      //
      // either the engineer name matched some autocomplete options
      // or the name didn't match but we're allowing
      // non-autocomplete engineer names to be entered
      //
      participanteFiltradoLista = coincideNomeParticipante;
    } else {
      //
      // the engineer name didn't match the autocomplete list
      // and we're only allowing engineers to be selected from the list
      // so we show the whjole list
      //
      participanteFiltradoLista = participanteLista;
    }
    //
    // Convert filtered list of engineer objects to list of engineer
    // name strings and return it
    //
    return participanteFiltradoLista.map(participante => participante.nome);
  }

  private selecionaParticipantePeloNome(nomeParticipante) {
    let participanteEncontrado = this.todosParticipantes.filter(participante => participante.nome == nomeParticipante);
    if (participanteEncontrado.length) {
      //
      // We found the engineer name in the allEngineers list
      //
      this.chipParticipanteSelecionado.push(participanteEncontrado[0]);
      console.log(this.chipParticipanteSelecionado.map(item => item.id))
    } else {
      //
      // Create a new engineer, assigning a new higher employeeId
      // This is the use case when allowFreeTextAddEngineer is true
      //
      let criarNovoIdParaParticipanteNaoEncontrado = Math.max(...this.chipParticipanteSelecionado.map(engineer => engineer.id), 0);
      this.chipParticipanteSelecionado.push({ nome: nomeParticipante, id: criarNovoIdParaParticipanteNaoEncontrado + 1 });
    }
  }

  recebeDataPrazo(event) {
    this.prazo = event.target.value
    console.log(this.prazo)
  }
  recebeHoraPrazo(event) {
    this.horaPrazo = event.target.value
    console.log(this.horaPrazo)
  }

  salvar(dados): void {

    this.data.participantesSelecionados = this.chipParticipanteSelecionado;
    this.data.atividadesDaTarefa = this.atividades;
    this.data.prazo = this.prazo;
    this.data.horaPrazo = this.horaPrazo;
    const data = this.data

    this.dialogRef.close(data);
  }

  voltarDialog(): void {
    this.dialogRef.close();
  }

verificaIsRotina(event){
  this.isRotinaCheckbox = event.checked;
  console.log(this.isRotinaCheckbox);
}

}