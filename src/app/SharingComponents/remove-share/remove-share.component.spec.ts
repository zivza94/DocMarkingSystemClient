import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveShareComponent } from './remove-share.component';

describe('RemoveShareComponent', () => {
  let component: RemoveShareComponent;
  let fixture: ComponentFixture<RemoveShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
