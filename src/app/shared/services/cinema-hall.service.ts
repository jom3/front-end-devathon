import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CinemaHall } from '../models/cinema-hall-seat.interface';

@Injectable({
  providedIn: 'root',
})
export class CinemaHallService {
  readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';
  letrasAbecera = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vip: string[] = [];
  premium: string[] = [];
  filas = 5; // letras
  columnas = 10;

  getCinemaHallSeats() {
    return this.http
      .get<any>(this.apiUrl + '/cinema-seats')
      .pipe(
        map((res: CinemaHall[]) => {
          res.forEach((element: any) => {
            if (element.type === 'RECLINABLE') {
              const numasiento = element.cinemaSeatID;
              let result = this.getRowColumPosition(numasiento);
              this.vip.push(result.fila + result.columna);
            } else if (element.type === 'DELUXE') {
              const numasiento = element.cinemaSeatID;
              let result = this.getRowColumPosition(numasiento);
              this.premium.push(result.fila + result.columna);
            } else {
            }
          });
          return res;
        })
      )
      .subscribe((res) => console.log(this.getRowColumPosition(49)));
  }

  getRows() {
    //extraer el numero de letras sesgun el total de filas
    return this.letrasAbecera.slice(0, this.filas);
  }

  getColuns() {
    return this.numeros.slice(0, this.columnas);
  }

  getSeatType() {
    return {
      vip: this.vip,
      premium: this.premium,
    };
  }

  getRowColumPosition(numero: number) {
    //tenemos 5 filas y 10 columnas, las filas son letras
    if (numero < this.columnas) {
      return {
        fila: 'A',
        columna: numero + 1,
      };
    } else {
      let position: any = Math.floor(numero / this.columnas);
      let fila = this.letrasAbecera[position];
      let columna = numero % this.columnas;
      return {
        fila: fila,
        columna: columna + 1,
      };
    }
  }
}
