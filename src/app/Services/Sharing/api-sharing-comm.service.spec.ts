import { TestBed } from '@angular/core/testing';

import { ApiSharingCommService } from './api-sharing-comm.service';

describe('ApiSharingCommService', () => {
  let service: ApiSharingCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSharingCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
