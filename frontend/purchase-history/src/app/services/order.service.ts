import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: any;

  constructor(private http: HttpClient) {}

  getOrder(id, token) {
    return this.http
      .get<any>('http://localhost:8080/api/order/get/user/' + id ,{
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            console.log(data)
            this.order = data;
          }
          return this.order;
        })
      );
  }
}
