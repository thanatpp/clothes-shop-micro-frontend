import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'homeAdmin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isEdit: boolean;
  productEdit: any;
  selectSize: any;
  products: any;
  _products: any;
  _id: String;
  token: String;
  filter: String = 'all';
  searchText: String = '';
  productsIsNull: Boolean = false;
  quantity: Number = 0;
  product_id: String;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  constructor(private router: Router, private productService: ProductService) {}

  editProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.isEdit = false;
    this.selectSize = 'xxs';
    this.getUser();
    this.getProduct();
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

  getProduct() {
    this.productService.getProducts().subscribe(
      (data) => {
        if (data.status === true) {
          this.products = data.data;
          this._products = this.products;
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

  edit(id) {
    this.isEdit = true;
    this.product_id = id;
    this.productService.getProduct(this.product_id).subscribe(
      (data) => {
        if (data.status === true) {
          this.productEdit = data.data;
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

  onFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.productEdit.img = reader.result;
    };
  }

  sizeChange(e) {
    this.selectSize = e.target.value;
  }

  filterChange(e) {
    this.filter = e.target.value;
    if (this.filter === 'all') {
      this.getProduct();
    } else if (this.filter === 'men' || this.filter === 'women') {
      var _n = new Set(
        this.products.filter((item) => item.gender.name === this.filter)
      );
      this._products = _n;
    } else {
      var _n = new Set(
        this.products.filter((item) => item.type.name === this.filter)
      );
      this._products = _n;
    }
  }

  getQuantity() {
    return this.productEdit['size'][this.selectSize];
  }

  search() {
    var _n = new Set(
      this.products.filter(
        (item) =>
          item.name.toLowerCase().search(this.searchText.toLowerCase()) !== -1
      )
    );
    this._products = _n;
    if (this._products.size === 0) {
      this.productsIsNull = true;
    } else {
      this.productsIsNull = false;
    }
  }

  decProduct() {
    this.productService.getProduct(this.product_id).subscribe(
      (data) => {
        if (data.status === true) {
          if (data.data.type.name === 'accessories') {
            if ((data.data.quantity - Number(this.quantity)) < 0) {
              this.Toast.fire({
                icon: 'error',
                title: 'There are not enough products in stock.',
              });
            } else {
              const _data = {
                size: this.selectSize,
                quantity: Number(this.quantity),
                type: this.productEdit.type.name,
              };
              this.productService
                .decProduct(this.productEdit._id, _data, this.token)
                .subscribe(
                  (data) => {
                    if (data.status === true) {
                      this.getProduct();
                      this.Toast.fire({
                        icon: 'success',
                        title: 'The product has already been reduced in stock.',
                      });
                      this.productService.getProduct(this.product_id).subscribe(
                        (data) => {
                          if (data.status === true) {
                            this.productEdit = data.data;
                            this.quantity = 0;
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
                  },
                  (err) => {
                    if (err.error.status === 401) {
                      localStorage.removeItem('user');
                      this.router.navigateByUrl('/login');
                    }else{
                      this.Toast.fire({
                        icon: 'error',
                        title: 'Cannot reduce the product in stock.',
                      });
                    }
                  }
                );
            }
          } else {
            if (
              data.data['size'][this.selectSize] - Number(this.quantity) < 0
            ) {
              this.Toast.fire({
                icon: 'error',
                title: 'There are not enough products in stock.',
              });
            } else {
              const _data = {
                size: this.selectSize,
                quantity: Number(this.quantity),
                type: this.productEdit.type.name,
              };
              this.productService
                .decProduct(this.productEdit._id, _data, this.token)
                .subscribe(
                  (data) => {
                    if (data.status === true) {
                      this.getProduct();
                      this.Toast.fire({
                        icon: 'success',
                        title: 'The product has already been reduced in stock.',
                      });
                      this.productService.getProduct(this.product_id).subscribe(
                        (data) => {
                          if (data.status === true) {
                            this.productEdit = data.data;
                            this.quantity = 0;
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
                  },
                  (err) => {
                    if (err.error.status === 401) {
                      localStorage.removeItem('user');
                      this.router.navigateByUrl('/login');
                    }this.Toast.fire({
                      icon: 'error',
                      title: 'Cannot reduce the product in stock.',
                    });
                  }
                );
            }
          }
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

  incProduct() {
    this.productService.getProduct(this.product_id).subscribe(
      (data) => {
        if (data.status === true) {
          const _data = {
            size: this.selectSize,
            quantity: Number(this.quantity),
            type: this.productEdit.type.name,
          };
          this.productService
            .incProduct(this.productEdit._id, _data, this.token)
            .subscribe(
              (data) => {
                if (data.status === true) {
                  this.getProduct();
                  this.Toast.fire({
                    icon: 'success',
                    title: 'The product has already been added in stock.',
                  });
                  this.productService.getProduct(this.product_id).subscribe(
                    (data) => {
                      if (data.status === true) {
                        this.productEdit = data.data;
                        this.quantity = 0;
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
              },
              (err) => {
                if (err.error.status === 401) {
                  localStorage.removeItem('user');
                  this.router.navigateByUrl('/login');
                }else{
                  this.Toast.fire({
                    icon: 'error',
                    title: 'Cannot add the product in stock.',
                  });
                }
              }
            );
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

  save() {
    const data = {
      name: this.productEdit.name,
      price: this.productEdit.price,
      detail: this.productEdit.detail,
      img: this.productEdit.img,
    };
    this.productService
      .updateProduct(this.product_id, data, this.token)
      .subscribe(
        (data) => {
          if (data.status === true) {
            this.Toast.fire({
              icon: 'success',
              title: 'Update product successfully.',
            });
            this.getProduct();
            this.isEdit = false;
          }
        },
        (err) => {
          if (err.error.status === 401) {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
          }else{
            this.Toast.fire({
              icon: 'error',
              title: 'Cannot update product.',
            });
          }
        }
      );
  }

  back() {
    this.isEdit = false;
  }
}
