import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loadSpinner: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.loadSpinner = false;
  }

  onLogin(form: NgForm): void {

  }
}
