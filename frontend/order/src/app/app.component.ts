import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';

@Component({
  selector: 'order-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orders: any;
  _orders: any;
  _id: String;
  token: String;
  ordersIsNull: Boolean = false;
  searchText: String = '';

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.getUser();
    this.getOrder();
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

  getOrder() {
    this.orderService.getOrder(this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.orders = data.data;
          this._orders = data.data;
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  address(
    firstName,
    lastName,
    phoneNumber,
    detail,
    amphoe,
    district,
    province,
    zipcode
  ) {
    return (
      firstName +
      ' ' +
      lastName +
      ' (' +
      phoneNumber +
      ') ' +
      detail +
      ' ' +
      amphoe +
      ' ' +
      district +
      ' ' +
      province +
      ' ' +
      zipcode
    );
  }

  search() {
    var _n = new Set(
      this.orders.filter(
        (item) =>
          item.address.firstName.toLowerCase().search(this.searchText.toLowerCase()) !== -1
      )
    );
    this._orders = _n;
    if (this._orders.size === 0) {
      this.ordersIsNull = true;
    } else {
      this.ordersIsNull = false;
    }
  }
}
