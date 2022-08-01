import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/Producto';
import { userI } from '../interfaces/userI';
import { Observable, tap } from 'rxjs';
import { userlogI } from '../interfaces/userlogI';
import { correoI } from '../interfaces/correoI';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  buscador = '';
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //Inicia Acceso (Alexis)

  login(usuario: any): Observable<any> {
    console.log('entraste');
    console.log(usuario);
    return this.http.post<any>(this.url + 'login', usuario).pipe(
      tap((res: userI) => {
        if (res) {
          this.saveUsuario(res.id_usuario);
        }
      })
    );
  }

  createUser(usuario: any): Observable<any> {
    return this.http
      .post<any>(this.url + 'usuario/registrarUsuario', usuario)
      .pipe(
        tap((res: any) => {
          if (res) {
            console.log('Usuario Creado');
          }
        })
      );
  }

  getId() {
    return this.buscador;
  }

  logOut() {
    localStorage.clear();
  }
  //recuperar contraseña
  recoverEmail(correo: any): Observable<correoI> {
    return this.http.post<correoI>(this.url + 'usuario/recuperar', correo);
  }
  getaccount(): Observable<userlogI> {
    //console.log('función inn');
    const iduser = {
      id_usuario: localStorage.getItem('ACCES_ID'),
      // ACCES_ID: userid
    };
    console.log(iduser);
    return this.http.post<userlogI>(this.url + 'usuario/getUsuario', iduser);
  }

  //guardar id de usuario
  private saveUsuario(userId: number): void {
    const str = String(userId);
    localStorage.setItem('ACCES_ID', str);
  }

  updateUser(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + 'usuario/update', usuario).pipe(
      tap((res: any) => {
        if (res) {
          console.log('Usuario modificado');
        }
      })
    );
  }

  //Termina Acceso (Alexis)

  //Inicia Productos Jhonatan

  //Muestra todos los productos

  getProductos() {
    return this.http.get(this.url + '/productos');
  }

  //Muestra un producto

  getProductosIdentificador(id: string) {
    return this.http.get(this.url + '/productos/' + id);
  }

  //Agrega un producto

  agregarProducto(producto: Producto) {
    return this.http.post(this.url + '/productos/crear', producto);
  }

  //Actualizar producto

  actualizarProducto(id: string, producto: Producto) {
    return this.http.put(this.url + '/productos/actualizar/' + id, producto);
  }

  //Borra un producto

  eliminarProducto(id: string) {
    return this.http.delete(this.url + '/productos/eliminar/' + id);
  }

  //Categorias

  getCategoria(){
    return this.http.get(this.url + '/categorias');
  }

  //SubCategoria

  getSubCategoria(){
    return this.http.get(this.url + '/subcategorias');
  }

  //Termina Productos Jhonatan
}
