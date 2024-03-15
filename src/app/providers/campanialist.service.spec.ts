import { TestBed } from '@angular/core/testing';

import { CampanialistService } from './campanialist.service';

describe('CampanialistService', () => {
  let service: CampanialistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampanialistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
