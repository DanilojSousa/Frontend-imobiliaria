import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";

@Injectable()
export class Mensagem implements MatSnackBarModule{

  constructor(public snackBar: MatSnackBar){}

  sucesso(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'X', {
      duration: duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  error(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'X', {
      duration: duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  atencao(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'X', {
      duration: duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
