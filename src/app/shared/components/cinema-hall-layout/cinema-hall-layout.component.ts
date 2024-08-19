import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  JsonPipe,
  Location,
} from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth/services';
import { Cast } from '../../models/credit.interface';
import { Movie } from '../../models/movie.interface';
import { MaterialModule } from '../../modules/material/material.module';
import { BookingService } from '../../services/booking.service';
import { MoviesService } from '../../services/movies.service';
import { CinemaHallService } from './../../services/cinema-hall.service';
import { DialogContentExampleDialog } from './dialog-content-example-dialog';

const initialMovieState = {
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  id: 0,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: new Date(),
  title: '',
  video: true,
  vote_average: 0,
  vote_count: 0,
};

@Component({
  selector: 'app-cinema-hall-layout',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    AsyncPipe,
    JsonPipe,
    DatePipe,
    DialogContentExampleDialog,
  ],
  templateUrl: './cinema-hall-layout.component.html',
  styleUrl: './cinema-hall-layout.component.css',
})
export class CinemaHallLayoutComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  readonly router = inject(Router);
  private readonly moviesSvc = inject(MoviesService);
  public movie = signal<Movie>(initialMovieState);
  public imagesBaseUrl = environment.imagesBaseUrl;
  public movieCast = signal<Cast[]>([]);

  data: any;
  cinemaHallSvc = inject(CinemaHallService);
  cinemaSeats$ = this.cinemaHallSvc.getCinemaHallSeats();
  authSvc: any = inject(AuthService);
  bookingSvc = inject(BookingService);

  rows: string[] = [];
  cols: number[] = [];

  vip: string[] = [];
  premium: string[] = [];

  inicio = new Date();
  fin = new Date();
  seatsAvailable = [];
  seatsNotAvailable = [];
  numbersOfSeatsNotAvailable: string[] = [];
  seatsPrices: any[] = [];
  selectedSeats: any[] = [];
  user: any;
  total: number = 0;

  constructor(private location: Location) {
    this.data = this.location.getState(); // do what you want
    this.getMovieById(this.data.movieID);
    this.authSvc.getCurrentUser().subscribe((data: any) => {
      if (data) {
        this.user = data?.id;
      }
    });
  }

  ngOnInit(): void {
    this.rows = this.cinemaHallSvc.getRows();
    this.cols = this.cinemaHallSvc.getColuns();
    this.vip = this.cinemaHallSvc.getSeatType().vip;
    this.premium = this.cinemaHallSvc.getSeatType().premium;
    this.getCastById(this.data.movieID!);
    this.cinemaHallSvc
      .showSeatsAvailable(this.data.showID)
      .subscribe((data) => {
        this.seatsAvailable = data;
      });
    this.cinemaHallSvc
      .showSeatsNotAvailable(this.data.showID)
      .pipe(
        tap((data) => {
          return data;
        })
      )
      .subscribe((data) => {
        data.forEach((element: any) => {
          let butaca = this.cinemaHallSvc.getRowColumPosition(
            element?.cinemaSeatID
          );
          this.numbersOfSeatsNotAvailable.push(butaca?.fila + butaca?.columna);
        });
        this.seatsNotAvailable = data;
      });

    this.cinemaHallSvc
      .getSeatsPriceByShowId(this.data.showID)
      .subscribe((data) => {
        this.seatsPrices = data;
      });
  }

  //click handler
  seatClicked(fila: string, columna: number) {
    if (this.numbersOfSeatsNotAvailable.includes(fila + columna)) {
      alert('Butaca no disponible');
      return;
    }

    if (this.vip.includes(`${fila}${columna}`)) {
      const confirmacion = confirm('¿Desea seleccionar esta butaca?');

      if (confirmacion) {
        this.selectedSeats.push({
          position: `${fila}${columna}`,
          type: 'VIP',
          price: this.getPriceForTypeOfSeat('VIP'),
        });
        this.numbersOfSeatsNotAvailable.push(`${fila}${columna}`);
        this.total = this.total + this.getPriceForTypeOfSeat('VIP');
      }
    } else if (this.premium.includes(fila + columna)) {
      const confirmacion = confirm('¿Desea seleccionar esta butaca?');

      if (confirmacion) {
        this.selectedSeats.push({
          position: `${fila}${columna}`,
          type: 'PREMIUM',
          price: this.getPriceForTypeOfSeat('PREMIUM'),
        });
        this.numbersOfSeatsNotAvailable.push(`${fila}${columna}`);
        this.total = this.total + this.getPriceForTypeOfSeat('PREMIUM');
      }
    } else {
      const confirmacion = confirm('¿Desea seleccionar esta butaca?');

      if (confirmacion) {
        this.selectedSeats.push({
          position: `${fila}${columna}`,
          type: 'STANDARD',
          price: this.getPriceForTypeOfSeat('STANDARD'),
        });
        this.numbersOfSeatsNotAvailable.push(`${fila}${columna}`);
        this.total = this.total + this.getPriceForTypeOfSeat('STANDARD');
      }
    }
    let seatPos = `${fila}${columna}`;
    let naturalNumber = this.cinemaHallSvc.getSeatPosition(fila, columna);
  }

  getMovieById(id: number) {
    this.moviesSvc.getMovieById(id).subscribe((data) => {
      this.movie.set(data);
    });
  }

  getCastById(id: number) {
    this.moviesSvc.getMovieCast(id).subscribe({
      next: (r) => this.movieCast.set(r),
    });
  }

  getPriceForTypeOfSeat(type: string) {
    let valor: number = 0;
    this.seatsPrices.forEach((element) => {
      if (element.type === type) {
        valor = element.price;
      }
    });

    return valor;
  }

  onBuy() {
    if (this.selectedSeats.length > 0) {
      console.log(this.selectedSeats);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        selected: this.selectedSeats,
        user: this.user,
        total: this.total,
        showID: this.data.showID,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
