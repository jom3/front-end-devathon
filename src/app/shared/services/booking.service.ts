import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  setBooking(booking: any) {
    return this.http.post(`${this.baseUrl}/bookings`, booking);
  }

  getConfirmedBookings() {
    return this.http.get(`${this.baseUrl}/bookings/payed`);
  }
}
