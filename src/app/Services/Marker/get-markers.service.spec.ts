import { TestBed } from '@angular/core/testing';

import { GetMarkersService } from './get-markers.service';

describe('GetMarkersService', () => {
  let service: GetMarkersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMarkersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
