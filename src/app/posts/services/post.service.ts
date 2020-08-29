import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: Post[]; count: number }>(
        environment.ApiBasePath + environment.PostGetApi
      )
      .subscribe(({ message, posts, count }) => {
        this.posts = posts;
        this.postUpdate.next([...this.posts]);
      });
  }

  postUpdateListeners(): Observable<Post[]> {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = { title: title, content: content };
    this.httpClient
      .post<{ isSuccess: boolean; message: string }>(
        environment.ApiBasePath + environment.PostSaveApi,
        post
      )
      .subscribe(({ isSuccess, message }) => {
        if (isSuccess) {
          console.log(message);
          this.posts.push(post);
          this.postUpdate.next([...this.posts]);
        } else {
          console.error(message);
        }
      });
  }
}
