import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent {

constructor(private dialogRef: MatDialogRef<AddBookDialogComponent>, private fb: FormBuilder, private apiService: ApiService, private toastr: ToastrService){}

  book : Book = new Book();
  bookForm = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    authors: ['', Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required],
    published: [null, Validators.required],
    pages: [null, Validators.required]
  });


  closeDialog(): void {
    this.dialogRef.close();
  }

  submit() {
    if(this.bookForm.valid)
    {
      const book = {...this.bookForm.value, id: 0} as Book;
      this.apiService.addBook(book).subscribe(
        (response) => {
        this.toastr.success('Book was added', 'Successfuly added!');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error, 'Error adding your book');
      }
      );
      
    }
  }
}
