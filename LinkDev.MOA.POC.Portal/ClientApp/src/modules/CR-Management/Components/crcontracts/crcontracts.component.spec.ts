import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRContractsComponent } from './crcontracts.component';

describe('CRContractsComponent', () => {
  let component: CRContractsComponent;
  let fixture: ComponentFixture<CRContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
