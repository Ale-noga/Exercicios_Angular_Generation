import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'

const routes: Routes = [

  {path:'',redirectTo: 'home', pathMatch: 'full'},
  {path:'entrar',component:EntrarComponent},
  {path:'cadastrar',component:CadastrarComponent},
  {path: 'home', component:HomeComponent},
  {path: 'inicio', component:InicioComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{
    provide:LocationStrategy,
    useClass:HashLocationStrategy
  }]


})
export class AppRoutingModule { }
