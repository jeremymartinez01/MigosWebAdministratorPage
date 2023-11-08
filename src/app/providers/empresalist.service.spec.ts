import { TestBed } from '@angular/core/testing';

import { EmpresalistService } from './empresalist.service';

describe('EmpresalistService', () => {
  let service: EmpresalistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresalistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
