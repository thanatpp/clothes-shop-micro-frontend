import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  userAddress: any

  constructor(private http: HttpClient) {}

  getUserAddress(user, token){
    return this.http
      .get<any>('http://localhost:8080/api/address/get/user/' + user, {
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
}
