import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.interface';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  signUp(user: User): Observable<string> {
    return this.http
      .post<TokenResponse>(`${this.baseUrl}/auth/signup`, user)
      .pipe(map((response: TokenResponse) => response.token));
  }

  signIn(email: string, password: string): Observable<string> {
    localStorage.setItem('email', email);
    return this.http
      .post<TokenResponse>(`${this.baseUrl}/auth/signin`, { email, password })
      .pipe(map((response: TokenResponse) => response.token));
  }

  recoverPassword(email: string) {
    return this.http.post(`${this.baseUrl}/auth/recoverypass`, { email });
  }

  changePassword(id: string, newPassword: string, newConfirmPassword: string) {
    return this.http.patch(
      `${this.baseUrl}/auth/recoverypass/resetpassword/${id}`,
      { newPassword, newConfirmPassword }
    );
  }

  googleRegistration(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/google`);
  }

  getCurrentUser() {
    const email = localStorage.getItem('email');
    console.log(email);
    return this.http.get<User>(`${this.baseUrl}/users/findUser/${email}`);
  }
}
