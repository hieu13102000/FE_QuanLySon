import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuth = new BehaviorSubject<null| User>(null)
  

  getUserAuth(): Observable<User | null>{
    return this.userAuth.asObservable()
  }
  setUserAuth(user: User | null): void{
    this.userAuth.next(user)
    this.saveUserToLocalStorage()
  }
  getAuth(){
    return this.userAuth.value
  }

  saveUserToLocalStorage(){
    if(this.userAuth.value){
      localStorage.setItem('currentUser', JSON.stringify(this.userAuth.value))
    }else{
      localStorage.removeItem('currentUser')
    }
  }


  constructor() { 
    const userAsString =  localStorage.getItem('currentUser')
    if(userAsString){
      const mapToUser = JSON.parse(userAsString) as User
      this.setUserAuth(mapToUser)
    }
  }
}
