/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { InfrastructurePermitComponent } from 'src/modules/Infrastructure-Permit/Components/Infrastructure-Permit/Infrastructure-Permit.component';



describe('InfrastructurePermitComponent', () => {
  let component: InfrastructurePermitComponent;
  let fixture: ComponentFixture<InfrastructurePermitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructurePermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructurePermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
