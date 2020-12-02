import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialBuildingRequestComponent } from './partial-building-request.component';

describe('PartialBuildingRequestComponent', () => {
  let component: PartialBuildingRequestComponent;
  let fixture: ComponentFixture<PartialBuildingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialBuildingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialBuildingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
