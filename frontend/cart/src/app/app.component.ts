import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { UserAddressService } from './services/user-address.service';
import { OrderService } from './services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: any;
  cart: any;
  token: String = '';
  _id: String = '';
  isNull: Boolean = false;
  selectAddress: Boolean = false;
  address: any;
  indexAddress: any;
  addressIsNull: Boolean = false;
  totalPrice: String = '0';
  totalAmount: String = '0';

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  constructor(
    private cartService: CartService,
    private router: Router,
    private userAddress: UserAddressService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getCart();
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

  getCart() {
    this.cartService.getCart(this._id, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.cart = data.data;
          this.isNull = false;
          this.getTotalAmount()
          this.getTotalPrice()
        } else {
          this.isNull = true;
          this.totalPrice = '0'
          this.totalAmount = '0'
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        } else {
          console.log(err.error.message);
        }
      }
    );
  }

  amountChange(e, i) {
    this.cart[i].quantity = Number(e.target.value);
  }

  dec(i) {
    if (this.cart[i].quantity > 0) {
      this.cart[i].quantity = Number(this.cart[i].quantity) - 1;
      if (this.cart[i].quantity === 0) {
        this.deleteProductInCart(i);
      } else {
        this.updateCart(this.cart[i]._id, this.cart[i].quantity);
        this.getCart();
      }
    }
  }

  deleteProductInCart(i) {
    this.cartService
      .deleteProductInCart(this.cart[i].product._id, this.token)
      .subscribe(
        (data) => {
          if (data.status === true) {
            this.getCart();
          } else {
            console.log('cannot delete product in cart');
          }
        },
        (err) => {
          if (err.error.status === 401) {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
          } else {
            console.log(err.error.message);
          }
        }
      );
  }

  inc(i) {
    this.cart[i].quantity = Number(this.cart[i].quantity) + 1;
    this.updateCart(this.cart[i]._id, this.cart[i].quantity);
  }

  outOfStock(i) {
    if (this.cart[i].product.type.name === 'accessories') {
      if (this.cart[i].quantity > this.cart[i].product.quantity) {
        return true;
      } else {
        return false;
      }
    } else {
      const _size = this.cart[i].size;
      if (this.cart[i].quantity > this.cart[i].product.size[_size]) {
        return true;
      } else {
        return false;
      }
    }
  }

  getStock(i) {
    if (this.cart[i].product.type.name === 'accessories') {
      return this.cart[i].product.quantity;
    } else {
      const _size = this.cart[i].size;
      return this.cart[i].product.size[_size];
    }
  }

  updateCart(id, quantity) {
    this.cartService.updateCart(id, this.token, quantity).subscribe(
      (data) => {
        if (data.status === true) {
          this.getCart();
        } else {
          this.getCart();
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        } else {
          this.getCart();
          console.log(err.error.message);
        }
      }
    );
  }

  price(i: any) {
    return Intl.NumberFormat().format(
      this.cart[i].quantity * this.cart[i].product.price
    );
  }

  getTotalPrice() {
    var total = 0;
    for (var i in this.cart) {
      total += this.cart[i].quantity * this.cart[i].product.price;
    }
    this.totalPrice = Intl.NumberFormat().format(total);
  }

  getTotalAmount() {
    var amount = 0;
    for (var i in this.cart) {
      amount += this.cart[i].quantity;
    }
    this.totalAmount = Intl.NumberFormat().format(amount);
  }

  checkOut() {
    if (this.selectAddress === false) {
      this.userAddress.getUserAddress(this._id, this.token).subscribe(
        (data) => {
          if (data.status === true) {
            this.address = data.data;
            this.selectAddress = true;
          } else {
            this.selectAddress = true;
            this.addressIsNull = true;
          }
        },
        (err) => {
          if (err.error.status === 401) {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
          }
        }
      );
    } else {
      if (this.indexAddress === undefined) {
        this.Toast.fire({
          icon: 'error',
          title: 'Please select Address.',
        });
      } else {
        this.getCart();
        let n = 0;
        for (let i in this.cart) {
          let status = this.outOfStock(i);
          if (status === true) {
            n++;
          }
        }
        if (n === 0) {
          var order = [];
          for (let item of this.cart) {
            var _order = {
              user: this._id,
              product: item.product._id,
              address: this.address[this.indexAddress]._id,
              size: item.size,
              quantity: item.quantity,
              date: this.dateToString(new Date().toLocaleDateString()),
            };
            order.push(_order);
          }
          this.orderService
            .addOrder({ order: order, data: this.cart }, this.token)
            .subscribe(
              (data) => {
                if (data.status === true) {
                  this.selectAddress = false;
                  this.Toast.fire({
                    icon: 'success',
                    title: 'Add Order successfully.',
                  });
                  this.getCart();
                } else {
                  this.selectAddress = false;
                  this.Toast.fire({
                    icon: 'error',
                    title: 'Cannot add Order.',
                  });
                  this.getCart();
                }
              },
              (err) => {
                if (err.error.status === 401) {
                  localStorage.removeItem('user');
                  this.router.navigateByUrl('/login');
                }
              }
            );
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Product out of Stock.',
          });
          this.getCart();
        }
      }
    }
  }

  dateToString(date: String) {
    const _date = date.split('/');
    return _date[1] + '-' + _date[0] + '-' + _date[2];
  }
}
