import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(public http: HttpClient) { }

  updateTask(task: any, id: number): Observable<any> {
    const uri: string = `http://localhost:8000/tasks/${id}`;
    return this.http.patch<any>(uri, task);
  }
}
