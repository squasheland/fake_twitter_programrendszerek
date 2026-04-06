import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./component/feed/feed.component').then((m) => m.FeedComponent),
      },
      {
        path: 'profile/:username',
        loadComponent: () =>
          import('./component/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
