import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlVersionComponent } from './il-version.component';

describe('IlVersionComponent', () => {
  let component: IlVersionComponent;
  let fixture: ComponentFixture<IlVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
