import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDocumentComponent } from './remove-document.component';

describe('RemoveDocumentComponent', () => {
  let component: RemoveDocumentComponent;
  let fixture: ComponentFixture<RemoveDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
