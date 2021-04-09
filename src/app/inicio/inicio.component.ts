import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/postagem';
import { Tema } from '../model/tema';
import { Usuario } from '../model/usuario';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl:'./inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tema: Tema = new Tema()
  listTema: Tema[]
  idTema: number
  postagem: Postagem = new Postagem()
  listPostagem: Postagem[]
  user: Usuario = new Usuario()
  idUser = environment.id
  confirmeSenha: string
  tipo: string



  constructor(private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private alert: AlertaService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.findAllTema()
    this.findAllPostagem()
    this.findByIdUser()

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
    this.findByIdPostagem(id)

  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listTema = resp
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  cadastrarTema() {

    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema cadastrado!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }

  atualizarTema() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema Atualizado!')
      this.findAllTema()
    })
  }

  deletarTema() {
    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
    this.temaService.deleteTema(id).subscribe(() => {
      alert('Tema deletado com sucesso!')
      this.findAllTema()
    })
  }

  findByIdTemaPost() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.findAllPostagem()
      this.postagem = new Postagem()  
    })

  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }

  findAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listPostagem = resp
    }) 
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  editarPost(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem alterada com sucesso!')
    })

  }

  deletarPost(){
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.postagemService.deletePostagem(id).subscribe(()=>[
      alert('Postagem deletada com sucesso!')
    ])
  }

  confirmSenha(event: any) {
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipo = event.target.value
  }

  atualizar(){
    this.user.tipo = this.tipo

    if(this.user.senha != this.confirmeSenha){
      alert('Senhas não conferem!')
    }
    else{
      this.auth.cadastrar(this.user).subscribe((resp: Usuario)=>{
        this.user = resp
        this.router.navigate(['/inicio'])
        this.alert.showAlertSuccess('Usuario atualizado com sucesso! Faça login novamente')
        environment.token=''
        environment.id=0
        environment.foto=''
        environment.nome=''
      })
    }}

}
