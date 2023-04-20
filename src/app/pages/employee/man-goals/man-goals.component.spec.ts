import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGoalsComponent } from './man-goals.component';

describe('GoalsComponent', () => {
  let component: ManagerGoalsComponent;
  let fixture: ComponentFixture<ManagerGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
