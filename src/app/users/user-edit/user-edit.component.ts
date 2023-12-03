import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { Role } from 'src/app/shared/role.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user: User = new User();

  public availableRoles: Role[] = [];

  public selectedRole: Role = new Role();

  public updateError: string = '';

  public updateSuccess: string = '';

  constructor(private usersService: UsersService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      this.usersService.getUser(userId).subscribe(user => {
        this.user = user;
      });
      this.usersService.getRolesPage(1, 10).subscribe(roles => {
        this.availableRoles = roles;
      });
    });
  }

  public submitForm(){
    console.log(this.user);
    
    this.usersService.updateUser(this.user.id, this.user).subscribe({
      next: (user) =>{
        this.user = user;
        this.updateSuccess = 'Successful update';
        this.updateError = '';
      },
      error: (error) => {
        console.log(error);
        
        this.updateError = 'Something went wrong, try again';
        this.updateSuccess = '';
      }
    })};

    public addRole() {
      if (this.selectedRole && this.selectedRole != null && !this.user.roles.includes(this.selectedRole)) {
        this.user.roles.push(this.selectedRole);
        this.selectedRole = new Role(); 
      }
      
    }
  
    public removeRole(role: Role) { 
      const index = this.user.roles.indexOf(role);
      if (index !== -1) {
        this.user.roles.splice(index, 1);
      }
    }
}
