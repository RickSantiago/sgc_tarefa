import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardTarefaComponent } from '../dashboard-tarefa/dashboard-tarefa.component';

@Component({
  selector: 'app-edita-tarefa',
  templateUrl: './edita-tarefa.component.html',
  styleUrls: ['./edita-tarefa.component.scss']
})
export class EditaTarefaComponent implements OnInit {

  prazo: string;
  horaPrazo: string;

  constructor( public dialogRef: MatDialogRef<DashboardTarefaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit() {
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

    console.log(this.prazo);
    console.log(this.horaPrazo);


    this.data.prazo = this.prazo;
    this.data.horaPrazo = this.horaPrazo;
    const data = this.data
    this.dialogRef.close(data);
  }

  voltarDialog(): void {
    this.dialogRef.close();
  }


}
