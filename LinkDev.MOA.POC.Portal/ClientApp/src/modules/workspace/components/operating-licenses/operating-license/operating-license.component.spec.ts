import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingLicenseComponent } from './operating-license.component';

describe('OperatingLicenseComponent', () => {
  let component: OperatingLicenseComponent;
  let fixture: ComponentFixture<OperatingLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
