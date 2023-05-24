import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Link } from 'src/app/entities/link';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-link-dialog',
  templateUrl: './update-link-dialog.component.html',
  styleUrls: ['./update-link-dialog.component.css']
})
export class UpdateLinkDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public link: Link, private dialogRef: MatDialogRef<UpdateLinkDialogComponent>, private fb: FormBuilder, private apiService: ApiService, private toastr: ToastrService){}

  linkForm = this.fb.group({
    pdf_key: [this.link.pdf_key, Validators.required],
    audio_key: [this.link.audio_key, Validators.required],
    thumbnail_key: [this.link.thumbnail_key, Validators.required],
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit() {
    if(this.linkForm.valid)
    {
      const link = {...this.linkForm.value, id: this.link.id} as Link;
      this.apiService.updateLink(link).subscribe(
        () => {
        this.toastr.success('Link was updated', 'Successfuly updated');
        this.dialogRef.close();
      }
      );
    }
  }

}
