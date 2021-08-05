import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  onClickProfile: boolean
  onClickMenu: boolean

  ngOnInit(){
    this.onClickMenu = false
    this.onClickProfile = false
  }

  toggleMenu(){
    this.onClickMenu = !this.onClickMenu
  }

  toggleProfile(){
    this.onClickProfile = !this.onClickProfile
  }
}
