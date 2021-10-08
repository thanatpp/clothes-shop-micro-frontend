import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'profile-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'profile';
  token: String = '';
  _id: String = '';
  isEditProfile: boolean = false;
  isAddAddress: boolean = false;
  isNoAddress: boolean = false;
  user: any;
  zipcode: String;
  rofile: any;
  userAddress: any;
  address: any;
  amphoe: any;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {}

  editProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    birthday: new FormControl('', [Validators.required]),
  });

  addAddressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    zipcode: new FormControl(''),
    addressDetails: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    amphoe: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
  });

  ngOnInit() {
    this.getUser();
    this.getDataUser();
    this.getUserAddress();
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

  getDataUser() {
    this.userService.getUser(this._id, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.user = data.data;
        } else {
          this.router.navigateByUrl('/login');
        }
      },
      (err) => {
        if (err.error.status === 401) {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        } else {
          console.log(err.errors.message);
        }
      }
    );
  }

  getUserAddress() {
    this.addressService.getUserAddress(this._id, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.userAddress = data.data;
        } else {
          this.isNoAddress = true;
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

  getAddress() {
    this.addressService.getAddress(this.addAddressForm.value.zipcode).subscribe(
      (data) => {
        if (data.status === true) {
          this.address = data.data;
          var _n = new Set(data.data.map((item) => item.amphoe));
          this.amphoe = _n;
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Zipcode not Found',
          });
        }
      },
      (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Zipcode not Found',
        });
      }
    );
  }

  deleteUserAddress(i) {
    this.addressService
      .deleteUserAddress(this.userAddress[i]._id, this.token)
      .subscribe(
        (data) => {
          if (data.status === true) {
            this.getUserAddress();
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Cannot delete Address',
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
              title: 'Cannot delete Address',
            });
          }
        }
      );
  }

  isNull(text) {
    if (text == '') {
      return '-';
    } else {
      return text;
    }
  }

  editProfile() {
    this.isEditProfile = true;
    this.cancelFormAddress();
  }

  saveChange() {
    const profile = {
      firstName:
        this.editProfileForm.get('firstName').value || this.user.firstName,
      lastName:
        this.editProfileForm.get('lastName').value || this.user.lastName,
      phoneNumber:
        this.editProfileForm.get('phoneNumber').value || this.user.phoneNumber,
      birthday:
        this.dateFormat(this.editProfileForm.get('birthday').value) ||
        this.user.birthday,
    };
    this.userService.updateuser(this._id, profile, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.getDataUser();
          this.isEditProfile = false;
          this.editProfileForm.reset();
        } else {
          console.log(data.message);
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

  dateFormat(date) {
    if (date) {
      const spl = date.split('-');
      const newDate = spl[2] + '-' + spl[1] + '-' + spl[0];
      return newDate;
    } else {
      return this.user.birthday;
    }
  }

  cancel() {
    this.isEditProfile = false;
    this.editProfileForm.reset();
  }

  openFormAddress() {
    this.isAddAddress = true;
    this.cancel();
  }

  cancelFormAddress() {
    this.addAddressForm.reset();
    this.isAddAddress = false;
  }

  addAddress() {
    const _address = this.address.findIndex(
      (item) =>
        item.amphoe === this.addAddressForm.value.amphoe &&
        item.district === this.addAddressForm.value.district
    );
    const data = {
      user: this._id,
      address: this.address[_address]._id,
      firstName: this.addAddressForm.value.firstName,
      lastName: this.addAddressForm.value.lastName,
      phoneNumber: this.addAddressForm.value.phoneNumber,
      detail: this.addAddressForm.value.addressDetails,
    };
    this.addressService.addUserAddress(data, this.token).subscribe(
      (data) => {
        if (data.status === true) {
          this.addAddressForm.reset();
          this.getUserAddress();
          this.isAddAddress = false;
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Cannot add Address',
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
            title: 'Cannot add Address',
          });
        }
      }
    );
  }
}
