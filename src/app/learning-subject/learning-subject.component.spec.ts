import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSubjectComponent } from './learning-subject.component';

describe('LearningSubjectComponent', () => {
  let component: LearningSubjectComponent;
  let fixture: ComponentFixture<LearningSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
