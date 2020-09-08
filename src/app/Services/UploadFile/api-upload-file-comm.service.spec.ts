import { TestBed } from '@angular/core/testing';

import { ApiUploadFileCommService } from './api-upload-file-comm.service';

describe('ApiUploadFileCommService', () => {
  let service: ApiUploadFileCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUploadFileCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
