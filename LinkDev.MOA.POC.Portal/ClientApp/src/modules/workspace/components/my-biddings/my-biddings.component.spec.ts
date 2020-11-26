import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBiddingsComponent } from './my-biddings.component';

describe('MyBiddingsComponent', () => {
  let component: MyBiddingsComponent;
  let fixture: ComponentFixture<MyBiddingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBiddingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
