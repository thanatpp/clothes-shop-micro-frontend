import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

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

  constructor(private cartService: CartService, private router: Router) {}

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
        } else {
          this.isNull = true;
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
        this.deleteProductInCart(i)
      }else{
        this.updateCart(this.cart[i]._id, this.cart[i].quantity)
        this.getCart()
      }
    }
  }

  deleteProductInCart(i){
    this.cartService.deleteProductInCart(this.cart[i].product._id, this.token).subscribe(
      (data) => {
        if(data.status === true){
          this.getCart()
        }else{
          console.log("cannot delete product in cart")
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
    )
  }

  inc(i) {
    this.cart[i].quantity = Number(this.cart[i].quantity) + 1;
    this.updateCart(this.cart[i]._id, this.cart[i].quantity)
  }

  outOfStock(i){
    if(this.cart[i].product.type.name === 'accessories'){
      if(this.cart[i].quantity > this.cart[i].product.quantity ){
        return true
      }else{
        return false
      }
    }else{
      const _size = this.cart[i].size
      if(this.cart[i].quantity > this.cart[i].product.size[_size] ){
        return true
      }else{
        return false
      }  
    }
  }

  getStock(i){
    if(this.cart[i].product.type.name === 'accessories'){
      return this.cart[i].product.quantity
    }else{
      const _size = this.cart[i].size
      return  this.cart[i].product.size[_size]
    }
  }
  
  updateCart(id, quantity){
    this.cartService.updateCart(id, this.token, quantity).subscribe(
      (data) => {
        if(data.status === true){
          this.getCart()
        }else{
          this.getCart()
          console.log("cannot update product in cart")
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        } else {
          this.getCart()
          console.log(err.error.message);
        }
      }
    )
  }

  price(i: any) {
    return Intl.NumberFormat().format(
      this.cart[i].quantity * this.cart[i].product.price
    );
  }

  totalPrice() {
    var total = 0;
    for (var i in this.cart) {
      total += this.cart[i].quantity * this.cart[i].product.price;
    }
    return Intl.NumberFormat().format(total);
  }

  totalAmount() {
    var amount = 0;
    for (var i in this.cart) {
      amount += this.cart[i].quantity;
    }
    return Intl.NumberFormat().format(amount);
  }
}
