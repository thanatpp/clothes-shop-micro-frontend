import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'listitem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  gender: string
  type: string

  ngOnInit(){
    this.gender = "MEN"
    this.type = "ALL"
    window.addEventListener("selectGender", (e: CustomEvent) => {
        this.gender = e.detail
    })
    window.addEventListener("selectType", (e: CustomEvent) => {
      this.type = e.detail
  })
  }
}
