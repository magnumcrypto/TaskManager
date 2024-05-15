import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(public http: HttpClient) { }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/tasks/${id}`);
  }
}
