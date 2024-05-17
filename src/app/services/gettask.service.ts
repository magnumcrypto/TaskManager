import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GettaskService {

  constructor(public http: HttpClient) { }

  public getTasks(idProyect: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:8000/tasks/${idProyect}`);
  }

  public getProyects(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/proyects');
  }
}
