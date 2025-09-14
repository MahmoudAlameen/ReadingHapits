import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningMaterialCardComponent } from './learning-material-card.component';

describe('LearningMaterialCardComponent', () => {
  let component: LearningMaterialCardComponent;
  let fixture: ComponentFixture<LearningMaterialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningMaterialCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
