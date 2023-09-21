import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$: Observable<User | null> = this.userService.user$;
  isLoading$ = this.userService.isLoading$;
  constructor(private userService: UserService, private router: Router) { }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }
}
