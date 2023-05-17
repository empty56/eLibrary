import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError : boolean = false;
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe((response) => {
        if(response.role == "USER")
        {
          this.router.navigate(['/library']);
        }
        else if(response.role == "ADMIN")
        {
          this.router.navigate(['/admin']);
        }
        
      },
      (error) => {
        this.loginError = true;
      });
  }
}
