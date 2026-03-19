import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected apiUrl = 'http://localhost:3000/api';
  protected http = inject(HttpClient);
}
