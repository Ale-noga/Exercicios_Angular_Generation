import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [

  {path:'',redirectTo: 'home', pathMatch: 'full'},
  {path:'entrar',component:EntrarComponent},
  {path:'cadastrar',component:CadastrarComponent},
  {path: 'home', component:HomeComponent},
  {path: 'inicio', component:InicioComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
