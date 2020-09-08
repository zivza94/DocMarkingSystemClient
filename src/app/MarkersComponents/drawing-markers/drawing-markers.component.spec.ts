import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingMarkersComponent } from './drawing-markers.component';

describe('DrawingMarkersComponent', () => {
  let component: DrawingMarkersComponent;
  let fixture: ComponentFixture<DrawingMarkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingMarkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
