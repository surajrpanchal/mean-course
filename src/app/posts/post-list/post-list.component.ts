import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscriptions: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscriptions = this.postService
      .postUpdateListeners()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.postSubscriptions.unsubscribe();
  }
}
