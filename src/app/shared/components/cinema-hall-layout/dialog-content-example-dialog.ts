import { CurrencyPipe } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';
import { CinemaHallService } from '../../services/cinema-hall.service';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.css'],
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
})
export class DialogContentExampleDialog {
  @Inject(MAT_DIALOG_DATA) public data: any;
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
      .updateSeatStatus(this.data.showID, payload)
      .subscribe((data: any) => {
        console.log(data);
      });

    this.bookingSvc.setBooking(payload).subscribe((data: any) => {
      console.log(data);
    });
    // update Show_Seats table with selected seats
    // create a new booking record
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }
}
