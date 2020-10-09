import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  message = '';
  public post: Post = { title: '', content: '' };
  private mode: String = 'Create';
  private postId: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'Edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(({ message, post }) => {
          this.post = post;
        });
        console.log(this.post);
      } else {
        this.mode = 'Create';
        this.postId = null;
        this.post = { title: '', content: '' };
      }
    });
  }

  addPost(form: NgForm): void {
    if (form.valid) {
      if (this.post.id === null) {
        this.postService.addPost(form.value.title, form.value.content);
        form.resetForm();
        this.message = this.post.title + ' saved successfully';
      } else {
        this.postService.updatePost(
          this.postId,
          form.value.title,
          form.value.content
        );
        form.resetForm();
        this.message = this.post.title + ' updated successfully';
      }
    }
  }
}
