import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UpdateService } from '../../services/update.service';
import { TaskUpdateService } from '../../services/task-update.service';

//Definimos la interfaz de UpdateData
interface UpdateData {
  title: string;
  description: string;
  estimatedHours: number;
  dedicatedHours: number;
  priority: string;
  id: number;
  proyectId: number;
}

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent {
  public priorityOptions: any = {
    urgent: 'Urgente',
    hight: 'Prioritario',
    important: 'Importante',
    moderate: 'Moderado',
    low: 'Bajo'
  }
  @Input() updateData: UpdateData = {
    title: '',
    description: '',
    estimatedHours: 0,
    dedicatedHours: 0,
    priority: '',
    id: 0,
    proyectId: 1
  }

  constructor(public modalRef: MdbModalRef<UpdateModalComponent>, private updateService: UpdateService, private taskUpdateService: TaskUpdateService) { }

  updateTaskForm = new FormGroup({
    description: new FormControl('', { nonNullable: true }),
    dedicated_hours: new FormControl(this.updateData.dedicatedHours, { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true })
  });

  onSubmit() {
    console.log(this.updateTaskForm.value);
    const formData = {
      description: (this.updateTaskForm.value.description === '') ? this.updateData.description : this.updateTaskForm.value.description,
      dedicated_hours: (this.updateTaskForm.value.dedicated_hours === 0) ? this.updateData.dedicatedHours : this.updateTaskForm.value.dedicated_hours,
      priority: this.updateTaskForm.value.priority
    }
    console.log(formData);
    this.updateService.updateTask(formData, this.updateData.id).subscribe({
      next: (data) => {
        console.log(data);
        this.taskUpdateService.taskUpdate.emit();
        this.modalRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
