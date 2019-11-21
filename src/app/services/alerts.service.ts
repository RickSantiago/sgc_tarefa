import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar, ) { }

  snackCriarTarefa(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackAdicionarParticipante(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackRemoveParticipante(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackProibirRemoveParticipante(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      panelClass: 'bg-snack-proibir'
    });
  }

  snackCriaAtividade(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackAtualizaAtividade(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackResolveAtividade(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  snackDesfazResolveAtividade(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
