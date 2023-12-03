import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  public getUsersPage(pageNumber: number, pageSize: number){
    const query = `
    query UsersPage($pageNumber: Int!, $pageSize: Int!) {
      usersPage(pageNumber: $pageNumber, pageSize: $pageSize) {
        pageNumber,
        totalPages,
        items {
          roles {
            id
            name
          }
          phone
          id
          email
        }
      }
    }`;

    const variables = {
      "pageNumber": pageNumber,
      "pageSize": pageSize
    };

    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const users = response.data.usersPage;
        return users;
      }
    ));
  }

  public getUser(userId: string | null){
    const query = `
    query User($userId: String!) {
      user(id: $userId) {
        email
        id
        phone
        roles {
          id
          name
        }
      }
    }`;

    const variables = {
      "userId": userId
    };

    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const user = response.data.user;
        return user;
      }
    ));
  }

  public updateUser(updateUserByAdminId: string, userDto: User){
    const query = `
    mutation UpdateUserByAdmin($updateUserByAdminId: String!, $userDto: UserDtoInput!) {
      updateUserByAdmin(id: $updateUserByAdminId, userDto: $userDto) {
        roles {
          id
          name
        }
        email
        id
        phone
      }
    }`;

    const variables = {  
      "updateUserByAdminId": updateUserByAdminId,
      "userDto": userDto
  }
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const user = response.data.updateUserByAdmin;
        return user;
      }
    ));
  }

  public getRolesPage(pageNumber: number, pageSize: number){
    const query = `
    query RolesPage($pageNumber: Int!, $pageSize: Int!) {
      rolesPage(pageNumber: $pageNumber, pageSize: $pageSize) {
        items {
          name
          id
        }
      }
    }`;

    const variables = { 
      "pageNumber": pageNumber,
      "pageSize": pageSize
  }
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const roles = response.data.rolesPage.items;
        return roles;
      }
    ));
  }
}
