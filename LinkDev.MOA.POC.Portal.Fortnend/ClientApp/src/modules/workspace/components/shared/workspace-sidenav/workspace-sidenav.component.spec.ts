import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSidenavComponent } from './workspace-sidenav.component';

describe('WorkspaceSidenavComponent', () => {
  let component: WorkspaceSidenavComponent;
  let fixture: ComponentFixture<WorkspaceSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
