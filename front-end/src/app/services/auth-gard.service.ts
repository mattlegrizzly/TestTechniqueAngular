import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private auth: AuthService) { }



canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if(auth) {
              observer.next(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
            }
      }
      );

    }
    );
  }
}
