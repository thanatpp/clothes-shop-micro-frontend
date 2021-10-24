import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  getOrder(token) {
    return this.http
      .get<any>('http://localhost:8080/api/order/get', {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          console.log(data.data)
          return data;
        })
      );
  }

}
