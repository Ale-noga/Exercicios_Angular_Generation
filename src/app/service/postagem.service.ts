import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8090/Postagem', this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`http://localhost:8090/Postagem/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8090/Postagem', postagem, this.token)
  }

  putPostagem(postagem: Postagem):  Observable<Postagem>{
    return this.http.put<Postagem>('http://localhost:8090/Postagem', postagem, this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(`http://localhost:8090/Postagem/${id}`, this.token) 
  }
  
}
