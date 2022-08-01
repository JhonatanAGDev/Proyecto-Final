import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Producto } from 'src/app/interfaces/Producto';
import { Router, ActivatedRoute } from '@angular/router';
import { categoria } from '../../interfaces/categoria';
import { subcategoria } from 'src/app/interfaces/subcategoria';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {
  producto: Producto = {
    id: '',
    nombre_producto: '',
    precio_producto: '',
    cantidad: '',
    desc: '',
    id_sub_categoria: '',
    url: '',
  };

  listarSubCategoria: subcategoria[] | undefined;

  constructor(
    private ServiceService: ServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id_entrada = <string>this.activeRouter.snapshot.params['id'];
    console.log('id de entrada: ' + id_entrada);
    this.consultaSubcategoria();
    if (id_entrada) {
      this.ServiceService.getProductosIdentificador(id_entrada).subscribe(
        (res: any) => {
          this.producto = res[0];
          console.log(res[0]);
        },
        (err) => console.log(err)
      );
    }
  }

  modificar() {
    this.ServiceService.actualizarProducto(
      this.producto.id!,
      this.producto
    ).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );

    this.router.navigate(['/inicio']);
  }

  consultaSubcategoria() {
    this.ServiceService.getSubCategoria().subscribe(
      (res) => {
        console.log(res);
        this.listarSubCategoria = <any>res;
        console.log(this.listarSubCategoria);
      },
      (err) => console.log(err)
    );
  }
}
