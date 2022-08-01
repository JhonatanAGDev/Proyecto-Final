import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Producto } from 'src/app/interfaces/Producto';
import { Router } from '@angular/router';
import { categoria } from '../../interfaces/categoria';
import { subcategoria } from 'src/app/interfaces/subcategoria';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  producto: Producto = {
    id: '',
    nombre_producto: '',
    precio_producto: '',
    cantidad: '',
    desc: '',
    id_sub_categoria: '',
    url: ''
  };

  listarCategoria: categoria [] | undefined;

  listarSubCategoria: subcategoria [] | undefined;


  constructor(private ServiceService: ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.consultaCategorias();
    this.consultaSubcategoria();
  }

  agregarProducto() {
    delete this.producto.id;

    this.ServiceService.agregarProducto(this.producto).subscribe();
    this.router.navigate(['/inicio']);
  }

  consultaCategorias() {
      this.ServiceService.getCategoria().subscribe(
        (res) => {
          console.log(res);
          this.listarCategoria = <any>res;
          console.log(this.listarCategoria)
        },
        (err) => console.log(err)
      );
    }

    consultaSubcategoria() {
      this.ServiceService.getSubCategoria().subscribe(
        (res) => {
          console.log(res);
          this.listarSubCategoria = <any>res;
          console.log(this.listarSubCategoria)
        },
        (err) => console.log(err)
      );
    }
}
