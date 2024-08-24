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
    return this.http.post(`/api/bookings`, booking);
  }

  getConfirmedBookings() {
    return this.http.get(`/api/bookings/payed`);
  }

  sendEmailBooking(booking: any) {
    return this.http.post(`/api/emails/confirm`, booking);
  }

  getBookingById(userID: string, showID: number) {
    return this.http.get(`/api/bookings/${userID}/${showID}`);
  }

  getBookingDetails(userID: string, showID: number) {
    return this.http.get(`/api/bookings/${userID}/${showID}`);
  }

  getEmailBooking(booking: any) {
    return this.http.post(`/api/email`, booking);
  }
}
