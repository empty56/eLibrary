import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  destroy: ReplaySubject<any> = new ReplaySubject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


  home() : void {
    this.router.navigate(['/']);
  }
  myLibrary() : void {
    this.router.navigate(['/library/myLibrary']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
