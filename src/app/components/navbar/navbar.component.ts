import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { GettaskService } from '../../services/gettask.service';
import { Proyects } from '../../interfaces/proyects';
import { GetProyectService } from '../../services/get-proyect.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, MdbDropdownModule, MdbRippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Output() proyectId = new EventEmitter<number>();
  public allProyects: Proyects[] = [];
  constructor(private getProyectsService: GettaskService, private proyectService: GetProyectService) { }

  ngOnInit(): void {
    this.getProyectsService.getProyects().subscribe({
      next: (proyects) => {
        Object.values(proyects).map((proyect: any) => this.allProyects.push(proyect));
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onClickProyect(id: number) {
    this.proyectId.emit(id);
    this.proyectService.setSelectedProjectId(id);
  }
}
