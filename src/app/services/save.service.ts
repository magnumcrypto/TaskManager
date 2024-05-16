import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(public http: HttpClient) { }

  saveWorkspace(allTasks: any): Observable<any> {
    const uri: string = 'http://localhost:8000/save';
    return this.http.patch<any>(uri, allTasks);
  }
}
