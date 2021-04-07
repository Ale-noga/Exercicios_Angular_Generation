import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tema: Tema = new Tema()
  listTema: Tema[]

  constructor(private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/entrar']) }

      this.findAllTema()

      let id = this.route.snapshot.params['id']
      this.findByIdTema(id)
      
  }

  findAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listTema = resp
    })
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  cadastrarTema(){
      
      this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
        this.tema = resp
        alert('Tema cadastrado!')
        this.findAllTema()
        this.tema = new Tema()
        this.router.navigate(['/inicio'])
      })
  }

  atualizarTema(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema Atualizado!')
      this.router.navigate(['/inicio'])
    })
  }

  deletarTema(){
    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
    this.temaService.deleteTema(id).subscribe(()=>{
      alert('Tema deletado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
