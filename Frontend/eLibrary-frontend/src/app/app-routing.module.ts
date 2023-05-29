import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import { authGuard, isLoggedIn } from './helpers/auth.guard';
import { BookPageComponent } from './components/book-page/book-page.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';


const routes: Routes = [
  {path: 'signup', component: SignUpComponent, canActivate: [isLoggedIn]},
  {path: '', redirectTo:'library', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [isLoggedIn]},
  {path: 'library', component:MainPageComponent},
  {path: 'admin', component: AdminMainPageComponent, canActivate: [authGuard]},
  {path: 'library/book/:id', component: BookPageComponent},
  {path: 'library/myLibrary', component: MyLibraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
