import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.interface';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  constructor(private readonly oauthService: OAuthService) {
    this.initLoginGoogle();
  }

  //Conexion con el Backend de Slow Movies
  signUp(user: User): Observable<string> {
    localStorage.setItem('email', user?.email);
    return this.http.post<TokenResponse>(`/api/auth/signup`, user).pipe(
      tap(console.log),
      map((response: TokenResponse) => response.token)
    );
  }

  signIn(email: string, password: string): Observable<string> {
    localStorage.setItem('email', email);
    return this.http
      .post<TokenResponse>(`/api/auth/signin`, { email, password })
      .pipe(map((response: TokenResponse) => response.token));
  }

  recoverPassword(email: string) {
    return this.http.post(`/api/auth/recoverypass`, { email });
  }

  changePassword(id: string, newPassword: string, newConfirmPassword: string) {
    return this.http.patch(`/api/auth/recoverypass/resetpassword/${id}`, {
      newPassword,
      newConfirmPassword,
    });
  }

  getCurrentUser() {
    debugger;
    const email = localStorage.getItem('email');
    return this.http.get<User>(`/api/users/findUser/${email}`);
  }

  //Conexion Oauth_Google
  async initLoginGoogle() {
    const googleConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientId,
      redirectUri: window.location.origin,
      scope: 'openid profile email',
    };
    this.oauthService.configure(googleConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    const resp = this.getMetadataUserGoogle();
    console.log(resp);
  }

  loginWithGoogle() {
    this.oauthService.initCodeFlow();
  }

  logoutGoogle() {
    this.oauthService.logOut();
  }

  getMetadataUserGoogle() {
    return this.oauthService.getIdentityClaims();
  }

  googleRegistration(): Observable<any> {
    const token = sessionStorage.getItem('id_token');
    return this.http.post(`/api/auth/google/validate`, {
      token: token,
    });
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.oauthService.logOut();
  }
}
