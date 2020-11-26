import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHierarchyComponent } from './form-hierarchy.component';

describe('FormHierarchyComponent', () => {
  let component: FormHierarchyComponent;
  let fixture: ComponentFixture<FormHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
