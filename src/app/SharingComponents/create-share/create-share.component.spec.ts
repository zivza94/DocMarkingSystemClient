import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShareComponent } from './create-share.component';

describe('CreateShareComponent', () => {
  let component: CreateShareComponent;
  let fixture: ComponentFixture<CreateShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
