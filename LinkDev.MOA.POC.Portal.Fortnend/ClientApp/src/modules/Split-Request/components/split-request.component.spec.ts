import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitRequestComponent } from './split-request.component';

describe('SplitRequestComponent', () => {
  let component: SplitRequestComponent;
  let fixture: ComponentFixture<SplitRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
