import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(public http: HttpClient) { }

  public createTask(taskData: any): Observable<any> {
    const uri: string = 'http://localhost:8000/task/new';
    return this.http.post<any>(uri, taskData)
  }
}
