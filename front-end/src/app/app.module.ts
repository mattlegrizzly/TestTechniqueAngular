import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MainpageComponent} from "./mainpage/mainpage.component";
import { ListviewComponent } from './mainpage/listview/listview.component';
import { ListFormComponent } from './mainpage/list-form/list-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from "./services/auth.service";
import {ListService} from "./services/list.service";
import {AuthGuardService} from "./services/auth-gard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Routes, RouterModule} from "@angular/router";

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'lists', component: MainpageComponent, canActivate: [AuthGuardService]},
  {path: 'lists/new', component: ListFormComponent, canActivate: [AuthGuardService]},
  {path: 'lists/view/:id', component: ListviewComponent, canActivate: [AuthGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'lists' },
  { path: '**', redirectTo: 'lists' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MainpageComponent,
    ListviewComponent,
    ListFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    ListService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
