import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPortalLoginComponent } from './old-portal-login.component';

describe('OldPortalLoginComponent', () => {
  let component: OldPortalLoginComponent;
  let fixture: ComponentFixture<OldPortalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldPortalLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldPortalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
