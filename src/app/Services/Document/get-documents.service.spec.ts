import { TestBed } from '@angular/core/testing';

import { GetDocumentsService } from './get-documents.service';

describe('GetDocumentsService', () => {
  let service: GetDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
