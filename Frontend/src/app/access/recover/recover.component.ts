import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { correoI } from 'src/app/interfaces/correoI';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
})
export class RecoverComponent implements OnInit {
  correo: correoI | undefined;

  constructor(private ServiceService: ServiceService) {}

  ngOnInit(): void {}

  onRecover(form: NgForm) {
    this.ServiceService.recoverEmail(form.value).subscribe((res) => {
      if (res) {
        this.correo = res;
        console.log(res.correo);
        console.log(Object.values(this.correo));

        Swal.fire({
          title: 'Tu contraseña es ' + Object.values(this.correo),
          html: '',

          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      } else {
      }
    });
  }
}
