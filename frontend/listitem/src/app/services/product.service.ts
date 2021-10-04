import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  products: any;

  constructor(private http: HttpClient) {}

  getProduct(gender, type) {
    if (type == 'all') {
      return this.http
        .get<any>('http://localhost:8080/api/product/get/gender/' + gender)
        .pipe(
          map((data) => {
            if (data) {
              this.products = data;
            }
            return this.products;
          })
        );
    } else {
      return this.http
        .get<any>(
          'http://localhost:8080/api/product/get/gender/' +
            gender +
            '/type/' +
            type
        )
        .pipe(
          map((data) => {
            if (data) {
              this.products = data;
            }
            return this.products;
          })
        );
    }
  }
}
