import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeControlComponent } from './welcome-control.component';

describe('WelcomeControlComponent', () => {
  let component: WelcomeControlComponent;
  let fixture: ComponentFixture<WelcomeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
