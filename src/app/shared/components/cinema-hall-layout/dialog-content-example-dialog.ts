import { CurrencyPipe } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';
import { CinemaHallService } from '../../services/cinema-hall.service';
import { Router } from '@angular/router';

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
      .getBookingById(payload.userID, this.data.showID)
      .subscribe((data: any) => {
        data = {
          boodingId: data[data.length - 1].bookingID,
          start_hour: data[data.length - 1].horapelicula,
          movie_title: data[data.length - 1].title,
          movie_date: data[data.length - 1].freserva,
          fullName: data[data.length - 1].fullName,
          email: 'mbakalitahiri@hotmail.com',
        };

        //tengo userID y showID, tengo que conseguir el bookingID

        this.bookingSvc.getEmailBooking(data).subscribe((data: any) => {});
      });
  }
}
