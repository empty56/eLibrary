import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/entities/account';
import { ApiService } from 'src/app/services/api.service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>, 
    private currentUserService: CurrentUserService,  
    private apiService: ApiService,
    private toastr: ToastrService){}
  
  currentUser: Account;
  nameDisabledState: boolean;

  ngOnInit(){
    this.currentUserService.currentUser$.subscribe((data)=>{
      this.currentUser = data;
      this.firstnameFormControl.setValue(data.firstname);
      this.lastnameFormControl.setValue(data.lastname);
    })
  }

  ngOnDestroy(){
    window.location.reload();
  }

  nameFieldsStatus:boolean = false;
  passFieldsStatus:boolean = false;
  firstnameFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  lastnameFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  passwordFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  repeatPasswordFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  changeNameBoolean(){
    if(this.nameFieldsStatus)
    {
      this.firstnameFormControl.disable();
      this.lastnameFormControl.disable();
    }
    else{
      this.firstnameFormControl.enable();
      this.lastnameFormControl.enable();
    }
    this.nameFieldsStatus = !this.nameFieldsStatus;
  }

  updateFullname(){
    if(this.firstnameFormControl.valid && this.lastnameFormControl.valid)
    {
      let updatedAccount = new Account();
      updatedAccount.id = this.currentUser.id;
      updatedAccount.firstname = this.firstnameFormControl.value;
      updatedAccount.lastname = this.lastnameFormControl.value;
      this.apiService.updateAccountFullname(updatedAccount).subscribe((response: Account)=>{
        this.currentUser = response;
        this.firstnameFormControl.setValue(response.firstname);
        this.lastnameFormControl.setValue(response.lastname);
        this.changeNameBoolean();
      });
    }
  }

  changePassBoolean(){
    if(this.passFieldsStatus)
    {
      this.passwordFormControl.disable();
      this.repeatPasswordFormControl.disable();
    }
    else{
      this.passwordFormControl.enable();
      this.repeatPasswordFormControl.enable();
    }
    this.passFieldsStatus = !this.passFieldsStatus;
  }

  updatePassword(){
    if(this.passwordFormControl.valid && this.repeatPasswordFormControl.valid)
    {
      if(this.passwordFormControl.value === this.repeatPasswordFormControl.value)
      this.apiService.updatePassword(this.currentUser.id, this.passwordFormControl.value).subscribe((response: Account)=>{
        this.toastr.success('Your password was updated', 'Successfuly updated!');
        this.passwordFormControl.setValue('');
        this.repeatPasswordFormControl.setValue('');
        this.changePassBoolean();
      },
      (error) => {
        this.toastr.error(error, 'Error updating your password');
      });
      else{
        this.toastr.error('Password and repeated password are not the same!');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
