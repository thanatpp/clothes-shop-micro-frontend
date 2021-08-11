import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filterbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  menuStatus: boolean
  gender: string
  type: string

  ngOnInit(){
    this.menuStatus = true
    this.gender = "MEN"
    this.type = "ALL"
    window.addEventListener("toggleMenu", () => this.toggleMenu())
    window.addEventListener("selectGender", (e: CustomEvent) => {
      this.gender = e.detail
    })
  }

  selectTops(){
    this.type = "TOPS"
    this.emitType()
  }

  selectBottoms(){
    this.type = "BOTTOMS"
    this.emitType()
  }

  selectAccessories(){
    this.type = "ACCESSORIES"
    this.emitType()
  }

  toggleMenu(){
    this.menuStatus = !this.menuStatus
  }

  emitType(){
    const selectType = new CustomEvent("selectType", {detail: this.type})
    window.dispatchEvent(selectType)
  }
}