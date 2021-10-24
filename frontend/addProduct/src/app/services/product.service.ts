import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  addProduct(data, token) {
    return this.http
      .post<any>('http://localhost:8080/api/product/add', data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
