import { TestBed } from '@angular/core/testing';

import { LiveDrawWSService } from './live-draw-ws.service';

describe('LiveDrawWSService', () => {
  let service: LiveDrawWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveDrawWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
