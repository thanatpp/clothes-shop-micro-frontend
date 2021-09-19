import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'product-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  product_id: Number
  amount: Number

  xxs: Number
  s: Number
  m: Number
  l: Number
  xl: Number
  xxl: Number

  constructor(private location: Location) {}

  ngOnInit(){
    this.amount = 1
    this.xxs = 0
    this.s = 10
    this.m = 10
    this.l = 10
    this.xl = 0
    this.xxl = 10
    if(localStorage.getItem("product_id") != null){
      this.product_id = Number(localStorage.getItem("product_id"))
    }else{
      this.location.back()
    }
    window.addEventListener("selectGender", (e: CustomEvent) => {
      this.product_id = e.detail
    })
  }

  amountChange(e){
    this.amount = e.target.value
    console.log(this.amount)
  }

  dec(){
    if(this.amount != 1){
      this.amount = Number(this.amount) - 1
    }
    console.log(this.amount)
  }

  inc(){
    this.amount = Number(this.amount) + 1
    console.log(this.amount)
  }
}

