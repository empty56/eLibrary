import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import { authGuard, isLoggedIn } from './helpers/auth.guard';


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
