import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  correcto: boolean = false;

  constructor(private ServiceService: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    console.log(form.value);
    this.ServiceService.login(form.value).subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('home');
      } else {
        Swal.fire({
          title: 'Datos incorrectos',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    });
  }
}
