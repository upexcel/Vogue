import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CommonService {

  constructor(public snackbar: MatSnackBar) { }

  openSnackBar(message: string, isError: boolean, duration: number) {
    this.snackbar.open(message, '', {
      duration: duration,
      panelClass: isError ? 'snack-error' : 'snack'
    });
  }
}
