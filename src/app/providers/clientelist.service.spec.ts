import { TestBed } from '@angular/core/testing';

import { ClientelistService } from './clientelist.service';

describe('ClientelistService', () => {
  let service: ClientelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
