import { TestBed } from '@angular/core/testing';

import { SolicitudeslistService } from './solicitudeslist.service';

describe('SolicitudeslistService', () => {
  let service: SolicitudeslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudeslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
