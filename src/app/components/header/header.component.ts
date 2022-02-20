import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userAuth!: Observable<User | null>
  constructor(private userService: UserService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userAuth = this.authService.getUserAuth()
  }

}
