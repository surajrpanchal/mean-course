import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  message = '';
  public post: Post = { title: '', content: '', image: '' };
  private mode: String = 'Create';
  private postId: string;
  public loadSpinner: boolean = true;
  form: FormGroup;
  public imagePreview: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
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
        this.post = { title: '', content: '', image: '' };
      }
      this.form.setValue({
        title: this.post.title,
        content: this.post.content,
        image: this.post.image,
      });
      this.loadSpinner = false;
    });
  }

  addPost(): void {
    if (this.form.valid) {
      this.loadSpinner = true;
      if (this.mode == 'Create') {
        this.postService.addPost(
          this.form.value.title,
          this.form.value.content
        );
        this.message = this.post.title + ' saved successfully';
      } else {
        this.postService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content
        );
        this.message = this.post.title + ' updated successfully';
      }
      this.form.reset();
      this.loadSpinner = false;
      this.router.navigate(['/']);
    }
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }
}
