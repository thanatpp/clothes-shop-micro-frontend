import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'product-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  product_id: Number

  constructor(private location: Location) {}

  ngOnInit(){
    if(localStorage.getItem("product_id") != null){
      this.product_id = Number(localStorage.getItem("product_id"))
    }else{
      this.location.back()
    }
    window.addEventListener("selectGender", (e: CustomEvent) => {
      this.product_id = e.detail
    })
  }
}

