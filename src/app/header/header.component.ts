import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userAuthenticated: boolean = false;
  private authStatusSubscriber: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSubscriber = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSubscriber.unsubscribe();
  }

  onLogout(): void {}
}
