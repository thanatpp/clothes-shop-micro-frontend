import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';

@Component({
  selector: 'purchase-history-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'purchase-history';
  items: any[]
  token: String
  _id: String
  order: any
  orderIsNull: Boolean = false;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(){
    this.getUser()
    this.getOrder()
    this.items = [{name: "THE GODFAGLE TEE", price: 320, amount:1}, {name: "THE GODFAGLE TEE", price: 790, amount:2}, {name: "THE GODFAGLE TEE", price: 199, amount:1}, 
                  {name: "THE GODFAGLE TEE", price: 690, amount:1}]

    console.log(this.isEmptyItem())
  }

  getUser() {
    if (localStorage.getItem('user') !== null) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.token = user.data.token;
      this._id = user.data.user._id;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getOrder(){
    this.orderService.getOrder(this._id, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.order = data.data
        } else {
          this.order = []
          this.orderIsNull = true
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }
      }
    )
  }

  price(i: any) {
    return Intl.NumberFormat().format(
      this.order[i].quantity * this.order[i].product.price
    );
  }

  isEmptyItem(){
    if(this.items.length > 0){
      return false
    }else{
      return true
    }
  }
}
