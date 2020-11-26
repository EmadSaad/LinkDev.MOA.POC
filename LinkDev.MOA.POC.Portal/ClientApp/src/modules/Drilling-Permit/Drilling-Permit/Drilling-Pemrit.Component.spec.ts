/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrillingPermitComponent } from './Drilling-Permit.component';

describe('DrillingPermitComponent', () => {
  let component: DrillingPermitComponent;
  let fixture: ComponentFixture<DrillingPermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillingPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillingPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
