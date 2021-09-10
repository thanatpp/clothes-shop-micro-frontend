import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'purchase-history-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'purchase-history';
  items: any[]

  ngOnInit(){
    //fake items
    this.items = [{name: "THE GODFAGLE TEE", price: 320, amount:1}, {name: "THE GODFAGLE TEE", price: 790, amount:2}, {name: "THE GODFAGLE TEE", price: 199, amount:1}, 
                  {name: "THE GODFAGLE TEE", price: 690, amount:1}]

    console.log(this.isEmptyItem())
  }

  isEmptyItem(){
    if(this.items.length > 0){
      return false
    }else{
      return true
    }
  }
}
