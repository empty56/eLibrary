import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';
import { UpdateLinkDialogComponent } from '../update-link-dialog/update-link-dialog.component';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-book-files-dialog',
  templateUrl: './upload-book-files-dialog.component.html',
  styleUrls: ['./upload-book-files-dialog.component.css']
})
export class UploadBookFilesDialogComponent {

  selectedBook?: FileList;
  selectedAudio?: FileList;
  selectedPhoto?: FileList;
  currentFile?: File[];
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public book: Book, private dialogRef: MatDialogRef<UpdateLinkDialogComponent>, private apiService: ApiService, private toastr: ToastrService) { }

  selectBook(event: any): void {
    this.selectedBook = event.target.files;
  }
  selectAudio(event: any): void {
    this.selectedAudio = event.target.files;
  }
  selectPhoto(event: any): void {
    this.selectedPhoto = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedBook && this.selectedAudio && this.selectedPhoto) {
      const files: File[] | null = [this.selectedBook.item(0), this.selectedAudio.item(0), this.selectedPhoto.item(0)];

      if (files) {
        this.currentFile = files;
        const formData: FormData = new FormData();
        formData.append('files', files[0]);
        formData.append('files', files[1]);
        formData.append('files', files[2]);
        console.log(formData.getAll('files'));
        this.apiService.uploadBook(this.book.id, formData).subscribe(
          (response) => {
            this.toastr.success('Link was updated', 'Successfuly updated');
            this.dialogRef.close();
          },
          (err) => {
            this.toastr.error('Error uploading files', 'Upload failed');
          }
        );
      }
    }
  }
}
