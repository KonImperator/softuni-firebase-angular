import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const loginRequired: boolean = route.data.loginRequired;

  return userService.user$.pipe(
    // mapping result to boolean
    map((user) => {
      // if route requires authentication
      if (loginRequired) {
        if (user) {
          return true;
          // authenticated user can activate
        }
        router.navigate(['user', 'login']);
        return false;
        // unauthenticated user cannot activate and gets redirected
      }

      // else if route requires the user to not be autheticated
      if (!user) {
        return true;
        // guest can activate
      }
      router.navigate(['/']);
      return false;
      // otherwise send logged in user to homepage
    })
  );
};
