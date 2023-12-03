import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{
  public users: User[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private usersService: UsersService, private router: Router){}

  ngOnInit(): void {
    this.setPage(this.currentPage);
  }

  public setPage(pageNumber: number): void {
    this.usersService.getUsersPage(pageNumber, 10).subscribe(users => {
      this.users = users.items;
      this.totalPages = users.totalPages;
      this.currentPage = users.pageNumber;
    });
  }

  public getUserRoles(user: User): string {
    if (user.roles && user.roles.length > 0) {
      return user.roles.map(role => role.name).join(', ');
    } else {
      return '';
    }
  }

  public editUser(user: User){
    this.router.navigate(['/edit-user', user.id]);
  }
}
