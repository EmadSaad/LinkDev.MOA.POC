import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRInfoComponent } from './crinfo.component';

describe('CRInfoComponent', () => {
  let component: CRInfoComponent;
  let fixture: ComponentFixture<CRInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
