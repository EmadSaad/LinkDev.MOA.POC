import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRContactDetailsAndRepresentativesComponent } from './crcontact-details-and-representatives.component';

describe('CRContactDetailsAndRepresentativesComponent', () => {
  let component: CRContactDetailsAndRepresentativesComponent;
  let fixture: ComponentFixture<CRContactDetailsAndRepresentativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRContactDetailsAndRepresentativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRContactDetailsAndRepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
