
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/userLogin';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userlogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8090/usuarios/logar', userlogin)
  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8090/usuarios/cadastrar', user)
  }

}
