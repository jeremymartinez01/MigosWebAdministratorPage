import { TestBed } from '@angular/core/testing';

import { GoogleMapsService } from './googlemaps.service';

describe('GooglemapsService', () => {
  let service: GoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
