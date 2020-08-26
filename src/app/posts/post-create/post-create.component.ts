import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  message = '';
  post: Post = { title: '', content: '' };

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  addPost(form: NgForm): void {
    if (form.valid) {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm();
      this.message = this.post.title + ' saved successfully';
    }
  }
}
