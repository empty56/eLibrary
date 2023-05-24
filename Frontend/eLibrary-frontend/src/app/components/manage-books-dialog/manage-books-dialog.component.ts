import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/entities/book';
import { ApiService } from 'src/app/services/api.service';
import { UpdateBookDialogComponent } from '../update-book-dialog/update-book-dialog.component';
import { UploadBookFilesDialogComponent } from '../upload-book-files-dialog/upload-book-files-dialog.component';

@Component({
  selector: 'app-manage-books-dialog',
  templateUrl: './manage-books-dialog.component.html',
  styleUrls: ['./manage-books-dialog.component.css']
})
export class ManageBooksDialogComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  books: Book[];
  dataSource;
  trunc = 15;
  displayedColumns: string[] = ['id', 'title', 'subtitle','authors', 'genre', 'action','published', 'pages']
  constructor(private dialog: MatDialog, 
    private apiService: ApiService, 
    private _liveAnnouncer: LiveAnnouncer, 
    private dialogRef: MatDialogRef<ManageBooksDialogComponent>, 
    private toastr: ToastrService){}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error retrieving user list:', error);
      }
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteBook(book: Book){
    this.apiService.deleteBook(book.id).subscribe(
      (response) => {
        console.log(response);
        this.loadBooks();
        this.toastr.success('Book was deleted', 'Successfuly deleted');
      },
      (error) => {
        console.error('Error deleting review status:', error);
      }
    );
  }
  updateBook(book: Book){
    this.dialogRef.close();
    this.dialog.open(UpdateBookDialogComponent, {data: book});
  }
  uploadBookFiles(book: Book){
    this.dialogRef.close();
    this.dialog.open(UploadBookFilesDialogComponent, {data: book});
  }
}
