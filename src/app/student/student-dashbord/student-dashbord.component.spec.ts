import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashbordComponent } from './student-dashbord.component';

describe('StudentDashbordComponent', () => {
  let component: StudentDashbordComponent;
  let fixture: ComponentFixture<StudentDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
