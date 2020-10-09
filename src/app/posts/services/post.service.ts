import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();
  private post: Post = { title: '', content: '' };

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any; count: number }>(
        environment.ApiBasePath + environment.PostGetApi
      )
      .pipe(
        map(({ message, posts, count }) => {
          return {
            message: message,
            count: count,
            posts: posts.map((post) => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
              };
            }),
          };
        })
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
      .post<{ isSuccess: boolean; message: string; _id: string }>(
        environment.ApiBasePath + environment.PostSaveApi,
        post
      )
      .subscribe(({ isSuccess, message, _id }) => {
        if (isSuccess) {
          post.id = _id;
          this.posts.push(post);
          this.postUpdate.next([...this.posts]);
        } else {
          console.warn(message);
        }
      });
  }

  updatePost(id: string, title: string, content: string): void {
    const post: Post = { id: id, title: title, content: content };
    this.httpClient
      .put<{ isSuccess: boolean; message: string; _id: string }>(
        environment.ApiBasePath + environment.PostUpdateApi + '/' + id,
        post
      )
      .subscribe(({ isSuccess, message }) => {
        if (isSuccess) {

          this.postUpdate.next([...this.posts]);
        } else {
          console.warn(message);
        }
      });
  }

  deletePost(id: string): void {
    this.httpClient
      .delete<{ isSuccess: boolean; message: string }>(
        environment.ApiBasePath + environment.PostDeleteApi + '/' + id
      )
      .subscribe(({ isSuccess, message }) => {
        if (isSuccess) {
          this.posts = this.posts.filter((f) => f.id !== id);
          this.postUpdate.next([...this.posts]);
        } else {
          console.warn(message);
        }
      });
  }

  getPost(id: String) {
    return this.httpClient.get<{ message: string; post: Post }>(
      environment.ApiBasePath + environment.PostGetByIdApi + '/' + id
    );
  }
}
