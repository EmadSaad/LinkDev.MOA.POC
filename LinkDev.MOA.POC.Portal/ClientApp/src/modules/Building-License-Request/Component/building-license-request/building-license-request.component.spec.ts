import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingLicenseRequestComponent } from './building-license-request.component';

describe('BuildingLicenseRequestComponent', () => {
  let component: BuildingLicenseRequestComponent;
  let fixture: ComponentFixture<BuildingLicenseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingLicenseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingLicenseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
