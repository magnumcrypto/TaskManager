import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DeleteService } from '../../services/delete.service';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule, UpdateModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() dateInit: string = '';
  @Input() estimatedHours: number = 0;
  @Input() dedicatedHours: number = 0;
  @Input() priority: string = '';
  @Input() id: number = 0;
  @Input() clasification: string = '';
  @Output() taskDeleted: EventEmitter<void> = new EventEmitter<void>();

  modalRef: MdbModalRef<UpdateModalComponent> | null = null;

  constructor(public deleteService: DeleteService, private modalService: MdbModalService) { }

  deleteTask() {
    this.deleteService.deleteTask(this.id).subscribe({
      next: (data) => {
        console.log('Deleted!');
        this.taskDeleted.emit();
      },
      error: (error) => {
        console.error('ERROR ->', error);
      }
    })
  }

  openModal() {
    this.modalRef = this.modalService.open(UpdateModalComponent, {
      modalClass: 'modal-dialog-centered'
    })
    const updateData = {
      title: this.title,
      description: this.description,
      estimatedHours: this.estimatedHours,
      dedicatedHours: this.dedicatedHours,
      priority: this.priority,
      id: this.id
    }
    this.modalRef.component.updateData = updateData;
  }
}
