import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'product-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  size: String = '';
  isSelectSize: boolean = false;
  outOfStock: boolean = false;
  product_id: String;
  quantity: Number = 0;
  product: any;
  inStock: Number;
  isAccessories: boolean = false;
  token: String = '';
  _id: String = '';

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.product_id = localStorage.getItem('product_id');
    this.getProduct();
    this.getUser();
  }

  getProduct() {
    this.productService.getProduct(this.product_id).subscribe(
      (data) => {
        this.product = data.data;
        const quantity =
          this.product.size.xxs +
          this.product.size.xs +
          this.product.size.s +
          this.product.size.m +
          this.product.size.l +
          this.product.size.xl +
          this.product.quantity;

        if (quantity === 0) {
          this.outOfStock = true;
        } else {
          this.outOfStock = false;
        }

        if (this.product.type.name === 'accessories') {
          this.isAccessories = true;
        } else {
          this.isAccessories = false;
        }
      },
      (err) => {
        console.log(err);
        this.back();
      }
    );
  }

  getUser() {
    if (localStorage.getItem('user') !== null) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.token = user.data.token;
      this._id = user.data.user._id;
    }
  }

  price() {
    return Intl.NumberFormat().format(this.product.price);
  }

  amountChange(e) {
    this.quantity = e.target.value;
  }

  dec() {
    if (this.quantity > 0 && (this.isSelectSize || this.isAccessories)) {
      this.quantity = Number(this.quantity) - 1;
    }
  }

  inc() {
    if (this.isSelectSize || this.isAccessories) {
      this.quantity = Number(this.quantity) + 1;
    }
  }

  onSizeChange(value: any) {
    this.size = value;
    this.getProduct();
    this.inStock = this.product.size[value];
    this.isSelectSize = true;
    this.quantity = 0;
  }

  addToCart() {
    this.getProduct();
    if (this._id === '') {
      this.router.navigateByUrl('/login');
    } else {
      if (this.quantity > this.product.size[String(this.size)]) {
        this.Toast.fire({
          icon: 'error',
          title: this.product.name + ' is not Enough',
        });
      } else {
        this.cartService
          .addCart(
            this.product_id,
            this._id,
            this.token,
            this.size,
            this.quantity
          )
          .subscribe(
            (result) => {
              if (result.status === true) {
                this.Toast.fire({
                  icon: 'success',
                  title: 'Add ' + this.product.name + ' Successfully',
                });
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Cannot Add ' + this.product.name,
                });
              }
            },
            (err) => {
              if (err.error.status === 401) {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Cannot Add ' + this.product.name,
                });
              }
            }
          );
      }
    }
    this.quantity = 0;
  }

  back() {
    this.router.navigateByUrl('/collections/men');
  }
}
