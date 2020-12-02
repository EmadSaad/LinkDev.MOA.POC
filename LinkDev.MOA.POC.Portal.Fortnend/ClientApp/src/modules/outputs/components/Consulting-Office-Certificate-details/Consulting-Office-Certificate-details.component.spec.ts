/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultingOfficeCertificateDetailsComponent } from './Consulting-Office-Certificate-details.component';

describe('ConsultingOfficeCertificateDetailsComponent', () => {
  let component: ConsultingOfficeCertificateDetailsComponent;
  let fixture: ComponentFixture<ConsultingOfficeCertificateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultingOfficeCertificateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingOfficeCertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
