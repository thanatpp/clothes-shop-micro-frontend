import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'addProduct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  img: any;
  gender: String = 'men';
  type: String = 'tops';
  name: String;
  price: String;
  detail: String;
  quantity: String;
  xxs: String;
  xs: String;
  s: String;
  m: String;
  l: String;
  xl: String;
  _id: String;
  token: String;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.getUser();
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

  onFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.img = reader.result;
    };
  }

  genderChange(e) {
    this.gender = e.target.value;
  }

  typeChange(e) {
    this.type = e.target.value;
  }

  save() {
    const data = {
      name: this.name,
      price: Number(this.price),
      detail: this.detail,
      type: this.type,
      img: this.img,
      gender: this.gender,
      quantity: Number(this.quantity || 0),
      size: {
        xxs: Number(this.xxs || 0),
        xs: Number(this.xs || 0),
        s: Number(this.s || 0),
        m: Number(this.m || 0),
        l: Number(this.l || 0),
        xl: Number(this.xl || 0),
      },
    };
    this.productService.addProduct(data, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.img = undefined
          this.gender = "men"
          this.type = "tops"
          this.name = ""
          this.quantity =""
          this.detail = ""
          this.xxs = ""
          this.xs = ""
          this.s = ""
          this.m = ""
          this.l = ""
          this.xl = ""
          this.price = ""
          this.Toast.fire({
            icon: 'success',
            title: 'Add product successfully..',
          });
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Cannot add product.',
          });
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Cannot add product.',
          });
        }
      });
  }

  back() {
    this.router.navigateByUrl('/admin/product');
  }
}
