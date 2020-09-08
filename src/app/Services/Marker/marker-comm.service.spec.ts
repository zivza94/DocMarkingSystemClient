import { TestBed } from '@angular/core/testing';

import { MarkerCommService } from './marker-comm.service';

describe('MarkerCommService', () => {
  let service: MarkerCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
