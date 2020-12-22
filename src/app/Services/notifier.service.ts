import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar : MatSnackBar) { }

  ShowNotification(status : string, Message : string, Btext : string) {
    this.snackbar.openFromComponent(NotificationComponent, {
      data : {
        status : status,
        Message : Message,
        ButtonText : Btext
      },
      duration : 5000,
      panelClass : 'ServerError'
    })
  }
}
