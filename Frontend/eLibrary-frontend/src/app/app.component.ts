import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private currentUserService:CurrentUserService){}
  async ngOnInit(): Promise<void> {
    await this.currentUserService.setCurrentUser();
  }
  title = 'eLibrary-frontend';
}
