import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [NavbarComponent, CdkDropList, CdkDrag, CdkDropListGroup, CdkDragPlaceholder, CardComponent, ModalComponent],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  public done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  public progress = ['In school', 'In the office', 'In the car', 'In the park', 'In the gym'];
  public newtask = ['New task 1', 'New task 2', 'New task 3', 'New task 4', 'New task 5'];
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  drop(event: CdkDragDrop<string[]>) {
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
  }
}
