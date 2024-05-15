import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GettaskService {

  constructor(public http: HttpClient) { }

  public getTasks(): Observable<Task> {
    return this.http.get<Task>('http://localhost:8000/tasks');
  }
}
