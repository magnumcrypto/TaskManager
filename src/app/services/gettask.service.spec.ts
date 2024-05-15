import { TestBed } from '@angular/core/testing';

import { GettaskService } from './gettask.service';

describe('GettaskService', () => {
  let service: GettaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
