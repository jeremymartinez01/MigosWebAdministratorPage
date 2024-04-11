import { TestBed } from '@angular/core/testing';

import { ModelosconfigService } from './modelosconfig.service';

describe('ModelosconfigService', () => {
  let service: ModelosconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelosconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
