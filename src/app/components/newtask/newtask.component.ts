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
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [NavbarComponent, ModalComponent, CdkDropList, CdkDrag, CdkDropListGroup, CdkDragPlaceholder, CardComponent, DragDropModule, NgStyle],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  public anytask: Task[] = [];
  public done: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];
  public proyectId: number = 1;
  public proyectName: string = 'PROYECT';
  public doneT = 'done';
  public imageLinks: string[] =
    [
      'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
      'https://i.pinimg.com/originals/4e/55/07/4e5507218f1a9d904c9299598b0f596d.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/006/240/302/small_2x/abstract-soft-focus-sunset-field-landscape-of-yellow-flowers-and-grass-meadow-warm-golden-hour-sunset-sunrise-time-tranquil-spring-summer-nature-closeup-and-blurred-forest-background-idyllic-nature-photo.jpg',
      'https://st5.depositphotos.com/35914836/63547/i/450/depositphotos_635479512-stock-photo-brown-wooden-wall-texture-background.jpg',
      'https://t4.ftcdn.net/jpg/05/18/41/91/360_F_518419158_yXXBww2r5Z3XoutBxRX8KHNZOpPjhC03.jpg',
      'https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-powder-smoke-colorful-background-image_2164096.jpg',
      'https://cdn.pixabay.com/photo/2018/01/24/18/05/background-3104413_1280.jpg',
      'https://as2.ftcdn.net/v2/jpg/05/84/95/65/1000_F_584956595_jJz4GqGQLZTIAiwir15VCk4sglgi9RGx.jpg',
      'https://www.shutterstock.com/shutterstock/videos/1060147385/thumb/1.jpg?ip=x480'
    ];
  public backgroundImage: string = this.imageLinks[this.generateRandomNumber()];

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private getTaskService: GettaskService,
    private taskUpdateService: TaskUpdateService,
    private saveService: SaveService
  ) { }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * ((this.imageLinks.length - 1) + 1));
  }
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
    this.getTaskService.getTasks(this.proyectId).subscribe({
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
  getProyectId(id: number) {
    this.proyectId = id;
    this.getAllTasks();
  }
  getProyectName(proyectName: string) {
    this.proyectName = proyectName;
  }
}
