import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(public http: HttpClient) { }

  deleteTask(id: number): Observable<any> {
    const uri: string = `http://localhost:8000/tasks/${id}`;
    return this.http.delete<any>(uri);
  }
}
