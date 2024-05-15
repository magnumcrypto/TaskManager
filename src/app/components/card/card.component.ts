import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule],
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

  constructor(public deleteService: DeleteService) { }

  deleteTask() {
    this.deleteService.deleteTask(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.taskDeleted.emit();
      },
      error: (error) => {
        console.error('ERROR ->', error);
      }
    })
  }
}
