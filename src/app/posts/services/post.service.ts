import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor() {}

  getPosts(): Post[] {
    return [...this.posts];
  }

  postUpdateListeners(): Observable<Post[]> {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }
}
