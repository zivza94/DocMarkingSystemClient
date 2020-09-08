import { TestBed } from '@angular/core/testing';

import { SharingCommService } from './sharing-comm.service';

describe('SharingCommService', () => {
  let service: SharingCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
