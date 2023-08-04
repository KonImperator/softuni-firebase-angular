import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  user$: Observable<User | null> = this.userService.user$;
  isLoading$ = this.userService.isLoading$;

  onLogout() {
    this.userService.logout();
  }
}
