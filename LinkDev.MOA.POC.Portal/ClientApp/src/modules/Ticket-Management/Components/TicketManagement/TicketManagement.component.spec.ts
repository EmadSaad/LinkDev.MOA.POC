/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TicketManagementComponent } from './TicketManagement.component';

describe('TicketManagementComponent', () => {
  let component: TicketManagementComponent;
  let fixture: ComponentFixture<TicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//// This class is mainly for unit testing
