import { TestBed } from '@angular/core/testing';

import { PublicistalistService } from './publicistalist.service';

describe('PublicistalistService', () => {
  let service: PublicistalistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicistalistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
