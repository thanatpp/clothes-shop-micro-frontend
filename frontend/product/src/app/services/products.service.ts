import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  product: any;

  constructor(private http: HttpClient) {}

  getProduct(product_id) {
    return this.http
      .get<any>('http://localhost:8080/api/product/get/id/' + product_id)
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
