import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMarkerComponent } from './remove-marker.component';

describe('RemoveMarkerComponent', () => {
  let component: RemoveMarkerComponent;
  let fixture: ComponentFixture<RemoveMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
