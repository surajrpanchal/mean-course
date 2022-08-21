import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscriptions: Subscription;
  private authSubscriptions: Subscription;
  userAuthenticated = false;
  public loadSpinner: boolean = true;

  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscriptions = this.postService
      .postUpdateListeners()
      .subscribe((posts: Post[]) => (this.posts = posts));
    this.loadSpinner = false;

    this.userAuthenticated = this.authService.getUserAuthenticated();
    this.authSubscriptions = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.postSubscriptions.unsubscribe();
    this.authSubscriptions.unsubscribe();
  }

  deletePost(post: Post): void {
    this.loadSpinner = true;
    this.postService.deletePost(post.id);
    this.loadSpinner = false;
  }
}
