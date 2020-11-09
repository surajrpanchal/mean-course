import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public loadSpinner: boolean = true;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'Edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(({ message, post }) => {
          this.post = post;
        });
      } else {
        this.mode = 'Create';
        this.postId = null;
        this.post = { title: '', content: '' };
      }
      this.loadSpinner = false;
    });
  }

  addPost(form: NgForm): void {
    if (form.valid) {
      this.loadSpinner = true;
      if (this.mode == 'Create') {
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
      this.loadSpinner = false;
      this.router.navigate(['/']);
    }
  }
}
