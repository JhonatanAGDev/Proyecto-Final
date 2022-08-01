import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { userlogI } from 'src/app/interfaces/userlogI';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  usuario: userlogI | undefined;
  idd: any;
  nombre: any;
  correo: any;
  telefono: any;
  direccion: any;
  usuarrio: any;

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.ServiceService.getaccount().subscribe(
      (res) => {
        this.usuario = res;
        this.idd = this.usuario.id_usuario;
        this.nombre = this.usuario.nombre;
        this.correo = this.usuario.correo;
        this.telefono = this.usuario.telefono;
        this.direccion = this.usuario.direccion;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAccount(form: NgForm) {
    this.ServiceService.updateUser(form.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Datos Actualizados',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      },
      (err) => {
        Swal.fire({
          title: 'Datos no Actualizados' + err,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    );
  }
}
