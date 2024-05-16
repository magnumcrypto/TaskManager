import { Component, EventEmitter, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CreateService } from '../../services/create.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() taskCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(public modalRef: MdbModalRef<ModalComponent>, private createService: CreateService) { }

  newTaskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    estimated_hours: new FormControl('', { nonNullable: true }),
    dedicated_hours: new FormControl('', { nonNullable: true }),
    clasification: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
  })

  public onSubmit() {
    this.createService.createTask(this.newTaskForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.taskCreated.emit();
        this.modalRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}