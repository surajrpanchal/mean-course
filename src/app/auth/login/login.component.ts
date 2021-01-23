import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loadSpinner: boolean = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadSpinner = false;
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    } else {
      this.loadSpinner = true;
      this.authService.login(form.value.email, form.value.password);
      this.loadSpinner = false;
    }
  }
}
