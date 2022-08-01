import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { DescripcionProductosComponent } from './Components/descripcion-productos/descripcion-productos.component';
import { ListadoProductosComponent } from './Components/listado-productos/listado-productos.component';
import { HomeComponent } from './Components/home/home.component';
import { AccountComponent } from './access/account/account.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { RecoverComponent } from './access/recover/recover.component';
import { AgregarComponent } from './Components/agregar/agregar.component';
import { ModificarComponent } from './Components/modificar/modificar.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recover', component: RecoverComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'agregar', component: AgregarComponent},
  {path: 'modificar/:id', component:ModificarComponent},
  {path: 'descripcion/productos', component: DescripcionProductosComponent},
  {path: 'listado/productos', component: ListadoProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
