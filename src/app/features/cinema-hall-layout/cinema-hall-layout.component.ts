import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { CinemaHallService } from '../../shared/services/cinema-hall.service';

@Component({
  selector: 'app-cinema-hall-layout',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncPipe, JsonPipe],
  templateUrl: './cinema-hall-layout.component.html',
  styleUrl: './cinema-hall-layout.component.css',
})
export class CinemaHallLayoutComponent implements OnInit {
  cinemaHallSvc = inject(CinemaHallService);
  cinemaSeats$ = this.cinemaHallSvc.getCinemaHallSeats();

  cinemaHallDescription: string = 'Cinemas Ocean Drive, Sala 1';
  screen: string = 'Sala 1 Pantalla';

  rows: string[] = [];
  cols: number[] = [];

  vip: string[] = [];
  premium: string[] = [];

  ngOnInit(): void {
    this.rows = this.cinemaHallSvc.getRows();
    this.cols = this.cinemaHallSvc.getColuns();
    this.vip = this.cinemaHallSvc.getSeatType().vip;
    this.premium = this.cinemaHallSvc.getSeatType().premium;
  }

  //click handler
  seatClicked(fila: string, columna: number) {
    if (this.vip.includes(fila + columna)) {
      alert(`Butaca VIP ${fila}${columna}`);
    } else if (this.premium.includes(fila + columna)) {
      alert(`Butaca PREMIUM ${fila}${columna}`);
    } else {
      alert(`Butaca STANDARD ${fila}${columna}`);
    }
    let seatPos = `${fila}${columna}`;
  }
}
