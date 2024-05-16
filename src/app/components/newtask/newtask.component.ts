import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup, CdkDragPlaceholder, DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GettaskService } from '../../services/gettask.service';
import { Task } from '../../interfaces/tasks';
import { TaskUpdateService } from '../../services/task-update.service';
import { SaveService } from '../../services/save.service';

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

  constructor(
    private modalService: MdbModalService,
    private getTaskService: GettaskService,
    private taskUpdateService: TaskUpdateService,
    private saveService: SaveService
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.taskUpdateService.taskUpdate.subscribe(() => this.getAllTasks());
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
    //Evitamos que se actualice el panel de tareas al cerrar el modal
    //Solo cuando se crera una nueva tarea
    this.modalRef.component.taskCreated.subscribe(() => this.getAllTasks());
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

  saveWorkspace() {
    let allTasks: any = [];

    if (this.anytask.length > 0) {
      this.anytask.map((card) => {
        card.clasification = 'new_tarea';
        allTasks.push({ id: card.id, clasification: card.clasification })
      });

    }
    if (this.todo.length > 0) {
      this.todo.map((card) => {
        card.clasification = 'to_do';
        allTasks.push({ id: card.id, clasification: card.clasification })
      });
    }
    if (this.progress.length > 0) {
      this.progress.map((card) => {
        card.clasification = 'in_progress';
        allTasks.push({ id: card.id, clasification: card.clasification })
      });
    }
    if (this.done.length > 0) {
      this.done.map((card) => {
        card.clasification = 'done';
        allTasks.push({ id: card.id, clasification: card.clasification })
      });
    }

    this.saveService.saveWorkspace({ allTasks }).subscribe({
      next: (data) => {
        console.log('Saved!');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
