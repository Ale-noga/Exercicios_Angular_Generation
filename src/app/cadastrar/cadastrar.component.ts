import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: Usuario = new Usuario
  confirmeSenha: string
  tipo: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)
    
  }

  confirmSenha(event: any) {
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipo = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipo

    if(this.user.senha != this.confirmeSenha){
      alert('Senhas não conferem!')
    }
    else{
      this.authService.cadastrar(this.user).subscribe((resp: Usuario)=>{
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuario cadastrado com sucesso')
      })
    }

  }

}
