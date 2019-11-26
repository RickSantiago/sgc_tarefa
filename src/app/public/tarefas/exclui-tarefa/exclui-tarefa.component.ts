import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardTarefaComponent } from '../dashboard-tarefa/dashboard-tarefa.component';

@Component({
  selector: 'app-exclui-tarefa',
  templateUrl: './exclui-tarefa.component.html',
  styleUrls: ['./exclui-tarefa.component.scss']
})
export class ExcluiTarefaComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<DashboardTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

  salvar(dados): void {
    const data = this.data
    this.dialogRef.close(data);
 }

 voltarDialog(): void {
  this.dialogRef.close();
 }

}
