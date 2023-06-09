import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/entities/account';
import { Book } from 'src/app/entities/book';
import { Review } from 'src/app/entities/review';
import { ApiService } from 'src/app/services/api.service';
import { UpdateReviewDialogComponent } from '../update-review-dialog/update-review-dialog.component';
import { ReplaySubject } from 'rxjs';
import { AddReviewDialogComponent } from 'src/app/components/add-review-dialog/add-review-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  
  @Input() book: Book;

constructor(private dialog: MatDialog, 
    private apiService: ApiService, 
    private toastr: ToastrService,
    private authService: AuthService,
    private currentUserService: CurrentUserService){}

  currentUser: Account;
  isLoggedIn: boolean;
  reviews: Review[];
  currentReview: Review;
  rating: number = 0;
  starCount: number = 5;
  ratingArr = [];
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  ngOnInit()
  {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.authService.isLoggedIn$.subscribe((data)=>{
      this.isLoggedIn = data;
      if(this.isLoggedIn)
      {
        this.currentUserService.currentUser$.subscribe((data)=>
        {
          this.currentUser = data;
        })
      }
      this.loadReviews(this.currentUser, this.book);
    })
  }

  onStarClick(rating: number) {
    this.dialog.open(AddReviewDialogComponent, {data: {rating :rating, currentUser: this.currentUser, book: this.book}});
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  loadReviews(currentUser: Account, book: Book){
    this.apiService.getReviewsByBook(book.id).subscribe((reviews)=>{
      if(this.isLoggedIn && reviews) {
        this.reviews = reviews.filter(r =>  r.account.id !== currentUser.id);
        this.currentReview = reviews.find(r => r.account.id === currentUser.id);
      }
      else {
        this.reviews = reviews;
        this.currentReview == null;
      }
    })
  }

  openUpdateReviewDialog(): void {
    this.dialog.open(UpdateReviewDialogComponent, {data: this.currentReview});
  }
  openAddReviewDialog(): void {
    this.dialog.open(AddReviewDialogComponent,{data: {rating: 0, currentUser: this.currentUser, book: this.book}});
  }
  editReview()
  {
    this.apiService.updateReview(this.currentReview).subscribe( (resposne) => {
      this.toastr.success('Your review was updated', 'Successfuly updated!');
    },
    (error) => {
      this.toastr.error(error, 'Error updating your review');
    });
  }
  deleteReview()
  {
    this.apiService.deleteReview(this.currentReview.id).subscribe( (resposne) => {
      this.toastr.success('Your review was deleted', 'Successfuly deleted!');
      this.currentReview = null;
      window.location.reload();
    },
    (error) => {
      this.toastr.error(error, 'Error deleting your review');
    });
  }
}
