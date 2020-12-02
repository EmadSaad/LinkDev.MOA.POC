import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingLicenseDetailsComponent } from './operating-license-details.component';

describe('OperatingLicenseDetailsComponent', () => {
  let component: OperatingLicenseDetailsComponent;
  let fixture: ComponentFixture<OperatingLicenseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingLicenseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingLicenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
