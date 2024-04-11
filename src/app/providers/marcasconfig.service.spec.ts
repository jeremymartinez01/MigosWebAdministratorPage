import { TestBed } from '@angular/core/testing';

import { MarcasconfigService } from './marcasconfig.service';

describe('MarcasconfigService', () => {
  let service: MarcasconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcasconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
