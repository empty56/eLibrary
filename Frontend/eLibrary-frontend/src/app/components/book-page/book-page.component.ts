import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { Book } from 'src/app/entities/book';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { mergeAll, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{

  id: number;
  book: Book;
  rating: number;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() 
  {
    this.route.paramMap.pipe(
      switchMap((params)=> this.apiService.getBook(+params.get('id')))
    ).subscribe((book)=> {
      this.book = book;
      this.apiService.getBookRating(this.book.id).subscribe((rating)=>{
        this.rating = +rating.toFixed(1);
      });
      this.apiService.getBookLink(this.book.id).subscribe((link)=>{
        this.book.link = link;
      });
    });
  }



}
