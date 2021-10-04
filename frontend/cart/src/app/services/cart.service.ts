import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any;

  constructor(private http: HttpClient) {}

  getCart(user, token) {
    return this.http
      .get<any>('http://localhost:8080/api/cart/get/user/' + user, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            this.cart = data;
          }
          return this.cart;
        })
      );
  }

  deleteProductInCart(product, token) {
    return this.http
      .delete<any>('http://localhost:8080/api/cart/delete/' + product, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            return data;
          }
        })
      );
  }

  updateCart(id, token, quantity) {
    return this.http
      .put<any>(
        'http://localhost:8080/api/cart/update/' + id,
        { quantity: quantity },
        {
          headers: new HttpHeaders().set('Authorization', token),
        }
      )
      .pipe(
        map((data) => {
          if (data) {
            return data;
          }
        })
      );
  }
}
