import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSystemComponent } from './alert-system.component';

describe('AlertSystemComponent', () => {
  let component: AlertSystemComponent;
  let fixture: ComponentFixture<AlertSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
