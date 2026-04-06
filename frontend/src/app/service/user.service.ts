import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { UserResponse } from '../../../../common/user/UserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    });
  }

  getUserProfile(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/user/${username}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCurrentUserName(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return (decoded as { username?: string }).username ?? null;
    } catch {
      return null;
    }
  }
}
