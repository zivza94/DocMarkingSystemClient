import { TestBed } from '@angular/core/testing';

import { CreateDocumentService } from './create-document.service';

describe('CreateDocumentService', () => {
  let service: CreateDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
