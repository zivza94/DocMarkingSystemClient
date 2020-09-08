import { TestBed } from '@angular/core/testing';

import { GetSharedDocumentsService } from './get-shared-documents.service';

describe('GetSharedDocumentsService', () => {
  let service: GetSharedDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSharedDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
