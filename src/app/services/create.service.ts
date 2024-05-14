import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(public http: HttpClient) { }

  public createTask(taskData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/task/new', taskData)
  }
}
