import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'; // Importa MdbFormsModule

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MdbFormsModule], // Añade MdbFormsModule a imports
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>) { }
}