import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryInsideFactoryComponent } from './factory-inside-factory.component';

describe('FactoryInsideFactoryComponent', () => {
  let component: FactoryInsideFactoryComponent;
  let fixture: ComponentFixture<FactoryInsideFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryInsideFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryInsideFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
