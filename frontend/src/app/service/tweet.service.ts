import { inject, Injectable } from '@angular/core';
import { Tweet } from '../model/Tweet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  postTweet(content: string): Observable<Tweet> {
    return this.http.post<Tweet>(
      `${this.apiUrl}/tweet/create`,
      { content },
      { headers: this.getAuthHeaders() }
    );
  }
}
