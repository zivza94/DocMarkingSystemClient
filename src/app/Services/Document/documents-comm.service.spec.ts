import { TestBed } from '@angular/core/testing';

import { DocumentsCommService } from './documents-comm.service';

describe('DocumentsCommService', () => {
  let service: DocumentsCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
