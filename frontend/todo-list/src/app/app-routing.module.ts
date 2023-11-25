import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StartComponent } from './start/start.component';
import { authGuard } from './guard/auth.guard';
import { startGuard } from './guard/start.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [startGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
    canActivate: [startGuard],
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./content/content.module').then((m) => m.ContentModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    component: StartComponent,
    title: 'Start',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
