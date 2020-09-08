import { TestBed } from '@angular/core/testing';

import { ApiDocumentsCommService } from './api-documents-comm.service';

describe('ApiDocumentsCommService', () => {
  let service: ApiDocumentsCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDocumentsCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
