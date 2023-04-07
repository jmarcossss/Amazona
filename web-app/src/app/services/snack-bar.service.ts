import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackBarPosition = {
  horizontal?: 'start' | 'center' | 'end' | 'left' | 'right';
  vertical?: 'top' | 'bottom';
};

type SnackBarParams = {
  message: string;
  position?: SnackBarPosition;
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSuccess({ message, position }: SnackBarParams): void {
    this.showSnackbar({
      message,
      panelClass: 'success',
      position,
    });
  }

  public showError({ message, position }: SnackBarParams): void {
    this.showSnackbar({
      message,
      panelClass: 'error',
      position,
    });
  }

  private showSnackbar({
    message,
    panelClass,
    position = {
      horizontal: 'center',
      vertical: 'bottom',
    },
  }: {
    message: string;
    panelClass: string;
    position?: SnackBarPosition;
  }): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: [`${panelClass}-snackbar`],
      horizontalPosition: position.horizontal,
      verticalPosition: position.vertical,
    });
  }
}
