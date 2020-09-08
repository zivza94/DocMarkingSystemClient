import { TestBed } from '@angular/core/testing';

import { UsersCommService } from './users-comm.service';

describe('UsersCommService', () => {
  let service: UsersCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
