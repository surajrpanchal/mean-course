import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public loadSpinner: boolean = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadSpinner = false;
  }

  onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    } else {
      this.loadSpinner = true;
      this.authService.createUser(form.value.email, form.value.password);
      this.loadSpinner = false;
    }
  }
}
