import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material/material.module';

@Component({
  selector: 'app-cinema-hall-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './cinema-hall-layout.component.html',
  styleUrl: './cinema-hall-layout.component.css',
})
export class CinemaHallLayoutComponent {
  movieTitle: string = 'Captain America: The Winter Soldier';
  screen: string = 'LUXE CINEMAS';
  price!: number;
  tick!: number;
  conv!: number;
  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reserved: string[] = ['A1', 'A2', 'A3', 'A4', 'A7', 'A8', 'A9', 'A10'];

  deluxe: string[] = ['A5', 'A6'];

  selected: string[] = [];

  ticketPrice: number = 120;
  convFee: number = 30;
  totalPrice: number = 0;
  currency: string = 'Rs';

  //return status of each seat
  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return;
  }
  //clear handler
  clearSelected() {
    this.selected = [];
  }
  //click handler
  seatClicked(seatPos: string) {
    alert(seatPos);
    var index = this.selected.indexOf(seatPos);

    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) this.selected.push(seatPos);
    }
  }
  //Buy button handler
  showSelected() {
    if (this.selected.length > 0) {
      this.price = this.ticketPrice;
      this.tick = this.selected.length;
      this.conv = this.convFee;
    } else {
      alert('No seats selected!');
    }
  }
}
