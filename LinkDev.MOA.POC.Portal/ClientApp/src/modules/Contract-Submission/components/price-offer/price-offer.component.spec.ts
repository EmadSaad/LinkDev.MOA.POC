/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PriceOfferComponent } from './price-offer.component';

describe('PriceOfferComponent', () => {
  let component: PriceOfferComponent;
  let fixture: ComponentFixture<PriceOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
