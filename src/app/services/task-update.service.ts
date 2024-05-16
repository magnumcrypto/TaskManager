import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {

  taskUpdate: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}
