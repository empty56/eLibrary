import { Component } from '@angular/core';
import { Account } from 'src/app/entities/account';
import { Statistics } from 'src/app/entities/statistics';
import { ApiService } from 'src/app/services/api.service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {


  constructor(private apiService: ApiService, private currentUserService: CurrentUserService){}

  currentUser: Account;
  statistics: Statistics;

  ngOnInit()
  {
    this.currentUserService.currentUser$.subscribe((data)=>{
      this.currentUser = data;
      if(this.currentUser)
      {
        this.apiService.getStatistics(this.currentUser.id).subscribe((data)=>{
          this.statistics = data;
        });
      }
      
    })
  }

}
