import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { AssessmentStatus, AssessmentType } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.scss']
})
export class AssessmentCardComponent implements OnInit {

  /** Expose enums to the template for easy access */
  readonly AssessmentStatus = AssessmentStatus;
  readonly AssessmentType = AssessmentType;

  /** Input: The assessment data object */
  @Input() assessment!: IAssessmentCard;

  /** Output: Emits the assessment ID when the 'Take' button is clicked */
  @Output() takeClicked = new EventEmitter<number>();

  /** Helper: Convert enum numeric type to its string label (PISA, PIRLS, etc.) */
  get assessmentTypeLabel(): string {
    return AssessmentType[this.assessment.type]; // e.g. 1 → 'PISA'
  }

  /** Helper: Generate lowercase CSS-friendly type class */
  get assessmentTypeClass(): string {
    return this.assessmentTypeLabel.toLowerCase();
  }

  ngOnInit(): void {}
}
