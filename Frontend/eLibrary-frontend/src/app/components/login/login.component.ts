import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginError : boolean = false;

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  constructor(private authService: AuthService, private router: Router, private currentUserService:CurrentUserService) {}

  submitForm() {
    if (this.form.invalid) {
      this.loginError = true;
      return;
    }

    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe( async (response) => {
        const role = response.role;
        if(role == "USER")
        {
          this.router.navigate(['/library']);
        }
        else if(role == "ADMIN")
        {
          this.router.navigate(['/admin']);
        }
      },
      (error) => {
        this.loginError = true;
      });
      
  }
  onTogglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
