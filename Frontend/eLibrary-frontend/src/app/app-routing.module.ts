import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { authGuard, isLoggedIn } from './auth.guard';


const routes: Routes = [
  {path: 'signup', component: SignUpComponent, canActivate: [isLoggedIn]},
  {path: '', redirectTo:'library', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [isLoggedIn]},
  {path: 'library', component:MainPageComponent},
  {path: 'admin', component: AdminMainPageComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
