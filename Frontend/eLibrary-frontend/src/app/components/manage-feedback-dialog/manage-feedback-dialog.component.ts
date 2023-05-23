import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/entities/review';
import { ApiService } from 'src/app/services/api.service';
import { UpdateBookDialogComponent } from '../update-book-dialog/update-book-dialog.component';

@Component({
  selector: 'app-manage-feedback-dialog',
  templateUrl: './manage-feedback-dialog.component.html',
  styleUrls: ['./manage-feedback-dialog.component.css']
})
export class ManageFeedbackDialogComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  reviews: Review[];
  dataSource;
  displayedColumns: string[] = ['id', 'rating', 'review','account', 'book', 'action']

  constructor(private apiService: ApiService, 
    private _liveAnnouncer: LiveAnnouncer, 
    private dialogRef: MatDialogRef<ManageFeedbackDialogComponent>, 
    private toastr: ToastrService){}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.apiService.getReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        this.dataSource = new MatTableDataSource<Review>(this.reviews);
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

  deleteReview(review: Review){

    this.apiService.deleteReview(review.id).subscribe(
      (response) => {
        console.log(response);
        this.loadReviews();
        this.toastr.success('Review was deleted', 'Successfuly deleted');
      },
      (error) => {
        console.error('Error deleting review status:', error);
      }
    );
  }
}
