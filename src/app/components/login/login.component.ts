import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmit(email: string, password: string){
    this.userService.login(email, password).then(isLoggin =>{
      if(!isLoggin){
        alert('Sai mật khẩu hoặc bạn không có quyền truy cập')
      }else{
        this.router.navigate(['/'])
      }
    });
  }

}
