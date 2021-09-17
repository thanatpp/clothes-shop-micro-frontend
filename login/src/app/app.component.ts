import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'login';
  email: string
  password: string

  constructor(private router: Router) {}

  ngOnInit(){

  }

  login(){
    console.log(this.email, this.password)
    localStorage.setItem("token", "It's token")
    this.router.navigateByUrl("/collections/men")
  }
}
