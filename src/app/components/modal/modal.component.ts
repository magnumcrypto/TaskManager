import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CreateService } from '../../services/create.service';
import { GetProyectService } from '../../services/get-proyect.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private proyectId: number = 1;
  @Output() taskCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private createService: CreateService,
    private proyectService: GetProyectService
  ) { }

  newTaskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    estimated_hours: new FormControl('', { nonNullable: true }),
    dedicated_hours: new FormControl('', { nonNullable: true }),
    clasification: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
  })

  public onSubmit() {
    this.createService.createTask(this.newTaskForm.value, this.proyectId).subscribe({
      next: () => {
        this.taskCreated.emit();
        this.modalRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnInit(): void {
    this.proyectService.selectedProyectId$.subscribe(id => {
      this.proyectId = id;
    })
  }
}