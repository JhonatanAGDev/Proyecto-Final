import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ListadoProductosComponent } from './Components/listado-productos/listado-productos.component';
import { DescripcionProductosComponent } from './Components/descripcion-productos/descripcion-productos.component';
import { HeaderComponent } from './Plantillas/header/header.component';
import { AccessModule } from './access/access.module';
import { HomeComponent } from './Components/home/home.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AgregarComponent } from './Components/agregar/agregar.component';
import { ModificarComponent } from './Components/modificar/modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListadoProductosComponent,
    DescripcionProductosComponent,
    HeaderComponent,
    HomeComponent,
    AgregarComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccessModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
