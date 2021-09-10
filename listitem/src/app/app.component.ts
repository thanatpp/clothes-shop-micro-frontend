import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'listitem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  gender: string
  type: string
  items: any[]
  showDetail: boolean

  constructor(private router: Router) {}

  ngOnInit(){
    this.type = "ALL"
    this.checkUrl()
    window.addEventListener("selectGender", (e: CustomEvent) => {
        this.gender = e.detail
    })
    window.addEventListener("selectType", (e: CustomEvent) => {
      this.type = e.detail
    })

    //fake items
    this.items = [{name: "THE GODFAGLE TEE", price: 320}, {name: "THE GODFAGLE TEE", price: 790}, {name: "THE GODFAGLE TEE", price: 199}, 
                  {name: "THE GODFAGLE TEE", price: 690}, {name: "THE GODFAGLE TEE", price: 690}, {name: "THE GODFAGLE TEE", price: 690},
                  {name: "THE GODFAGLE TEE", price: 690}, {name: "THE GODFAGLE TEE", price: 690}, {name: "THE GODFAGLE TEE", price: 690}]
     
  }

  checkUrl(){
    const url = window.location.href.split("/")
    if(url[3] == "women"){
      this.gender = "women"
    }else{
      this.gender = "men"
    }
  }

  clickItem(i: any){
    console.log("click item ", i)
    localStorage.setItem("product_id", i)
    //window.location.href = "/product"
  }
}
