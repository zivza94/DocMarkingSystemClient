import { TestBed } from '@angular/core/testing';

import { GetDocumentService } from './get-document.service';

describe('GetDocumentService', () => {
  let service: GetDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
