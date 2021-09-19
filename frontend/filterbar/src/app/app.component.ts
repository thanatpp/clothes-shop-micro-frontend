import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filterbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  gender: string
  type: string

  ngOnInit(){
    this.type = "all"
    this.checkUrl()
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

  emitType(){
    const selectType = new CustomEvent("selectType", {detail: this.type})
    window.dispatchEvent(selectType)
  }

  checkUrl(){
    const url = window.location.href.split("/")
    if(url[4] == "women"){
      this.gender = "women"
    }else{
      this.gender = "men"
    }
  }
}