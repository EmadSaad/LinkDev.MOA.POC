import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMergeComponent } from './contract-merge.component';

describe('ContractMergeComponent', () => {
  let component: ContractMergeComponent;
  let fixture: ComponentFixture<ContractMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
