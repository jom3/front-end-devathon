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
  letrasAbecera = ['A', 'B', 'C', 'D', 'E'];
  numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  vip: string[] = [];
  premium: string[] = [];
  filas = 5; // letras
  columnas = 10;

  getCinemaHallSeats() {
    return this.http
      .get<any>(this.apiUrl + '/cinema-seats')
      .pipe(
        map((res: CinemaHall[]) => {
          console.log(res);
          res.forEach((element: any) => {
            if (element.type === 'VIP') {
              const numasiento = element.cinemaSeatID;
              let result = this.getRowColumPosition(numasiento);
              this.vip.push(result.fila + result.columna);
            } else if (element.type === 'PREMIUM') {
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
        columna: numero,
      };
    } else {
      let position: any = Math.floor(numero / this.columnas);
      let fila = this.letrasAbecera[position];
      let columna = numero % this.columnas;
      return {
        fila: fila,
        columna: columna,
      };
    }
  }

  //este metodo convierte FC en numero natural
  getSeatPosition(fila: string, columna: number) {
    let counter = 0;
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        if (this.letrasAbecera[i] === fila && this.numeros[j] === columna) {
          return counter;
        }
        counter++;
      }
    }
    return null;
  }

  //muestra el numero de plazas libres para un especifico showID
  showSeatsAvailable(id: number) {
    return this.http.get<any>(this.apiUrl + '/shows/showSeatsAvailable/' + id);
  }
  showSeatsNotAvailable(id: number) {
    return this.http.get<any>(
      this.apiUrl + '/shows/showSeatsNotAvailable/' + id
    );
  }

  getSeatsPriceByShowId(id: number) {
    return this.http.get<any>(
      this.apiUrl + '/shows/getShowSeatsPricesByShow/' + id
    );
  }

  getNaturalNumberFromSeatPosition(position: string) {
    let result = position.split('');
    let fila = result[0];
    let columna = result[1];
    console.log(fila, columna);

    let filaIndex = this.letrasAbecera.indexOf(fila);
    let columnaIndex = this.numeros.indexOf(Number(columna));

    return filaIndex * 10 + columnaIndex;
  }

  updateSeatStatus(id: number, body: any) {
    return this.http.patch<any>(
      this.apiUrl + '/shows/updateSeatStatus/' + id,
      body
    );
  }
}
