import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/entities/review';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-review-dialog',
  templateUrl: './update-review-dialog.component.html',
  styleUrls: ['./update-review-dialog.component.css']
})
export class UpdateReviewDialogComponent {

  rating: number = this.review.rating;
  starCount: number = 5;

  ratingArr = [];

  constructor(@Inject(MAT_DIALOG_DATA) public review: Review, 
  private dialogRef: MatDialogRef<UpdateReviewDialogComponent>, 
  private apiService: ApiService, 
  private toastr: ToastrService){}
  
  ngOnInit(){
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  reviewFormControl = new FormControl(this.review.review);

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

  onRatingChanged(rating){
    this.rating = rating;
  }

  submit() {
    if(this.reviewFormControl.valid)
    {
      const updatedReview = new Review();
      updatedReview.id = this.review.id;
      updatedReview.rating = this.rating;
      updatedReview.review = this.reviewFormControl.value;
      this.apiService.updateReview(updatedReview).subscribe( (response) => {
        this.toastr.success('Your review was updated', 'Successfuly updated!');
        window.location.reload();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error, 'Error updating your review');
      });
    }
  }
}
