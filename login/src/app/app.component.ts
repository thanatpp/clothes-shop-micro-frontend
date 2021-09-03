import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'login';
  email: string
  password: string

  ngOnInit(){

  }

  login(){
    console.log(this.email, this.password)
  }
}
