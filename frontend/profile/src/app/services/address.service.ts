import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  address: any;
  userAddress: any;

  constructor(private http: HttpClient) {}

  getAddress(zipcode) {
    return this.http
      .get<any>('http://localhost:8080/api/address/get/zipcode/' + zipcode)
      .pipe(
        map((data) => {
          if (data) {
            this.address = data;
          }
          return this.address;
        })
      );
  }

  deleteUserAddress(id, token) {
    return this.http
      .delete<any>('http://localhost:8080/api/address/delete/id/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getUserAddress(id, token) {
    return this.http
      .get<any>('http://localhost:8080/api/address/get/user/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            this.userAddress = data;
          }
          return this.userAddress;
        })
      );
  }

  addUserAddress(data, token){
    return this.http
      .post<any>('http://localhost:8080/api/address/add', data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data
        })
      );
  }
}
