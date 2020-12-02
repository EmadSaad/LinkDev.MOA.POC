import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingSuccessfullyComponent } from './saving-successfully.component';

describe('SavingSuccessfullyComponent', () => {
  let component: SavingSuccessfullyComponent;
  let fixture: ComponentFixture<SavingSuccessfullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingSuccessfullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
