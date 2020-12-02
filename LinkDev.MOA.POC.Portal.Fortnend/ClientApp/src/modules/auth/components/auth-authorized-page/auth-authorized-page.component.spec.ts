import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAuthorizedPageComponent } from './auth-authorized-page.component';

describe('AuthAuthorizedPageComponent', () => {
  let component: AuthAuthorizedPageComponent;
  let fixture: ComponentFixture<AuthAuthorizedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAuthorizedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAuthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
