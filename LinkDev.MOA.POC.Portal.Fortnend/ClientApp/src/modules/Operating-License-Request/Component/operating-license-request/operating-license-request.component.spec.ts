import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OperatingLicenseRequestComponent } from './operating-license-request.component';


describe('OperatingBuildingRequestComponent', () => {
  let component: OperatingLicenseRequestComponent;
  let fixture: ComponentFixture<OperatingLicenseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingLicenseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingLicenseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
