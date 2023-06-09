import { inject } from "@angular/core";
import { Router } from "@angular/router"
import { filter, firstValueFrom, map } from "rxjs";
import { CurrentUserService } from "../services/current-user.service";
import { AuthService } from "../services/auth.service";

export const authGuard = () => {
    const currentUserService = inject(CurrentUserService);
    const router = inject(Router);
    return currentUserService.currentUser$.pipe(
        filter((currentUser) => !!currentUser),
        map((currentUser) => {
          if (!currentUser || currentUser.role != 'ADMIN') {
            router.navigateByUrl('/');
            return false;
          }
          return true;
        })
    );
}

export const isLoggedIn = () => {
  const auth = inject(AuthService);
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);
  
  return auth.isLoggedIn$.pipe(
    filter((isLoggedIn) => isLoggedIn !== undefined),
        map((isLoggedIn) => {
          if (isLoggedIn) {
            currentUserService.currentUser$.subscribe((value) => {
              if(!value)
              {
                return true;
              }
              if(value.role === 'ADMIN')
              {
                router.navigateByUrl('/admin');
                return false;
              }
              else if(value.role === 'USER')
              {
                router.navigateByUrl('/');
                return false;
              }
              return true;
            }
            );
          }
        })
  );
}