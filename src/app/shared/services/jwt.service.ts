import { effect, Injectable, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public isLogged = signal<boolean>(false)

  constructor(){
    effect(()=>{
      if(this.getIsActiveToken()){
        this.isLogged.set(true)
      }else{
        this.isLogged.set(false)
      }
    },{
      allowSignalWrites:true
    })
  }

  setToken(token:string){
    localStorage.setItem('token', token)
    this.isLogged.set(true)
  }

  setTokenGoogle(token:string){
    sessionStorage.setItem('tokenGoogle', token)
    this.isLogged.set(true)
  }

  removeToken(){
    localStorage.removeItem('token')
    this.isLogged.set(false)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getIsActiveToken(){
    if(localStorage.getItem('token')){
      return true
    }
    return false
  }

  getDecodedToken(){
    const accessToken = this.getToken()
    if(accessToken){
      const decodedToken = jwtDecode<any>(accessToken)
      return decodedToken;
    }
  }
}
