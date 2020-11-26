/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PermitsLetterComponent } from './permits-letter.component';

describe('PermitsLetterComponent', () => {
  let component: PermitsLetterComponent;
  let fixture: ComponentFixture<PermitsLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitsLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitsLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
