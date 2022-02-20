import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  baseUrl = 'https://61455ce638339400175fc5b0.mockapi.io/auth';
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe();
  }
  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  seachProduct(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe()
  }

  login(username: string, password: string) {
    return new Promise<boolean>((reslove, reject) => {
      this.http.get<User[]>(this.baseUrl).pipe(
        map(user => user.filter((val: User) => {
          return val.email === username && val.password === password
        })),
        take(1)
      ).subscribe(users => {
        console.log(users)
        if (users.length > 0) {
          this.authService.setUserAuth(users[0])
          reslove(true)
        } else {
          this.authService.setUserAuth(null)
          reslove(false) 
        }
      })
    })

  }

  logout() {
    this.authService.setUserAuth(null);
  }
}
