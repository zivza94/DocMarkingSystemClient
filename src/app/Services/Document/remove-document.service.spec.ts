import { TestBed } from '@angular/core/testing';

import { RemoveDocumentService } from './remove-document.service';

describe('RemoveDocumentService', () => {
  let service: RemoveDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
