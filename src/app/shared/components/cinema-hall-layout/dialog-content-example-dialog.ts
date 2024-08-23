import { CurrencyPipe } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';
import { CinemaHallService } from '../../services/cinema-hall.service';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.css'],
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
})
export class DialogContentExampleDialog {
  router = inject(Router);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogContentExampleDialog>
  ) {}

  bookingSvc = inject(BookingService);
  cinemaHallSvc = inject(CinemaHallService);
  pagar() {
    let s: any = [];
    this.data.selected.forEach((element: any) => {
      return s.push(
        this.cinemaHallSvc.getNaturalNumberFromSeatPosition(element.position)
      );
    });
    let payload = {
      seats: s,
      total: this.data.total,
      status: 'CONFIRMADO',
      userID: this.data.user,
      showID: this.data.showID,
    };
    this.cinemaHallSvc
      .updateSeatStatus(payload.showID, payload)
      .subscribe((data: any) => {});

    this.bookingSvc.setBooking(payload).subscribe((data: any) => {
      this.dialogRef.close({ data: true });
    });

    this.bookingSvc
      .getBookingById(payload?.userID, this.data?.showID)
      .pipe(
        tap((data) => {
          delay(500);
        })
      )
      .subscribe((data: any) => {
        data = data.sort((a: any, b: any) => b.bookingID - a.bookingID);
        // al comenzar en cero el array
        let ultimo = data[0];
        console.log('ultimo booking ', data);

        data = {
          boodingId: ultimo?.bookingID + 1,
          start_hour: ultimo?.horapelicula,
          movie_title: ultimo?.title,
          movie_date: ultimo?.freserva,
          fullName: ultimo?.fullName,
          email: localStorage.getItem('email'),
        };
        //tengo userID y showID, tengo que conseguir el bookingID
        this.bookingSvc.getEmailBooking(data).subscribe((data: any) => {});
      });
  }
}
