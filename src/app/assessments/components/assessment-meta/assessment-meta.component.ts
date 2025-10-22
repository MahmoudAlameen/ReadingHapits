import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAssessmentMeta } from 'src/app/DTOs/assessments.interfaces';

@Component({
  selector: 'app-assessment-meta',
  templateUrl: './assessment-meta.component.html',
  styleUrls: ['./assessment-meta.component.scss']
})
export class AssessmentMetaComponent implements OnInit {

  constructor() { }
  @Input() meta!: IAssessmentMeta | null;
  @Output() onStart = new EventEmitter<void>();
  ngOnInit(): void {
    
  }

}
