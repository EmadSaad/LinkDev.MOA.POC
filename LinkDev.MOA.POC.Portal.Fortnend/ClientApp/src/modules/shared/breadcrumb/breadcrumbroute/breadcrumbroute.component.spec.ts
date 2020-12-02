import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbrouteComponent } from './breadcrumbroute.component';

describe('BreadcrumbrouteComponent', () => {
  let component: BreadcrumbrouteComponent;
  let fixture: ComponentFixture<BreadcrumbrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
