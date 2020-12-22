import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public loadSpinner: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.loadSpinner = false;
  }

  onLogin(form: NgForm): void {

  }
}
