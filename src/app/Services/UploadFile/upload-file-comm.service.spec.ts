import { TestBed } from '@angular/core/testing';

import { UploadFileCommService } from './upload-file-comm.service';

describe('UploadFileCommService', () => {
  let service: UploadFileCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
