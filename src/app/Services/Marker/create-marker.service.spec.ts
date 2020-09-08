import { TestBed } from '@angular/core/testing';

import { CreateMarkerService } from './create-marker.service';

describe('CreateMarkerService', () => {
  let service: CreateMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
