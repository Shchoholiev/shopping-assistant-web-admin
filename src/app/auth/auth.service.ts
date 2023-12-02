import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../network/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalUser } from './global-user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private globalUserSubject = new BehaviorSubject<GlobalUser|null>(null);
  globalUser$ = this.globalUserSubject.asObservable();

  constructor(private apiService: ApiService, private jwtHelper: JwtHelperService, private router: Router) { }

  login(email: string, phone: string, password: string): Observable<any> {
    const query = `
      mutation Login($login: AccessUserModelInput!) {
        login(login: $login) {
          refreshToken
          accessToken
        }
      }
    `;
    const variables = {
      login: {
        email: email,
        phone: phone,
        password: password
      }
    };
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const tokens = response.data.login;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        this.setGlobalUserFromToken(tokens.accessToken);

        return true;
      }));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
    this.globalUserSubject.next(null);
  }

  refreshTokens(): Observable<any> {
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken = localStorage.getItem('refreshToken');

    const query = `
      mutation RefreshAccessToken($model: TokensModelInput!) {
        refreshAccessToken(model: $model) {
          accessToken
          refreshToken
        }
      }
    `;
    const variables = {
      "model": {
        "accessToken": accessToken,
        "refreshToken": refreshToken
      }
    };
    return this.apiService.query(query, variables)
      .pipe(map(response => {
        const tokens = response.data.refreshUserToken;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        this.setGlobalUserFromToken(tokens.accessToken);

        return tokens;
      }));
  }

  isLoggedIn(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return of(false);
    }

    const tokenPayload = this.jwtHelper.decodeToken(accessToken);
    const tokenExpiration = tokenPayload.exp * 1000;
    const now = new Date();
    const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    
    if (tokenExpiration < utcNow) {
      return this.refreshTokens().pipe(map(tokens => {
        console.log('Refreshed tokens.');
        return true;
      }), catchError(error => {
        console.error('Failed to refresh tokens.');
        this.logout();
        return of(false);
      }));
    } else {
      this.setGlobalUserFromToken(accessToken);

      return of(true);
    }
  }

  private setGlobalUserFromToken(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    const globalUser = new GlobalUser();
    globalUser.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    globalUser.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    globalUser.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    globalUser.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    if (!globalUser.roles.includes('Admin')) {
      this.logout();
      throw new Error('User is not an admin.');
    }
    
    this.globalUserSubject.next(globalUser);
  }

  hasRole(role: string): boolean {
    const globalUser = this.globalUserSubject.value;
    return globalUser !== null && globalUser.roles.includes(role);
  }
}