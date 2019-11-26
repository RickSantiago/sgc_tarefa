import { DashboardTarefaComponent } from './../dashboard-tarefa/dashboard-tarefa.component';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-responsavel-atividade',
  templateUrl: './responsavel-atividade.component.html',
  styleUrls: ['./responsavel-atividade.component.scss']
})
export class ResponsavelAtividadeComponent {

  public formDialog: FormGroup;
  public formData: FormData;
  idResponsavel: number;


  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DashboardTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.formDialog = fb.group({
        idResponsavel:[null],
      })
    }

  retornaResponsavel(event){
    // console.log(event.target.value)
    // console.log(this.formDialog.get('idResponsavel').value);
    this.idResponsavel = event.target.value
  }

   salvar(dados): void {
     this.data.idResponsavel =this.formDialog.get('idResponsavel').value
     const data = this.data

    this.dialogRef.close(data);
  }

  voltarDialog(): void {
    this.dialogRef.close();
  }
}
