import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyViewingComponent } from './currently-viewing.component';

describe('CurrentlyViewingComponent', () => {
  let component: CurrentlyViewingComponent;
  let fixture: ComponentFixture<CurrentlyViewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentlyViewingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlyViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
