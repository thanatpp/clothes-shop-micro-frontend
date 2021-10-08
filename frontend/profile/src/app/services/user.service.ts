import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  user: any

  constructor(private http: HttpClient) {}

  getUser(id, token) {
    return this.http
      .get<any>('http://localhost:8080/api/user/get/id/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            this.user = data;
          }
          return this.user;
        })
      );
  }

  updateuser(id, data, token){
    return this.http
      .put<any>('http://localhost:8080/api/user/update/id/' + id, data, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data
        })
      );
  }

}
