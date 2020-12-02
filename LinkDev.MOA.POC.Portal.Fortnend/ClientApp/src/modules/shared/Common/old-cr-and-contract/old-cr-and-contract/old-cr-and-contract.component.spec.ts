import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldCrAndContractComponent } from './old-cr-and-contract.component';

describe('OldCrAndContractComponent', () => {
  let component: OldCrAndContractComponent;
  let fixture: ComponentFixture<OldCrAndContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldCrAndContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldCrAndContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
