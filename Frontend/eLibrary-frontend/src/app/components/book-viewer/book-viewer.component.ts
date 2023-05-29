import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.css']
})
export class BookViewerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public pdf_link: string){}
  ngOnDestroy(){
    window.location.reload();
  }
}
