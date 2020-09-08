import { TestBed } from '@angular/core/testing';

import { CreateShareService } from './create-share.service';

describe('CreateShareService', () => {
  let service: CreateShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
