import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbarAdmin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: "navbar"
  onClickMenu: boolean

  constructor(private router: Router){}

  ngOnInit(){
    this.onClickMenu = false
  }

  toggleMenu(){
    this.onClickMenu = !this.onClickMenu
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigateByUrl('/collections/men')
  }
}
