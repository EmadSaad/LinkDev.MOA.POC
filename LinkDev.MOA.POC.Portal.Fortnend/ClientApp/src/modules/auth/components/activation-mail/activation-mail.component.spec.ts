import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationMailComponent } from './activation-mail.component';

describe('ActivationMailComponent', () => {
  let component: ActivationMailComponent;
  let fixture: ComponentFixture<ActivationMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
