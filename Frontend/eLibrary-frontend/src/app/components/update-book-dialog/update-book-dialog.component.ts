import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.css']
})
export class UpdateBookDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public book: Book, private dialogRef: MatDialogRef<UpdateBookDialogComponent>, private fb: FormBuilder, private apiService: ApiService, private toastr: ToastrService){}
  
  bookForm = this.fb.group({
        title: [this.book.title, Validators.required],
        subtitle: [this.book.subtitle],
        authors: [this.book.authors, Validators.required],
        genre: [this.book.genre, Validators.required],
        description: [this.book.description, Validators.required],
        published: [this.book.published, Validators.required],
        pages: [this.book.pages, Validators.required]
      });

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit() {
    if(this.bookForm.valid)
    {
      const book = {...this.bookForm.value, id: this.book.id} as Book;
      this.apiService.updateBook(book).subscribe((response) => {
          this.toastr.success('Book was updated', 'Successfuly updated!');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error(error, 'Error updating book');
      });
    }
  }
}
