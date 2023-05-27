import { Component, Input } from '@angular/core';
import { Book } from 'src/app/entities/book';
import { Link } from 'src/app/entities/link';
import { RatedBook } from 'src/app/entities/rated-book';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-book-list',
  templateUrl: './search-book-list.component.html',
  styleUrls: ['./search-book-list.component.css']
})

export class SearchBookListComponent {
  @Input() set search(search: string){
    this.loadBooks(search);
  }
  
  constructor(private apiService: ApiService){}
  ratedBooks : RatedBook[] = [];
  loadBooks(search: string) {
    this.ratedBooks = [];
    this.apiService.searchBooks(search).subscribe(
      (books: Book[]) => {
        books.forEach((book) => {
          this.apiService.getBookLink(book.id).subscribe((link: Link) =>{
            book.link = link;
          });
          this.ratedBooks.push({book, rating: 0} as RatedBook);
      });
      this.ratedBooks.forEach((ratedBook) =>
      {
        this.apiService.getBookRating(ratedBook.book.id).subscribe((rating: number) =>
        {
          ratedBook.rating = rating;
        });
      });
    },
      (error) => {
        console.error('Error retrieving book list:', error);
      }
    );
  }
}
