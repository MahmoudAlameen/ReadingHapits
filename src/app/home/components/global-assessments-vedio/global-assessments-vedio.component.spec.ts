import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAssessmentsVedioComponent } from './global-assessments-vedio.component';

describe('GlobalAssessmentsVedioComponent', () => {
  let component: GlobalAssessmentsVedioComponent;
  let fixture: ComponentFixture<GlobalAssessmentsVedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalAssessmentsVedioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalAssessmentsVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
