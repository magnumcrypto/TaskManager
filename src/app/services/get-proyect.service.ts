import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProyectService {
  private selectedProyectIdSource = new BehaviorSubject<number>(1);
  selectedProyectId$ = this.selectedProyectIdSource.asObservable();
  constructor() { }

  setSelectedProjectId(id: number) {
    this.selectedProyectIdSource.next(id);
  }
}
