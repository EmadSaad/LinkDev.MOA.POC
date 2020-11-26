import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamLoginComponent } from './iam-login.component';

describe('IamLoginComponent', () => {
  let component: IamLoginComponent;
  let fixture: ComponentFixture<IamLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
