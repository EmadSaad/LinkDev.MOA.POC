import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoaPaymentComponent } from './moa-payment.component';

describe('MoaPaymentComponent', () => {
  let component: MoaPaymentComponent;
  let fixture: ComponentFixture<MoaPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoaPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoaPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
