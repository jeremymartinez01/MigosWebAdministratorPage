import { TestBed } from '@angular/core/testing';

import { HttpmailService } from './httpmail.service';

describe('HttpmailService', () => {
  let service: HttpmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
