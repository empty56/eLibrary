import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../account';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    hide = true;
    errorTriggered : boolean = false;
    emailExistsError : boolean = false;
    usernameExistsError : boolean = false;
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    usernameFormControl = new FormControl('', [Validators.required]);
    firstnameFormControl = new FormControl('', [Validators.required]);
    lastnameFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();
    account : Account = new Account();
    constructor(private accountService: AccountService, private router: Router){}

  async onSubmit(){
    if (this.emailFormControl.hasError('required') || this.emailFormControl.hasError('email')) {
      this.errorTriggered = true;
    }
    else if (this.usernameFormControl.hasError('required')) {
      this.errorTriggered = true;
    }
    else if (this.firstnameFormControl.hasError('required')) {
      this.errorTriggered = true;
    }
    else if (this.lastnameFormControl.hasError('required')) {
      this.errorTriggered = true;
    }
    else if (this.passwordFormControl.hasError('required')) {
      this.errorTriggered = true;
    }
    else if(!this.emailFormControl.hasError('required') && !this.emailFormControl.hasError('email') && await this.accountService.emailExists(this.emailFormControl.value))
    {
      this.emailExistsError = true;
    }
    else if(!this.usernameFormControl.hasError('required') && await this.accountService.usernameExists(this.usernameFormControl.value))
    {
      this.usernameExistsError = true;
    }
    else{
      this.account.email = this.emailFormControl.value;
      this.account.username = this.usernameFormControl.value;
      this.account.password = this.passwordFormControl.value;
      this.account.firstname = this.firstnameFormControl.value;
      this.account.lastname = this.lastnameFormControl.value;
      this.accountService
      .registerAccount(this.account)
      .subscribe((response) => {
        this.router.navigate(['/login']);  
      });
    }
  }
  onTogglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
