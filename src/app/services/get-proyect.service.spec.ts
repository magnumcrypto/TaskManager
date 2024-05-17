import { TestBed } from '@angular/core/testing';

import { GetProyectService } from './get-proyect.service';

describe('GetProyectService', () => {
  let service: GetProyectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProyectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
