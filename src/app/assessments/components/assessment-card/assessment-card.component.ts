import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { AssessmentStatus } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.scss']
})
export class AssessmentCardComponent implements OnInit {

 /** Expose the enum to the template for conditional checks */
  readonly AssessmentStatus = AssessmentStatus;
  
  /** Input: The assessment data object (Angular 14 @Input) */
  @Input() assessment!: IAssessmentCard;

  /** Output: Emits the assessment ID when the 'Take' button is clicked (Angular 14 @Output) */
  @Output() takeClicked = new EventEmitter<number>();

  ngOnInit(): void {
  }
}
