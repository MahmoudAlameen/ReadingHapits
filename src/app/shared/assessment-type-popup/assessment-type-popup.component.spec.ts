import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTypePopupComponent } from './assessment-type-popup.component';

describe('AssessmentTypePopupComponent', () => {
  let component: AssessmentTypePopupComponent;
  let fixture: ComponentFixture<AssessmentTypePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentTypePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
