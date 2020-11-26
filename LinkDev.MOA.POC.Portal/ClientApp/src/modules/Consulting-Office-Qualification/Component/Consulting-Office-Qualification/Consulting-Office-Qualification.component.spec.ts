/* tslint:disable:no-unused-variable */

import { ConsultingOfficeQualificationComponent } from './Consulting-Office-Qualification.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('ConsultingOfficeQualificationComponent', () => {
  let component: ConsultingOfficeQualificationComponent;
  let fixture: ComponentFixture<ConsultingOfficeQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultingOfficeQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingOfficeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
