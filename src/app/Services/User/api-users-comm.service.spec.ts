import { TestBed } from '@angular/core/testing';

import { ApiUsersCommService } from './api-users-comm.service';

describe('ApiUsersCommService', () => {
  let service: ApiUsersCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUsersCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
