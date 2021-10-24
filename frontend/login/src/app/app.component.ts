import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  email: string 
  password: string

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  constructor(private router: Router, private user: UserService) {}

  ngOnInit() {}

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.user.login(data).subscribe(
      (result) => {
        if (result.status === true) {
          console.log(result)
          localStorage.setItem('user', JSON.stringify(result));
          if(result.data.user.type === "customer"){
            this.router.navigateByUrl('/collections/men')
          }else{
            this.router.navigateByUrl('/admin')
          }
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Please check your email and password.',
          });
        }
      },
      (err) => {
        this.email = undefined
        this.password = undefined
        this.Toast.fire({
          icon: 'error',
          title: 'Please check your email and password.',
        });
      }
    );
  }
}
