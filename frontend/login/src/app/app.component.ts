import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'login-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  email: string 
  password: string

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
          alert('Login Successfully');
          console.log(result)
          localStorage.setItem('user', JSON.stringify(result));
          if(result.data.user.type === "customer"){
            this.router.navigateByUrl('/collections/men')
          }else{
            this.router.navigateByUrl('/admin')
          }
        } else {
          alert(result.error);
        }
      },
      (err) => {
        alert(err.error.message);
        this.email = undefined
        this.password = undefined
      }
    );
  }
}
