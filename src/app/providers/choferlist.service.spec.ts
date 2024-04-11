import { TestBed } from '@angular/core/testing';

import { ChoferlistService } from './choferlist.service';

describe('ChoferlistService', () => {
  let service: ChoferlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoferlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
