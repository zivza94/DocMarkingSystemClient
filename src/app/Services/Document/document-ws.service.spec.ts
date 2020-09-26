import { TestBed } from '@angular/core/testing';

import { DocumentWSService } from './document-ws.service';

describe('DocumentWSService', () => {
  let service: DocumentWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
