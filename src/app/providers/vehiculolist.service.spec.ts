import { TestBed } from '@angular/core/testing';

import { VehiculolistService } from './vehiculolist.service';

describe('VehiculolistService', () => {
  let service: VehiculolistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculolistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
