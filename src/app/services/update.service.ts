import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(public http: HttpClient) { }

  updateTask(task: any, id: number) {
    const uri: string = `http://localhost:8000/tasks/${id}`;
    return this.http.patch(uri, task);
  }
}
