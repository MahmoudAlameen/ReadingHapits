import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentMetaComponent } from './assessment-meta.component';

describe('AssessmentMetaComponent', () => {
  let component: AssessmentMetaComponent;
  let fixture: ComponentFixture<AssessmentMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
