import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUser?: User;
  currentIndex = -1;
  username = '';
  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [6, 3, 9];
  p: any;
  valueChange = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`name`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrieveUsers(): void {
    const params = this.getRequestParams(this.username, this.page, this.pageSize);

    this.userService.getAll()
    .subscribe((users: any) =>{
      this.users = users
    },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }
  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
  Search() {
    if(this.username ==""){
      this.ngOnInit();
    }else{
      this.users = this.users.filter(res =>{
        return res.username?.toLocaleLowerCase().match(this.username.toLocaleLowerCase());
      });
    }
  }
key ='id'
reverse: boolean =false;
sort(key: string){
  this.key = key;
  this.reverse = !this.reverse;
}
}
