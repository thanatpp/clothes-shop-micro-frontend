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
    this.type = "all"
    this.checkUrl()
    window.addEventListener("toggleMenu", () => this.toggleMenu())
    window.addEventListener("selectGender", (e: CustomEvent) => {
      this.gender = e.detail
    })
  }

  selectTops(){
    this.type = "tops"
    this.emitType()
  }

  selectBottoms(){
    this.type = "bottoms"
    this.emitType()
  }

  selectAccessories(){
    this.type = "accessories"
    this.emitType()
  }

  selectAll(){
    this.type = "all"
    this.emitType()
  }

  toggleMenu(){
    this.menuStatus = !this.menuStatus
  }

  emitType(){
    const selectType = new CustomEvent("selectType", {detail: this.type})
    window.dispatchEvent(selectType)
  }

  checkUrl(){
    const url = window.location.href.split("/")
    if(url[3] == "women"){
      this.gender = "women"
    }else{
      this.gender = "men"
    }
  }
}