import { TestBed } from '@angular/core/testing';

import { MarkerWSService } from './marker-ws.service';

describe('MarkerWSService', () => {
  let service: MarkerWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
