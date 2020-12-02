import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrVersionComponent } from './cr-version.component';

describe('CrVersionComponent', () => {
  let component: CrVersionComponent;
  let fixture: ComponentFixture<CrVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
