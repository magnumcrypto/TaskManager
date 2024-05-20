import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { GettaskService } from '../../services/gettask.service';
import { Proyects } from '../../interfaces/proyects';
import { GetProyectService } from '../../services/get-proyect.service';
import { MdbPopoverDirective, MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateService } from '../../services/create.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, MdbDropdownModule, MdbRippleModule, MdbPopoverModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Output() proyectId = new EventEmitter<number>();
  @Output() proyectName = new EventEmitter<string>();
  @ViewChild('popover') popover!: MdbPopoverDirective;
  public allProyects: Proyects[] = [];

  constructor(private getProyectsService: GettaskService,
    private proyectService: GetProyectService,
    private createSerivce: CreateService) { }

  proyectForm = new FormGroup({
    proyect_name: new FormControl('', [Validators.required])
  })

  getResponse() {
    this.getProyectsService.getProyects().subscribe({
      next: (proyects) => {
        Object.values(proyects).map((proyect: any) => this.allProyects.push(proyect));
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnInit(): void {
    this.getResponse();
  }

  onClickProyect(id: number, proyectName?: string) {
    this.proyectId.emit(id);
    this.proyectName.emit(proyectName);
    this.proyectService.setSelectedProjectId(id);
  }

  onSubmit() {
    if (this.proyectForm.invalid) { return; }
    this.createSerivce.createProyect(this.proyectForm.value).subscribe({
      next: (response) => {
        //actualizamos la lista de proyectos subscribiendonos al servicio
        if (response.status === 200) {
          this.allProyects = [];
          this.getResponse();
          this.proyectForm.reset();
          this.popover.hide();
        }
      },
      error: (error) => { console.log(error) }
    })
  }
}
