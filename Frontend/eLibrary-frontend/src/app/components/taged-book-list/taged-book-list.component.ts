import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookViewerComponent } from '../book-viewer/book-viewer.component';
import { Book } from 'src/app/entities/book';
import { Account } from 'src/app/entities/account';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ApiService } from 'src/app/services/api.service';
import { AccountBook } from 'src/app/entities/account-book';

@Component({
  selector: 'app-taged-book-list',
  templateUrl: './taged-book-list.component.html',
  styleUrls: ['./taged-book-list.component.css']
})
export class TagedBookListComponent {

  @Input() books: Book[];
  @Input() tag: string;

  constructor(private dialog: MatDialog, private apiService: ApiService, private currentUserService: CurrentUserService){}

  currentUser: Account;

  ngOnInit(){
    this.currentUserService.currentUser$.subscribe((currentUser)=>{
      this.currentUser = currentUser;
    })
  }

  showBooksState: boolean = true;

  onReadBook(pdf_link: string, book_id: number){
    this.dialog.open(BookViewerComponent, {data: pdf_link});
    this.startReading(book_id);
  }

  hideBooks(){
    this.showBooksState = false;
  }
  showBooks(){
    this.showBooksState = true;
  }

  startReading(book_id: number){
    this.apiService.getAccountBook(this.currentUser.id, book_id).subscribe((accountBook)=>{
      let updatedAccountBook = accountBook;
      if(!accountBook.already_read && !accountBook.reading)
      {
        updatedAccountBook.reading = true;
        this.apiService.updateAccountBook(accountBook.id, updatedAccountBook).subscribe();
      }
    });
  }

  finishReading(book_id: number){
    this.apiService.getAccountBook(this.currentUser.id, book_id).subscribe((accountBook)=>{
      let updatedAccountBook = accountBook;
      if(!accountBook.already_read)
      {
        updatedAccountBook.already_read = true;
        updatedAccountBook.reading = false;
        console.log(updatedAccountBook);
        this.updateAccountBook(updatedAccountBook);
      }
    });
  }
  
  notFinishedReading(book_id: number){
    this.apiService.getAccountBook(this.currentUser.id, book_id).subscribe((accountBook)=>{
      let updatedAccountBook = accountBook;
      if(accountBook.already_read)
      {
        updatedAccountBook.already_read = false;
        this.updateAccountBook(updatedAccountBook);
      }
    });
  }

  notReadingAnymore(book_id: number){
    this.apiService.getAccountBook(this.currentUser.id, book_id).subscribe((accountBook)=>{
      let updatedAccountBook = accountBook;
      if(accountBook.reading)
      {
        updatedAccountBook.reading = false;
        this.updateAccountBook(updatedAccountBook);
      }
    });
  }

  updateAccountBook(accountBook: AccountBook){
    this.apiService.updateAccountBook(accountBook.id ,accountBook).subscribe(()=>{window.location.reload();});
  }

}
