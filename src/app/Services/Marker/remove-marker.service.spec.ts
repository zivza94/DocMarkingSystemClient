import { TestBed } from '@angular/core/testing';

import { RemoveMarkerService } from './remove-marker.service';

describe('RemoveMarkerService', () => {
  let service: RemoveMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
