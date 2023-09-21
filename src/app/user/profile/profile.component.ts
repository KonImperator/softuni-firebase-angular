import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  user$: Observable<User | null> = this.userService.user$
}
