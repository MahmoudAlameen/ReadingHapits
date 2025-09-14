import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalAssessmentsComponent } from './international-assessments.component';

describe('InternationalAssessmentsComponent', () => {
  let component: InternationalAssessmentsComponent;
  let fixture: ComponentFixture<InternationalAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalAssessmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
