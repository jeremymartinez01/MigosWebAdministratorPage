import { TestBed } from '@angular/core/testing';

import { CampanasService } from './campanas.service';

describe('CampanasService', () => {
  let service: CampanasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampanasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
