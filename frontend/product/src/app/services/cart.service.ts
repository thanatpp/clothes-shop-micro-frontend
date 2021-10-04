import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addCart(product_id, _id, token, size, quantity){
    let data = {
      product: product_id,
      user: _id,
      size: size,
      quantity: quantity
    }
    return this.http
      .post<any>('http://localhost:8080/api/cart/add', data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
