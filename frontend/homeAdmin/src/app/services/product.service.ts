import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any;
  product: any;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>('http://localhost:8080/api/product/get/all').pipe(
      map((data) => {
        if (data) {
          this.products = data;
        }
        return this.products;
      })
    );
  }

  updateProduct(id, data, token) {
    return this.http
      .put<any>('http://localhost:8080/api/product/update/id/' + id, data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteProduct(id, token){
    return this.http
      .delete<any>('http://localhost:8080/api/product/delete/id/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );

  }

  decProduct(id, data, token) {
    return this.http
      .put<any>('http://localhost:8080/api/product/update/dec/' + id, data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  incProduct(id, data, token) {
    return this.http
      .put<any>('http://localhost:8080/api/product/update/inc/' + id, data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getProduct(id) {
    return this.http
      .get<any>('http://localhost:8080/api/product/get/id/' + id)
      .pipe(
        map((data) => {
          if (data) {
            this.product = data;
          }
          return this.product;
        })
      );
  }
}
