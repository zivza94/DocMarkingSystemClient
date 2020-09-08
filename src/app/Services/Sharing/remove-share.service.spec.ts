import { TestBed } from '@angular/core/testing';

import { RemoveShareService } from './remove-share.service';

describe('RemoveShareService', () => {
  let service: RemoveShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
