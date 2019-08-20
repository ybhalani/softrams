import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guard/auth.guard';

// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'member',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MemberDetailsComponent },
      { path: ':id', component: MemberDetailsComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [AppComponent, BannerComponent, MemberDetailsComponent, MembersComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService, HttpClient, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
