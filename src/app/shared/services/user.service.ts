import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../auth/models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject(HttpClient)
  private baseUrl = environment.baseUrl

  updateUser(id:string, user:User):Observable<any>{
    return this._http.patch(`${this.baseUrl}/users/${id}`,user)
  }

  getUserById(id:string):Observable<User>{
    return this._http.get<User>(`${this.baseUrl}/users/${id}`)
  }
}
