import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

public isAuth: boolean;

private isAuthSub: Subscription;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
        this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
  }


  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}
