import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createAccount(data: any) {
    return this.http
      .post<any>('http://localhost:8080/api/user/add', data)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

}
