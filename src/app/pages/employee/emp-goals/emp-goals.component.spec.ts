import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGoalsComponent } from './emp-goals.component';

describe('GoalsComponent', () => {
  let component: EmployeeGoalsComponent;
  let fixture: ComponentFixture<EmployeeGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
