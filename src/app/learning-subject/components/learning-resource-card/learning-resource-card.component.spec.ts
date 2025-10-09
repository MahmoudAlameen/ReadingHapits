import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningResourceCardComponent } from './learning-resource-card.component';

describe('LearningResourceCardComponent', () => {
  let component: LearningResourceCardComponent;
  let fixture: ComponentFixture<LearningResourceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningResourceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningResourceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
