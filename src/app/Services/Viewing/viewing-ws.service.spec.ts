import { TestBed } from '@angular/core/testing';

import { ViewingWSService } from './viewing-ws.service';

describe('ViewingWSService', () => {
  let service: ViewingWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewingWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
