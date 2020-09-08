import { TestBed } from '@angular/core/testing';

import { GetSharedUsersService } from './get-shared-users.service';

describe('GetSharedUsersService', () => {
  let service: GetSharedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSharedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
