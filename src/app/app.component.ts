import { Component, OnInit } from '@angular/core';
import { Post } from './posts/models/post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mean-course';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
