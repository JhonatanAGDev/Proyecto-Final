import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Producto';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  //Variables

  ListarProductos: Producto[] | undefined;

  constructor(private ServiceService: ServiceService, private router:Router) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  //Lista de productos inicio

  listarProductos() {
    this.ServiceService.getProductos().subscribe(
      (res) => {
        console.log(res);
        this.ListarProductos = <any>res;
      },
      (err) => console.log(err)
    );
  }


  //actualizar producto

  actualizarProducto(id:string) {
    this.router.navigate(['/modificar/' + id]);
  }

  //Eliminar producto

  eliminarProducto(id:string){
    this.ServiceService.eliminarProducto(id).subscribe(
      res => {
        console.log('Producto Eliminado');
        this.listarProductos();
      },
      err => console.log(err)
    );
  }
}
