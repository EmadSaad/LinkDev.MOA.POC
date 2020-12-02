/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MoaCasesComponent } from './moa-cases.component';

describe('MoaCasesComponent', () => {
  let component: MoaCasesComponent;
  let fixture: ComponentFixture<MoaCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoaCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoaCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
