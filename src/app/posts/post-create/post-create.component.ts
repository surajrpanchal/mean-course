import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  message = '';
  post: Post = {title:"",content:""};
  @Output() postCreateHandler = new EventEmitter<Post>();

  constructor() {}

  ngOnInit(): void {}

  addPost(): void {
    this.postCreateHandler.emit(this.post);
    this.message = this.post.title + ' saved successfully';
  }
}
