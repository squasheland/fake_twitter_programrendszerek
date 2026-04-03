import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import type { TweetResponse } from '../../../../common/tweet/TweetResponse';
import type { TweetPage } from '../../../../common/tweet/TweetPage';
import type { LikeResponse } from '../../../../common/like/LikeResponse';
import type { TweetApiResponse } from '../model/TweetApiResponse';
import type { TweetPageApiResponse } from '../model/TweetPageApiResponse';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    });
  }

  private mapTweet(tweet: TweetApiResponse): TweetResponse {
    return {
      id: tweet.id,
      userId: tweet.userId,
      media: tweet.media,
      content: tweet.content,
      likesCount: tweet.likesCount,
      retweetCount: tweet.retweetCount,
      commentCount: tweet.commentCount,
      createdAt: new Date(tweet.createdAt),
      updatedAt: tweet.updatedAt ? new Date(tweet.updatedAt) : null,
      isDeleted: tweet.isDeleted,
      isLiked: tweet.isLiked,
    };
  }

  postTweet(content: string): Observable<TweetResponse> {
    return this.http
      .post<TweetApiResponse>(
        this.apiUrl + '/tweet/create',
        { content },
        { headers: this.getAuthHeaders() }
      )
      .pipe(map((tweet) => this.mapTweet(tweet)));
  }

  getTweetsForFeed(page: number): Observable<TweetPage> {
    return this.http
      .get<TweetPageApiResponse>(this.apiUrl + '/tweet/' + page, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => ({
          tweets: response.tweets.map((tweet) => this.mapTweet(tweet)),
          hasMore: response.hasMore,
          page: response.page,
        }))
      );
  }

  getTweetsByUser(userId: string, page = 1): Observable<TweetPage> {
    return this.http
      .get<TweetPageApiResponse>(this.apiUrl + '/tweet/user/' + userId + '/' + page, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => ({
          tweets: response.tweets.map((tweet) => this.mapTweet(tweet)),
          hasMore: response.hasMore,
          page: response.page,
        }))
      );
  }

  handleLike(tweetId: string): Observable<LikeResponse> {
    return this.http.post<LikeResponse>(
      this.apiUrl + '/like/tweet/' + tweetId,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
