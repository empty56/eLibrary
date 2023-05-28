import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/entities/account';
import { Book } from 'src/app/entities/book';
import { Review } from 'src/app/entities/review';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent {
  rating: number = this.data.rating;
  starCount: number = 5;
  ratingArr = [];
  errorState = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {rating: number, currentUser: Account, book: Book}, 
  private dialogRef: MatDialogRef<AddReviewDialogComponent>, 
  private apiService: ApiService, 
  private toastr: ToastrService){}
  
  ngOnInit(){
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  reviewFormControl = new FormControl('');

  closeDialog(): void {
    this.dialogRef.close();
  }

  onClick(rating: number) {
    this.onRatingChanged(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onRatingChanged(rating: number){
    this.rating = rating;
  }

  submit() {
    console.log(this.rating);
    if(this.reviewFormControl.valid && this.rating != 0)
    {
      const newReview = new Review();
      newReview.rating = this.rating;
      newReview.review = this.reviewFormControl.value;
  
      this.apiService.addReview(this.data.currentUser.id,this.data.book.id, newReview).subscribe( (response) => {
        this.toastr.success('Your review was updated', 'Successfuly updated!');
        window.location.reload();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error, 'Error updating your review');
      });
      this.errorState = false;
    }
    else{
      this.errorState = true;
    }
  }
}
