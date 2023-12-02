import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalUser } from 'src/app/auth/global-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  globalUser: GlobalUser | null = null;

  constructor(private authService: AuthService) {
    this.authService.globalUser$.subscribe(globalUser => {
      this.globalUser = globalUser;
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }
}