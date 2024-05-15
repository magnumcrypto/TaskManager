import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup, CdkDragPlaceholder, DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GettaskService } from '../../services/gettask.service';
import { Task } from '../../interfaces/tasks';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [NavbarComponent, ModalComponent, CdkDropList, CdkDrag, CdkDropListGroup, CdkDragPlaceholder, CardComponent, DragDropModule],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  public anytask: Task[] = [];
  public done: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];
  public doneT = 'done';

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService, private getTaskService: GettaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    //Compara si arrastras un elemento dentro del mismo contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //Compara si arrastras un elemento de un contenedor a otro
      transferArrayItem(
        event.previousContainer.data, //Contenedor de origen
        event.container.data, //Contenedor de destino
        event.previousIndex, //Indice de origen
        event.currentIndex, //Indice de destino
      );
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true
    })
    this.modalRef.onClose.subscribe(() => this.getAllTasks());
  }

  getAllTasks() {
    this.anytask = [];
    this.done = [];
    this.progress = [];
    this.todo = [];
    this.getTaskService.getTasks().subscribe({
      next: (data) => {
        Object.values(data).map((task: any) => {
          switch (task.clasification) {
            case 'to_do':
              this.todo.push(task);
              break;
            case 'in_progress':
              this.progress.push(task);
              break;
            case 'done':
              this.done.push(task);
              break;
            default:
              this.anytask.push(task);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  isDeleted() {
    this.getAllTasks();
  }
}
