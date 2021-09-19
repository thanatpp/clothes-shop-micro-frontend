import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: any[]

  ngOnInit(){
    //fake items
    this.items = [{name: "THE GODFAGLE TEE", price: 320, amount:1}, {name: "THE GODFAGLE TEE", price: 790, amount:2}, {name: "THE GODFAGLE TEE", price: 199, amount:1}, 
                  {name: "THE GODFAGLE TEE", price: 690, amount:1}]
  }

  amountChange(e, i){
    this.items[i].amount = e.target.value
  }

  dec(i){
    if(this.items[i].amount != 1){
      this.items[i].amount = Number(this.items[i].amount) - 1
    }
  }

  inc(i){
    this.items[i].amount = Number(this.items[i].amount) + 1
  }

  price(i: any){
    return Intl.NumberFormat().format(this.items[i].amount * this.items[i].price)
  }

  totalPrice(){
    var total = 0
    for(var i in this.items){
      total += this.items[i].amount * this.items[i].price
    }
    return Intl.NumberFormat().format(total)
  }

  totalAmount(){
    var amount = 0
    for(var i in this.items){
      amount += this.items[i].amount
    }
    return Intl.NumberFormat().format(amount)
  }
  
}
