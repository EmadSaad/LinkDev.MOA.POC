import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAvailableBiddingsComponent } from './my-available-biddings.component';

describe('MyAvailableBiddingsComponent', () => {
  let component: MyAvailableBiddingsComponent;
  let fixture: ComponentFixture<MyAvailableBiddingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAvailableBiddingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAvailableBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
