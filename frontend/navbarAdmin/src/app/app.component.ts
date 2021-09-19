import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbarAdmin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: "navbar"
  onClickMenu: boolean

  ngOnInit(){
    this.onClickMenu = false
  }

  toggleMenu(){
    this.onClickMenu = !this.onClickMenu
  }
}
