import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  userAuth!: Observable<User | null>
  constructor(private userService: UserService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userAuth = this.authService.getUserAuth()
  }

  logout(){
    this.userService.logout()
  }

}
