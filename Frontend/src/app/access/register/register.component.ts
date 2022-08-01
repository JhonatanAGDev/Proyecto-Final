import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private ServiceService: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  onRegister(form: NgForm): void {
    console.log(form.value);
    this.ServiceService.createUser(form.value).subscribe(
      (res) => {
        if (res) {
          this.router.navigateByUrl('home');
          console.log('Usuario Creado');
        }
      },
      (err) => {
        Swal.fire({
          title: err,
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
