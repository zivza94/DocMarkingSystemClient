import { TestBed } from '@angular/core/testing';

import { ApiMarkerCommService } from './api-marker-comm.service';

describe('ApiMarkerCommService', () => {
  let service: ApiMarkerCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMarkerCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
